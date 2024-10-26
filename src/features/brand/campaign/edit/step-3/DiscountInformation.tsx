import React, { useEffect, useState } from "react";
import DiscountValue from "../step-3/DiscountValue";

interface DiscountInformationProps {
  campaignData: any;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: any } }
  ) => void;
  accessToken: string;
  currentStep: number;
  onValidationStatus: (isValid: boolean) => void;
  isDisabled: boolean;
}

const DiscountInformation: React.FC<DiscountInformationProps> = ({
  campaignData,
  handleChange,
  accessToken,
  onValidationStatus,
  currentStep,
  isDisabled,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate discount-related fields
  const validateDiscountData = () => {
    let newErrors: { [key: string]: string } = {};

    if (campaignData.allowDiscounts) {
      if (!campaignData.discountType || campaignData.discountType === "Select one") {
        newErrors.discountType = "Discount Type is required.";
      }
      
      // Validate that the discount value is a positive number
      if (
        !campaignData.discountValue || 
        campaignData.discountValue <= 0 ||
        isNaN(campaignData.discountValue)  // Validate that the discount value is a number
      ) {
        newErrors.discountValue = "Discount Value must be a positive number.";
      }

      if (!campaignData.appliesTo || campaignData.appliesTo.length === 0) { //I comment this line because there is a default value in the select.
        /* newErrors.appliesTo = "You must specify what the discount applies to."; */
      }
    }

    setErrors(newErrors);
    onValidationStatus(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateDiscountData();
  }, [campaignData]);

  return (
    <div className="w-full bg-white shadow rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-[#47B775] mb-6">3. Discount Information</h2>
      <hr className="border-gray-200 mb-6" />
      {Object.keys(errors).length > 0 && (
        <div className="mb-4 text-red-600">
          {Object.values(errors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <DiscountValue
        discount={{
          allow: campaignData.allowDiscounts,
          type: campaignData.discountType,
          value: campaignData.discountValue,
          appliesTo: campaignData.appliesTo,
        }}
        accessToken={accessToken}
        className="bg-white p-0 border-0 shadow-none"
        handleChange={handleChange}
        disabled={isDisabled}
      />
    </div>
  );
};

export default DiscountInformation;
