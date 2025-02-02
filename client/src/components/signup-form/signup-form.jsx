import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import art from '../../assets/multiple_pcs.jpg';
import style from './signupform.module.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.agreedToTerms) {
      alert('Please agree to the terms and conditions before signing up.');
      return;
    }

    const { firstname, lastname, email, password } = formData;
    const payload = { firstname, lastname, email, password };

    try {
      const response = await axios.post('https://tech-interns.onrender.com/api/auth/signup', payload);
      alert(response.data.message || 'Signup successful!'); // Display backend response message
    } catch (error) {
      console.error('Error signing up:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to sign up');
    }
  };

  return (
    <div className={style.signupcont}>
      <div className={style.grid}></div>
      <div className={style.left}>
        <div className={style.imageContainer}>
          <img src={art} alt="Tech illustration" />
          <div className={style.imageBorder}></div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.heading}>
          <h1>START HERE_</h1>
          <div className={style.subheading}>
            <h3>NO EXPERIENCE? NO PROBLEM.</h3>
            <p>Raw talent → Real opportunities</p>
          </div>
        </div>
        <form className={style.signupform} onSubmit={handleSubmit}>
          <div className={style.formGrid}>
            <div className={style.formwrap}>
              <label htmlFor="firstname">FIRST NAME</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className={style.formwrap}>
              <label htmlFor="lastname">LAST NAME</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
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
            <input
              type="checkbox"
              id="tandc"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="tandc">I agree to the terms and conditions →</label>
          </div>
          <div className={style.buttonwrap}>
            <button type="submit">CREATE ACCOUNT →</button>
            <Link to="/login" className={style.link}>
              <span>Already have an account? Sign in here</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
