import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface LabelInputProps {
  htmlFor: string;
  title: string;
  description?: string;
  required?: boolean;
  hideAsterisk?: boolean; // Add this to the interface
}

const LabelInput = ({
  htmlFor,
  title,
  description,
  required,
  hideAsterisk,
}: LabelInputProps) => {
  return (
    <label htmlFor={htmlFor}>
      {title}
      {required && !hideAsterisk && <span style={{ color: "red" }}> *</span>}
      {description && (
        <span className="tooltip-icon ms-2" title={description}>
          <FontAwesomeIcon icon={faQuestionCircle} />
        </span>
      )}
    </label>
  );
};

export default LabelInput;
