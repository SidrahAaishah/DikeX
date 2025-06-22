import { useState } from 'react';
import { registerUser } from '../Services/authService';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await registerUser(form);
      alert(res.data || "Registered successfully!");
    } catch (err) {
      alert(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="firstName" placeholder="First Name" onChange={handleChange} /><br />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Register;
