import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [generalError, setGeneralError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
    setGeneralError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setFormErrors((prev) => ({
        ...prev,
        username: !formData.username ? "Username is required" : "",
        password: !formData.password ? "Password is required" : "",
        confirmPassword: !formData.confirmPassword
          ? "Confirm Password is required"
          : "",
      }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/register", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Sign-up successful!");
        setFormData({ username: "", password: "", confirmPassword: "" });
        onClose();
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        const serverError = error.response.data.error;
        if (serverError === "Username already exists") {
          setFormErrors((prev) => ({
            ...prev,
            username: "Username already exists.",
          }));
        } else if (serverError === "Missing fields") {
          setFormErrors((prev) => ({
            ...prev,
            username: !formData.username ? "Username is required" : "",
            password: !formData.password ? "Password is required" : "",
            confirmPassword: !formData.confirmPassword
              ? "Confirm Password is required"
              : "",
          }));
        } else {
          setGeneralError("An unexpected error occurred.");
        }
      } else {
        setGeneralError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create a New Account
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            {generalError && (
              <div className="text-red-600 mb-4">{generalError}</div>
            )}
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type username"
                />
                {formErrors.username && (
                  <div className="text-red-600 text-sm">
                    {formErrors.username}
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                />
                {formErrors.password && (
                  <div className="text-red-600 text-sm">
                    {formErrors.password}
                  </div>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Re-Enter Your password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                />
                {formErrors.confirmPassword && (
                  <div className="text-red-600 text-sm">
                    {formErrors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
