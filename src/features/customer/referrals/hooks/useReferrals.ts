import { useState, useEffect, useRef } from "react";
import {
  fetchCustomersByUuidReferral,
  fetchMainCustomerByUuidReferral,
  fetchCampaignMetadataBatch,
  CampaignMetadata
} from "../../../../services/referrals/referrals";
import { useSession } from "../../../../context/SessionContext";
import { fetchUserData } from "../../../../services/auth/auth";

// Define the Customer interface with precise types
interface Location {
  country?: string;
  city?: string;
}

interface CompanyCampaignTracker {
  companies: {
    company_id: string;
    campaigns: {
      campaign_id: string;
      discount_code: string | null;
    }[];
  }[];
}

interface Customer {
  date: string | Date; // Simplified type to string | Date
  id?: number;
  uuid?: string;
  name: string;
  email: string;
  mobile?: string;
  referred_by?: string;
  conversion_count: number;
  click_count: number;
  signup_count: number;
  location?: Location | null;
  company_id: object;
  campaign_uuid?: string;
  discountCode?: string;
  commissionTotal?: number;
  campaignName?: string;
  company_campaign_tracker: CompanyCampaignTracker;
}

// State type for useCustomers hook
interface CustomerState {
  customers: Customer[];
  mainCustomerData: Customer[];
  loading: boolean;
  error: string | null;
}

const useCustomers = ({
  accessToken,
  refreshToken,
  userId,
}: {
  accessToken?: string;
  refreshToken?: string;
  userId?: number;
}) => {
  const { session, withTokenRefresh } = useSession();
  const [state, setState] = useState<CustomerState>({
    customers: [],
    mainCustomerData: [],
    loading: true,
    error: null,
  });
  const loadExecutedRef = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      if ((session?.accessToken || accessToken) && !loadExecutedRef.current) {
        setState((prevState) => ({ ...prevState, loading: true }));
        loadExecutedRef.current = true;

        try {
          const customerUUID = await withTokenRefresh(
            async (token) => {
              const userData = await fetchUserData(token);
              return userData;
            },
            refreshToken,
            userId
          );

          if (customerUUID?.uuid) {
            const [customersData, mainCustomerResponse] = await Promise.all([
              withTokenRefresh(
                (token) => fetchCustomersByUuidReferral(token, customerUUID.uuid),
                refreshToken,
                userId
              ),
              withTokenRefresh(
                (token) => fetchMainCustomerByUuidReferral(token, customerUUID.uuid),
                refreshToken,
                userId
              ),
            ]);

            const campaignUUIDs = Array.from(
              new Set(
                customersData.flatMap((customer: Customer) => {
                  return customer.company_campaign_tracker?.companies.flatMap((company) =>
                    company.campaigns.map((campaign) => campaign.campaign_id)
                  );
                }).filter(Boolean)
              )
            );

            const campaignsMetadata = await withTokenRefresh(
              (token) => fetchCampaignMetadataBatch(campaignUUIDs as string[], token),
              refreshToken,
              userId
            );

            const campaignMap = campaignsMetadata.reduce((acc: Record<string, CampaignMetadata>, campaign: CampaignMetadata) => {
              acc[campaign.campaign_uuid] = campaign;
              return acc;
            }, {});

            const enhancedCustomers = customersData.map((customer: Customer) => {
              const campaignUUID = customer.company_campaign_tracker?.companies[0]?.campaigns[0]?.campaign_id;
              const campaignData = campaignMap[campaignUUID];

              if (campaignData) {
                const commissionTotal = campaignData.commission;

                return {
                  ...customer,
                  campaign_uuid: campaignUUID,
                  campaignName: campaignData.name,
                  commissionTotal,
                };
              }

              return {
                ...customer,
                campaign_uuid: campaignUUID,
                campaignName: "N/A",
                commissionTotal: 0,
              };
            });

            setState({
              customers: enhancedCustomers,
              mainCustomerData: mainCustomerResponse || [],
              loading: false,
              error: null,
            });
          } else {
            throw new Error("Customer UUID is not available.");
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setState({
            customers: [],
            mainCustomerData: [],
            loading: false,
            error: "Failed to fetch customers or main customer data. Please try again.",
          });
        }
      }
    };

    loadData();
  }, [session, accessToken, refreshToken, userId, withTokenRefresh]);

  return state;
};

export default useCustomers;
