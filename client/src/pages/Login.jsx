import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { useNavigate, Link } from 'react-router-dom'; // ✅
import './NewTrip.css'; // reuse the same styles


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate(); // ✅

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({ variables: { email, password } });
      localStorage.setItem('id_token', data.login.token);
      navigate('/profile');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="new-trip-page">
      <h2>Log In</h2>
      <form className="trip-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <button type="submit">Log In</button>
        </div>

        {error && <p style={{ color: 'red' }}>Invalid email or password.</p>}

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don’t have an account?{' '}
          <Link to="/signup" style={{ textDecoration: 'underline', color: '#7DE2D1' }}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;