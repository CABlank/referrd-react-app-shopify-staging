import { useState, useEffect, useRef } from "react";
import {
  fetchMainCustomerByUuidReferral,
  fetchCompanyByUUID,
} from "../../../../services/referrals/referrals";
import { useSession } from "../../../../context/SessionContext";
import { fetchUserData } from "../../../../services/auth/auth";

// Update Customer interface to reflect the new structure
interface Customer {
  id: number;
  date_created: string;
  uuid: string;
  name: string;
  email: string;
  mobile: string;
  referred_by: string;
  conversion_count: number;
  signup_count: number;
  location: string | null;
  click_count: number;
  company_campaign_tracker: {
    companies: Array<{
      company_id: string;
      campaigns: Array<{
        campaign_id: string;
        discount_code: string | null;
      }>;
    }>;
  };
}

interface Company {
  id?: number;
  name: string;
  domain: string;
  logo: string | File | null;
  logoUrl?: string;
  date_created: string | number | Date;
  UUID: string;
}

interface CustomerState {
  customers: Customer[];
  companies: Company[];
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
    companies: [],
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

          // First, use withTokenRefresh to fetch the customer UUID securely
          const customerUUID = await withTokenRefresh(
            async (token) => {
              // Fetch the customer data using the current or refreshed token
              const userData = await fetchUserData(token);
              return userData;
            },
            refreshToken, // If needed, provide a refresh token here
            userId // User ID to help identify which token to refresh, if required
          );

          if (customerUUID?.uuid) {

            // Fetch customers by referral UUID
            const customersData = await withTokenRefresh(
              (token) =>
                fetchMainCustomerByUuidReferral(token, customerUUID.uuid),
              refreshToken,
              userId
            );


            // Now handle company fetching based on the new company_campaign_tracker structure
            let companyFetchPromises: Promise<Company>[] = [];

            for (const customer of customersData) {

              const { companies } = customer.company_campaign_tracker;

              // Loop through companies in the company_campaign_tracker
              for (const company of companies) {
                companyFetchPromises.push(
                  withTokenRefresh(
                    (token) => fetchCompanyByUUID(token, company.company_id),
                    refreshToken,
                    userId
                  )
                );
              }
            }

            // Execute all company fetch promises concurrently
            const companiesData = await Promise.all(companyFetchPromises);


            // Set the state with the customers and companies data
            setState({
              customers: customersData,
              companies: companiesData,
              loading: false,
              error: null,
            });

          } else {
            console.warn("No customer UUID found.");
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setState({
            customers: [],
            companies: [],
            loading: false,
            error: "Failed to fetch customers or companies. Please try again.",
          });
        }
      }
    };

    loadData();
  }, [session, accessToken, refreshToken, userId, withTokenRefresh]);

  return state;
};

export default useCustomers;
