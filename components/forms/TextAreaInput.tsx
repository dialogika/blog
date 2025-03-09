"use client";
import React from "react";
import LabelInput from "./LabelInput";

export interface TextAreaProps {
  maxLength?: number;
  name: string;
  labelTitle: string;
  placeholder?: string;
  divClassName?: string;
  textAreaClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
  description?: string;
  required?: boolean;
}

const TextAreaInput: React.FC<TextAreaProps> = ({
  name,
  placeholder,
  maxLength,
  description,
  divClassName,
  textAreaClassName,
  labelTitle,
  ...props
}) => {
  return (
    <div className={divClassName}>
      <LabelInput
        htmlFor={name}
        title={labelTitle}
        required={props.required}
        description={description}
      />
      <textarea
        maxLength={maxLength}
        name={name}
        id={name}
        className={textAreaClassName}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default TextAreaInput;
