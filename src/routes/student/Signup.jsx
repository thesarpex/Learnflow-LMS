import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirmed] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !passwordConfirm) {
      return setError("Please fill in all fields");
    }

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    try {
      setLoading(true);
      await signup(email, password);
      navigate("/student-dashboard");
    } catch (err) {
      setError(
        "Failed to create account: " + (err.message || "Please try again")
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
          <h2 className="text-3xl font-medium">{""}Sign up to</h2>
          <p className="text-xl">create your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
            {""}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <div>I am signing up as :</div>
            <div className="flex gap-4">
              <div className="flex items-center">
                <label className="pr-1">Student</label>
                <input
                  id="student-radio"
                  type="radio"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="pr-1">Tutor</label>
                <input
                  id="tutor-radio"
                  type="radio"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

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

          {/*<div>
          <label htmlFor='username'>
            User name
          </label>
          <input id='username' type='text' onChange={''} placeholder='Enter your user name' required />
        </div>*/}

          <div className="flex flex-col gap-5">
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

            <div>
              <label htmlFor="password-confirm">Confirm Password</label>
              <input
                id="password-confirm"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirmed(e.target.value)}
                className="w-full block border border-gray-400 rounded-sm text-gray-500 px-3 py-3 focus:outline-none focus:ring-1 mt-1 mb-1"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <button
            className="border rounded-sm bg-gray-900 text-white py-3 w-full hover:bg-black hover:cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="flex flex-col items-center mb-3">
          <p className="text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-gray-700 font-medium hover:text-black ml-2"
            >
              Log in
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

export default Signup;
