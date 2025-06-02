import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { useNavigate, Link } from 'react-router-dom';
import './NewTrip.css'; // Reuse styles

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({ variables: formState });
      localStorage.setItem('id_token', data.addUser.token);
      navigate('/profile'); // ✅ Go to profile after signup
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="new-trip-page">
      <h2>Sign Up</h2>
      <form className="trip-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-buttons">
        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
        <button type="submit">Sign Up</button>
        </div>

        {error && <p style={{ color: 'red' }}>Signup failed. Try a different email.</p>}

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'underline', color: '#7DE2D1' }}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;