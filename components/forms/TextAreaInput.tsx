"use client";
import React from "react";

export interface TextAreaProps {
  rows?: number;
  maxLength?: number;
  name: string;
  value: string;
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
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={divClassName}>
      <textarea
        maxLength={maxLength}
        rows={rows}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={textAreaClassName}
        placeholder={placeholder}
        style={style}
        {...props}
      />
    </div>
  );
};

export default TextAreaInput;
