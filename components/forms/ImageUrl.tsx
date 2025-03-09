"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faImage } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface imageUrlProps {
  inputPlaceholder: string;
  name: string;
}

const ImageUrl = ({ inputPlaceholder, name }: imageUrlProps) => {
  const [urlInput, setUrlInput] = useState<string>("");
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmittedUrl(urlInput);
  };

  const handleRemoveImg = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSubmittedUrl(null);
    setUrlInput("");
  };

  return (
    <div
      id="upload-thumbnail-container"
      className="overflow-hidden my-5 mt-md-0 rounded-3 position-relative d-flex flex-column justify-content-center align-items-center gap-3 p-3 border shadow-sm bg-white"
      style={{ minHeight: 250, width: "100%" }}
    >
      {submittedUrl ? (
        <div className="position-relative w-100 h-100 rounded-3 overflow-hidden">
          {isLoading && (
            <div className="loading-overlay position-absolute top-50 start-50 translate-middle text-primary">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div className="post-img position-relative m-0">
            <Image
              src={submittedUrl}
              alt="Preview image"
              width={800}
              height={490}
              className="img-fluid rounded-3 shadow-sm"
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <input
            name={name}
            id={name}
            readOnly
            required
            className="d-none"
            value={urlInput}
          />
          <button
            type="button"
            onClick={handleRemoveImg}
            className="btn position-absolute top-0 end-0 d-block z-20 p-1 border-0 bg-transparent"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "red", width: 24, height: 24 }}
            />
          </button>
        </div>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faImage}
            style={{ color: "#0f5da3", width: 50, height: 50 }}
          />
          <h6
            className="text-center text-secondary fw-normal"
            style={{ width: 350 }}
          >
            {inputPlaceholder}
          </h6>
          <div className="d-flex gap-2 w-100 justify-content-center align-items-center">
            <input
              type="text"
              className="my-auto form-control shadow-sm border border-secondary rounded-2"
              placeholder="contoh : https://images.pexels.com/photos/2235/music-sound-communication-audio.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              value={urlInput}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="appointment-btn ms-0"
              onClick={handleSubmit}
            >
              Submit Image
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUrl;
