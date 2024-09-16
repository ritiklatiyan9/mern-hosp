import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/login`,
        { email, password, confirmPassword, role: "Patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
  
      // Update authentication state and user details
      setIsAuthenticated(true);
  
      // Only navigate after state update
      navigateTo("/");
  
      // Clear form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error('Error:', error);
      const message = error.response?.data?.message || 'An unexpected error occurred';
      toast.error(message);
    }
  };
  
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign In</h2>
        <p className="text-center text-gray-600 mb-4">Please Login To Continue</p>
       
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">Not Registered?</p>
            <Link
              to={"/register"}
              className="text-blue-500 hover:underline text-sm"
            >
              Register Now
            </Link>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
