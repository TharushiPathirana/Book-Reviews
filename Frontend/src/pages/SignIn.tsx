import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        formData
      );

      if (response.status === 200) {
        const token = response.data;
        toast.success("Login successful!", { autoClose: 3000 });
        console.log("Bearer Token:", token);

        localStorage.setItem("authToken", token);
        onClose();
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Invalid credentials. Please try again.", {
          autoClose: 3000,
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2"
                onClick={onClose}
              >
                <svg
                  className="w-4 h-4"
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

            <div className="p-4">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div>
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
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
