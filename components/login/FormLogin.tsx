"use client";
import React, { useState } from "react";
import TextInput from "../forms/TextInput";
import "bootstrap-icons/font/bootstrap-icons.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient-to-r from-blue-500 to-purple-600">
      <div
        className="card p-5 shadow-lg border-0 rounded-4 bg-white"
        style={{ width: "600px", maxWidth: "90%" }}
      >
        {/* Logo di atas form */}
        <div className="text-center mb-4">
          <img
            src="https://www.dialogika.co/assets/img/logo.webp"
            alt="Dialogika Logo"
            className="img-fluid mb-3"
            style={{ width: "400px", height: "auto" }}
          />
          <h2 className="fw-bold text-[#032E68]">Login</h2>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="w-100 rounded-lg">
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <TextInput
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
              inputClassName="form-control form-control-lg border-0 shadow-sm w-100"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="position-relative">
              <TextInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                onChange={handleChange}
                inputClassName="form-control form-control-lg border-0 shadow-sm w-100"
              />
              <button
                type="button"
                className="position-absolute top-50 end-0 translate-middle-y bg-transparent border-0 pe-3"
                onClick={() => setShowPassword(!showPassword)}
                style={{ zIndex: 5 }}
              >
                <i
                  className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                ></i>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-100 py-3 fw-semibold rounded-4 border-0 btn-primary"
            style={{
              background: "linear-gradient(to bottom, #1266D4, #032E68)",
              color: "white",
              boxShadow: "0px 6px 20px rgba(168, 85, 247, 0.5)",
              fontSize: "1.2rem",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.boxShadow =
                "0px 8px 25px rgba(168, 85, 247, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0px 6px 20px rgba(168, 85, 247, 0.5)";
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
