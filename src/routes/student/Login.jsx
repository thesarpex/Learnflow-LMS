import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [userType, setUserType] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please fill in all fields");
    }

    try {
      setLoading(true);
      await login(email, password);
      if (userType === "Student"){navigate("/student-dashboard");
      } else if (userType === "Tutor"){
        navigate("/tutor-dashboard")
      }
    } catch (err) {
      setError(
        "Failed to access account: " + (err.message || "Please try again")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
    <div className="max-w-md ml-25 my-5">
      <div className="mb-7 pl-2">
        <img src="src/assets/assets_learn_flow/Logo.png" alt="LearnFlow logo" />
      </div>
      <div className="flex flex-col gap-5 border border-gray-400 w-fit rounded-lg shadow-xl px-10 py-3">
        <div>
          <p className="text-2xl pb-5">Welcome!</p>
          <h2 className="text-3xl font-medium">{""}Sign in to</h2>
          <p className="text-xl pb-2">your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
            {""}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-100 block border border-gray-400 rounded-sm text-gray-500 px-3 py-3 focus:outline-none focus:ring-1 mt-1"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full block border border-gray-400 rounded-sm text-gray-500 px-3 py-3 focus:outline-none focus:ring-1 mt-1"
                required
              />
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <input id="remember-me" type="checkbox"/>
              <label htmlFor="remember-me" className="text-xs pl-2">Remember me</label>
            </div>

            <div className="text-xs text-gray-600">Forgot Password?</div>
          </div>

          <button
            className="border rounded-sm bg-gray-900 text-white py-3 w-full hover:bg-black hover:cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed mt-3 mb-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loging in..." : "Log in"}
          </button>
        </form>

        <div className="flex flex-col items-center mb-5">
          <p className="text-gray-600">
            Don't have an account yet?
            <Link
              to="/signup"
              className="text-gray-700 font-medium hover:text-black ml-2"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>

    <div>
        <img src="src/assets/assets_learn_flow/small-team-discussing-ideas-2194220-0.png" alt="Discussion image"/>
      </div>
    </div>
  );
};

export default Login;
