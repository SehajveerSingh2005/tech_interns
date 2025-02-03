import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;
import art from '../../assets/office.jpg';
import style from './loginform.module.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      alert(response.data.message || 'Login successful!');

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);

        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to log in. Check your credentials.');
    }
  };

  return (
    <div className={style.logincont}>
      <div className={style.grid}></div>
      <div className={style.left}>
        <div className={style.imageContainer}>
          <img src={art} alt="Office space" />
          <div className={style.imageBorder}></div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.heading}>
          <h1>WELCOME BACK_</h1>
          <div className={style.subheading}>
            <h3>READY TO BUILD?</h3>
            <p>Raw talent → Real impact</p>
          </div>
        </div>
        <form className={style.loginform} onSubmit={handleSubmit}>
          <div className={style.formwrap}>
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formwrap}>
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.checkboxwrap}>
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me →</label>
          </div>
          <div className={style.buttonwrap}>
            <button type="submit">LOG IN →</button>
            <Link to="/signup" className={style.link}>
              <span>Not part of the crew yet? Sign up now!</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
