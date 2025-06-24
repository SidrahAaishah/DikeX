import {useState} from 'react'
import {loginUser} from '../Services/authService'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
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
        <LoginForm
            form ={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    </div>
    );

}

export default Login;