"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import router
import api from '../../utils/api';

export default function Login() {
  const router = useRouter(); // ✅ Initialize router
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📤 Sending login data:', form);

    try {
      const res = await api.post('/auth/login', form);
      console.log('✅ Logged in:', res.data);
      
      localStorage.setItem('token', res.data.token);
      alert('Login successful');

      router.push('/'); // ✅ Move this inside the try block
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
