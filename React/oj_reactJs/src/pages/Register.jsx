import { useState } from 'react';
import { registerUser } from '../Services/authService';
import RegisterForm from '../Components/RegisterForm';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await registerUser(form);
    const { token, user, message } = res.data;

    if (token) {
      localStorage.setItem("token", token); // ✅ Save token for auto login
      alert(message || "Registered successfully!");

      // Optional: redirect to dashboard or profile
      window.location.href = "/dashboard"; // or use useNavigate from react-router
    } else {
      alert("Registration successful, but login failed.");
    }
  } catch (err) {
    alert(err.response?.data || "Something went wrong");
  }
};

  return (
    <RegisterForm
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default Register;
