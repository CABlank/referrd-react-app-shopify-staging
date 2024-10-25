import React, {useState} from "react";
import CampaignPayment from "../../edit/step-5/CampaignPayment";
import { Campaign } from "../../../../../services/campaign/campaign";

interface PaymentPopupProps {
  campaign: Campaign | null;
  token: string;
  onPaymentSuccess: () => void;
  onClose: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({
  campaign,
  token,
  onPaymentSuccess,
  onClose,
}) => {

  const [isAmountConfirmed, setIsAmountConfirmed] = useState(false); // Track amount confirmation
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  const [hasPaymentError, setHasPaymentError] = useState(false); // Track payment error

  if (!campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg z-60 w-full max-w-lg max-h-full flex flex-col">
        <div className="flex-grow overflow-y-auto">
          <CampaignPayment
            campaignId={campaign.id!}
            token={token}
            amountFunded={campaign.amountFunded ?? 0}
            onPaymentSuccess={onPaymentSuccess}
            setErrorState={setHasPaymentError}
            setAmountConfirmedParent={setIsAmountConfirmed}
            setPaymentCompletedParent={setIsPaymentCompleted}
          />
        </div>
        <div className="flex justify-end sticky bottom-0 bg-white py-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
