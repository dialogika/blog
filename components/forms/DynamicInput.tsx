"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

interface dynamicInputProps {
  name: string;
  placeholder?: string;
  maxInputs: number;
}

const DynamicInput = ({ name, placeholder, maxInputs }: dynamicInputProps) => {
  const [totalInputs, setTotalInputs] = useState([""]);
  const [values, setValues] = useState<string[]>([]);

  // Fungsi untuk menambahkan input baru. Digunakan tombol tambah (+)
  const handleAddInput = () => {
    setTotalInputs([...totalInputs, ""]);
  };

  // Filter totalInputs dan values, kemudian hanya mengembalikan elemen yang nomor indexnya tidak sama dengan index dari parameter
  const handleRemoveInput = (index: number) => {
    const newInput = totalInputs.filter(
      (bagianTidakDiPakai, thisIndex) => thisIndex !== index
    );
    setTotalInputs(newInput);

    const newInputValue = values.filter(
      (bagianTidakDiPakai, thisIndex) => thisIndex !== index
    );
    setValues(newInputValue);
  };

  const handleValuesChange = (index: number, value: string) => {
    const newInputs = [...totalInputs];
    newInputs[index] = value;
    setTotalInputs(newInputs);

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };
  return (
    <>
      {totalInputs.map((input, index) => (
        <div key={index} className="flex gap-4 mb-2 pt-3">
          <input
            type="text"
            id={`${name}-${index}`}
            name={`${name}-${index}`}
            value={input}
            onChange={(e) => handleValuesChange(index, e.target.value)}
            placeholder={placeholder}
            className="text-input flex-1"
          />
          {totalInputs.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveInput(index)}
              className="bg-transparent border-0 "
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: "red", width: 20, height: 20 }}
              />
            </button>
          )}
        </div>
      ))}

      {totalInputs.length < maxInputs && (
        <button
          type="button"
          onClick={handleAddInput}
          className="rev-appointment-btn d-flex align-items-center justify-content-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} className="fs-5" />
          <span>Add {name}</span>
        </button>
      )}
    </>
  );
};

export default DynamicInput;
