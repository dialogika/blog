"use client";
import React from "react";

export interface TextAreaProps {
  rows?: number;
  maxLength?: number;
  name: string;
  placeholder?: string;
  divClassName?: string;
  textAreaClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
  description?: string;
  style?: React.CSSProperties;
  required?: boolean;
}

const TextAreaInput: React.FC<TextAreaProps> = ({
  name,
  placeholder,
  rows,
  maxLength,
  divClassName,
  textAreaClassName,
  style,
  ...props
}) => {
  console.log("Props yang diterima oleh TextAreaInput:", props); // Debugging
  return (
    <div className={divClassName}>
      <textarea
        maxLength={maxLength}
        rows={rows}
        name={name}
        id={name}
        className={textAreaClassName}
        placeholder={placeholder}
        style={style}
        {...props}
      />
    </div>
  );
};

export default TextAreaInput;
