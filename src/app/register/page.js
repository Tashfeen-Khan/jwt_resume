"use client";
import { useState } from 'react';
import api from '../../utils/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📤 Sending registration data:', form);

    try {
      const res = await api.post('/auth/register', form);
      console.log('✅ Registered:', res.data);
      alert('✅ Registered successfully');
    } catch (err) {
      if (err.response) {
        console.error('❌ Server responded with an error:', err.response.data);
        alert(`❌ Error: ${err.response.data.message}`);
      } else if (err.request) {
        console.error('❌ Request was made but no response received:', err.request);
        alert('❌ No response from server');
      } else {
        console.error('❌ Error setting up request:', err.message);
        alert('❌ Request setup failed');
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
