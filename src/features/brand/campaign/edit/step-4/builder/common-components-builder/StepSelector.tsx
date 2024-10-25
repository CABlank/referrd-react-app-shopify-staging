import React from "react";

interface StepSelectorProps {
  step: number;
  setStep: (step: number) => void;
  disabled: boolean;
}

const StepSelector: React.FC<StepSelectorProps> = ({ step, setStep, disabled }) => {
  return (
    <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-4 p-4">
      <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2">
        <div
          onClick={() => !disabled && setStep(1)}
          className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 rounded-[100px] px-0 py-0 cursor-pointer ${
            step === 1 ? "bg-[#10ad1b]/[0.15]" : "bg-[#a8a8a8]/[0.15]"
          }${disabled ? "cursor-not-allowed" : ""}`}
        >
          <p
            className={`flex-grow-0 flex-shrink-0 w-[66px] h-6 text-sm font-medium content-center text-center ${
              step === 1 ? "text-[#10ad1b]" : "text-[#a8a8a8]"
            }`}
          >
            Step 1
          </p>
        </div>
        <div className="flex-grow-0 flex-shrink-0 w-[89px] h-[2px] bg-[#a8a8a8]" />
        <div
           onClick={() => !disabled && setStep(2)} // Solo permite cambiar de paso si no está deshabilitado
           className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 rounded-[100px] px-0 py-0 cursor-pointer ${
             step === 2 ? "bg-[#10ad1b]/[0.15]" : "bg-[#a8a8a8]/[0.15]"
           } ${disabled ? "cursor-not-allowed" : ""}`} // Cambia el cursor si está deshabilitado
        >
          <p
            className={`flex-grow-0 flex-shrink-0 w-[66px] h-6 text-sm font-medium content-center text-center ${
              step === 2 ? "text-[#10ad1b]" : "text-[#a8a8a8]"
            }`}
          >
            Step 2
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepSelector;
