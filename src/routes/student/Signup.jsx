import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [passConfirm, setPasswordConfirmed] = useState();
const [loading, setLoading] = useState();
const [error, setError] = useState();
const {signup} = useAuth();
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if(!email || !password || !passConfirm) {
    return setError('Please fill in all fields')
  }

  if(password !==passConfirm) {
    return setError('Passwords do not match')
  }

  if(password.length < 8) {
    return setError('Password must be at least 8 characters');
  }

  try {
    setLoading(true);
    await signup(email, password);
    navigate('/student-dashboard');
  } catch (err) {
    setError('Failed to create account: ' + (err.message || 'Please try again'))
  } finally {
    setLoading(false);
  }

}

  return (
    <div>Signup</div>
  )
}

export default Signup