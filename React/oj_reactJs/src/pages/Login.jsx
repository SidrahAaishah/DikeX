import {useState} from 'react'
import {loginUser} from '../Services/authService'
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const [form , setForm] = useState({
        email : '',
        password:''
    });

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async() => {
        try {
            const res = await loginUser(form);
            localStorage.setItem("token",res.data.token);
            navigate('/dashboard');
            alert("logged in successfully");

        } catch (error) {
            alert("Login failed");
            console.error(error);
        }
    };

    return (
    <div>
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} value={form.email}/><br />
      <input name="password" type="password" onChange={handleChange} value={form.password}/><br />
      <button onClick={handleSubmit}>Login</button>
    </div>
    );

}

export default Login;