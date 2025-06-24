"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

interface DynamicAuthorInputProps {
  name: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  maxInputs: number;
}

// 🔍 Custom Dropdown Toggle
const CustomToggle = React.forwardRef(({ children, onClick }: any, ref: React.Ref<HTMLButtonElement>) => (
  <button
    ref={ref}
    className="btn btn-outline-primary px-3 py-2 rounded"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>
    {children} <span className="ms-2">&#x25bc;</span>
  </button>
));
CustomToggle.displayName = "CustomToggle";
// 🔍 Custom Dropdown Menu with Search
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }: any, ref: React.Ref<HTMLDivElement>) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}>
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled mb-0">
          {React.Children.toArray(children).filter(
            (child: any) => !value || child.props.children.toLowerCase().includes(value.toLowerCase())
          )}
        </ul>
      </div>
    );
  }
);
CustomMenu.displayName = "CustomMenu";

const DynamicAuthorInput = (props: DynamicAuthorInputProps) => {
  const authors = useSelector((state: RootState) => state.authors.authorsDetail)
    .slice()
    .sort((a, b) => a.authorName.localeCompare(b.authorName));
  const [totalInputs, setTotalInputs] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);

  const handleAddInput = () => {
    if (authors.length > 0 && totalInputs.length < props.maxInputs) {
      setTotalInputs([...totalInputs, ""]);
      setValues([...values, authors[0].authorName]);
    }
  };

  const handleRemoveInput = (index: number) => {
    const newTotalInput = totalInputs.filter((_, i) => i !== index);
    setTotalInputs(newTotalInput);
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
  };

  const handleSelectChange = (index: number, selectedAuthorName: string) => {
    const newValues = [...values];
    newValues[index] = selectedAuthorName;
    setValues(newValues);
  };

  useEffect(() => {
    if (authors.length > 0 && totalInputs.length === 0) {
      setTotalInputs([""]);
      setValues([authors[0].authorName]);
    }
  }, [authors, totalInputs.length]);

  if (authors.length === 0) return <div>Loading Authors...</div>;

  return (
    <>
      <div className="d-flex flex-wrap gap-3 mt-4 align-items-stretch justify-content-center">
        {totalInputs.map((_, index) => {
          const selectedAuthor = authors.find((author) => author.authorName === values[index]) || authors[0];
          return (
            <div
              key={index}
              className="flex flex-wrap gap-3 justify-content-space-between">
              <input
                type="hidden"
                name={`author-${index}`}
                value={values[index] || ""}
              />
              <div
                id={`author-card-${index}`}
                className={`d-flex gap-3 flex-column h-auto align-items-center justify-content-around position-relative ${
                  index % 3 === 2 ? "order-first" : ""
                }`}>
                <div className="d-flex gap-2 justify-content-around justify-items-start">
                  {/* 🔽 Dropdown with Search */}
                  <Dropdown onSelect={(eventKey) => handleSelectChange(index, eventKey || authors[0].authorName)}>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id={`dropdown-author-${index}`}>
                      {values[index] || "Select Author"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                      {authors.map((author, idx) => (
                          <Dropdown.Item
                            key={idx}
                            eventKey={author.authorName}
                            active={author.authorName === values[index]}>
                            {author.authorName}
                          </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  {totalInputs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveInput(index)}
                      className="bg-transparent border-0">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        style={{ width: 20, height: 20 }}
                      />
                    </button>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    minHeight: 250,
                    width: 250,
                    padding: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}>
                  <Image
                    src={selectedAuthor.imgPath || "/placeholder.jpg"}
                    width={250}
                    height={240}
                    className="rounded"
                    alt={selectedAuthor.authorName || "Unknown"}
                  />
                  <p
                    className="fst-italic text-center w-100 mx-auto"
                    style={{
                      maxHeight: 100,
                      whiteSpace: "normal",
                      overflowY: "auto",
                      textOverflow: "ellipsis",
                      marginTop: 10,
                      marginBottom: 0,
                      display: "block",
                    }}>
                    {selectedAuthor.quotes || "No Quote Yet"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {totalInputs.length < props.maxInputs && (
          <button
            type="button"
            onClick={handleAddInput}
            className="rev-appointment-btn h-10">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add {props.name}</span>
          </button>
        )}
      </div>
    </>
  );
};

export default DynamicAuthorInput;
