"use client";
import React from "react";
import LabelInput from "./LabelInput";

export interface InputProps {
  name: string;
  labelTitle?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  divClassName?: string;
  inputClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  description?: string;
  required?: boolean;
  hideAsterisk?: boolean;
}

const TextInput: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  description,
  divClassName,
  inputClassName,
  labelTitle,
  hideAsterisk,
  required,
  ...otherProps
}) => {
  return (
    <div className={divClassName}>
      {labelTitle && (
        <LabelInput
          htmlFor={name}
          title={labelTitle}
          required={required}
          hideAsterisk={hideAsterisk}
          description={description}
        />
      )}
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={""}
        className={inputClassName}
        placeholder={placeholder}
        required={required}
        {...otherProps}
      />
    </div>
  );
};

export default TextInput;
