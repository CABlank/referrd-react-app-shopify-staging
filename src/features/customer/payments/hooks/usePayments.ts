import { useState, useEffect, useRef } from "react";
import {
  fetchCompanyUUID,
  fetchPaymentsByReferralUUID,
  fetchReferrerBatch,
  fetchCampaignMetadataBatch,
  updatePaymentStatus,
} from "../../../../services/payments/payments";
import { useSession } from "../../../../context/SessionContext";
import { MappedPayment } from "../types";
import { fetchUserData } from "../../../../services/auth/auth";

export const usePayments = (
  accessToken?: string,
  refreshToken?: string,
  userId?: number
) => {
  const { session, withTokenRefresh } = useSession();
  const [payments, setPayments] = useState<MappedPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const loadExecutedRef = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      if ((session?.accessToken || accessToken) && !loadExecutedRef.current) {
        setLoading(true);
        loadExecutedRef.current = true;

        try {
          // Fetch the customer UUID securely
          const customerUUID = await withTokenRefresh(
            async (token) => {
              const userData = await fetchUserData(token);
              return userData?.uuid;
            },
            refreshToken,
            userId
          );

          if (customerUUID) {
            // Fetch payments by referral UUID
            const paymentsData = await withTokenRefresh(
              (token) => fetchPaymentsByReferralUUID(customerUUID, token),
              refreshToken,
              userId
            );

            if (paymentsData) {
              // Collect unique referral and campaign UUIDs for batch fetching
              const referralUUIDs: string[] = Array.from(
                new Set(paymentsData.map((p: { referral_uuid: string }) => p.referral_uuid).filter(Boolean))
              );
              const campaignUUIDs: string[] = Array.from(
                new Set(paymentsData.map((p: { campaign_uuid: string }) => p.campaign_uuid).filter(Boolean))
              );

              // Fetch referrers and campaigns in batch
              const [referrers, campaigns] = await Promise.all([
                withTokenRefresh(
                  (token) => fetchReferrerBatch(referralUUIDs, token),
                  refreshToken,
                  userId
                ),
                withTokenRefresh(
                  (token) => fetchCampaignMetadataBatch(campaignUUIDs, token),
                  refreshToken,
                  userId
                )
              ]);

              // Create lookup maps for referrers and campaigns
              const referrerMap = Object.fromEntries(referrers.map((ref: { uuid: string; name: string; email: string }) => [ref.uuid, ref]));
              const campaignMap = Object.fromEntries(campaigns.map((camp: { campaign_uuid: string; name: string; commission: number; commissionType: string }) => [camp.campaign_uuid, camp]));

              // Map payments with referrer and campaign data
              const mappedPayments = paymentsData.map((payment: {
                referral_uuid: string;
                campaign_uuid: string;
                total_price: string;
                date_created: string | number | Date;
                order_number: any;
              }) => {
                const referrer = referrerMap[payment.referral_uuid] || {};
                const campaign = campaignMap[payment.campaign_uuid] || {};

                const referrerName = referrer.name || referrer.email || "N/A";
                const campaignName = campaign.name || "N/A";
                const referralFee = campaign ? calculateReferralFee(
                  payment.total_price,
                  campaign.commission,
                  campaign.commissionType
                ) : 0;

                return {
                  ...payment,
                  referrer: referrerName,
                  campaign: campaignName,
                  referralCashback: referralFee,
                  date: new Date(payment.date_created).toLocaleString(),
                  order: `#${payment.order_number}`,
                };
              });

              setPayments(mappedPayments);
            } else {
              setError("No payments found.");
            }
          } else {
            setError("Failed to load customer UUID.");
          }
        } catch (err) {
          console.error("Error loading data:", err);
          setError("Failed to load data. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [session?.accessToken, accessToken, refreshToken, userId, withTokenRefresh]);

  const calculateReferralFee = (
    totalPrice: string,
    commission: number | undefined,
    commissionType: string | undefined
  ): number => {
    const parsedTotalPrice = parseFloat(totalPrice);

    if (isNaN(parsedTotalPrice)) {
      console.error("Error: Invalid total price:", totalPrice);
      return 0;
    }

    // Only proceed if commission and commissionType are defined
    if (commission === undefined || commissionType === undefined) {
      console.warn("Warning: Missing commission or commissionType. Returning 0.");
      return 0;
    }

    if (commissionType === "Fix") {
      return commission;
    } else if (commissionType === "Percentage") {
      return (parsedTotalPrice * commission) / 100;
    }

    console.error("Error: Unknown commission type:", commissionType);
    return 0;
  };


  return {
    payments,
    loading,
    error,
    selectedPayments,
    setSelectedPayments,
    selectAll,
    setSelectAll,
  };
};
