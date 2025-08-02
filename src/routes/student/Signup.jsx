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
    <div>
      <div>
        <p>Welcome!</p>
        <h2>{""}Sign up to create your account</h2>
      </div>

      {error && (
        <div>
          {error}
          {""}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <div className="'text-gray-600'">
            <label>Student</label>
            <input
              id="student-radio"
              type="radio"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Tutor</label>
            <input
              id="tutor-radio"
              type="radio"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <div>
            <label htmlFor="password-confirm">Confirm Password</label>
            <input
              id="password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirmed(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div>
        <p>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
