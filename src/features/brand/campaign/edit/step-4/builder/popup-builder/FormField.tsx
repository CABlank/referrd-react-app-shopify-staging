import React from "react";
import ColorField from "../common-components-builder/ColorField";
import SelectField from "../common-components-builder/SelectField";
import SpacingField from "../common-components-builder/SpacingField";
import NumberField from "../common-components-builder/NumberField";
import TextField from "../common-components-builder/TextField";
import CheckboxField from "../common-components-builder/CheckboxField";
import PercentageField from "../common-components-builder/PercentageField";
import { FormFieldProps } from "../common-components-builder/Types";

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  options,
  onBatchChange,
  disabled,
}) => {
  const isMeasurementField = ["imageWidth", "imageHeight", "borderRadius"].includes(name);

  switch (type) {
    case "select":
      return (
        <SelectField
          label={label}
          name={name}
          value={value as string}
          onChange={onChange}
          options={options || []}
          disabled={disabled}
        />
      );
    case "color":
      return <ColorField label={label} name={name} value={value as string} onChange={onChange} />;
    case "padding":
    case "margin":
      return (
        <SpacingField
          label={label}
          name={name}
          type={type}
          value={typeof value === "object" ? value : {}}
          onChange={onBatchChange!}
          disabled={disabled}
        />
      );
    case "number":
      return (
        <NumberField
          label={label}
          name={name}
          value={typeof value === "number" ? value : parseInt(value as string, 10)}
          onChange={onChange}
          disabled={disabled}
          type={""}
        />
      );
    case "checkbox":
      return (
        <CheckboxField
          label={label}
          name={name}
          value={value as string}
          onChange={onChange}
          disabled={disabled}
          type={""}
        />
      );
    case "percentage":
      return (
        <PercentageField
          label={label}
          name={name}
          type={type}
          value={value as string}
          onChange={onChange}
          disabled={disabled}
          isMeasurement={isMeasurementField}
        />
      );
    default:
      return (
        <TextField
          label={label}
          name={name}
          type={type}
          value={value as string}
          onChange={onChange}
          disabled={disabled}
          isMeasurement={isMeasurementField}
        />
      );
  }
};

export default FormField;
