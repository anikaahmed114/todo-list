import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './SignIn.css';

const SignUpForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const onSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        onLogin(true);
        navigate('/home'); // Navigate to home page after successful sign-up and login
      })
      .catch((error) => {
        setError(error.message); // Display any errors related to sign up
        onLogin(false);
      });
  };

  const isInvalid = password === '' || email === '';

  return (
    <div className="form-container">
    <form className="auth-form" onSubmit={onSubmit}>
      <h2 className="auth-form-title">Sign Up</h2>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {error && <p>{error}</p>}
    </form>
    </div>
  );
};

export default SignUpForm;
