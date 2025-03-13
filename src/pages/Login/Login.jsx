import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/useric.png'
import img from '../../assets/login.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { passwordValidator } from '../../service/regexValidator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    // const[successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const passwordVisibilit = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('')
        if (!passwordValidator(inputs.password)) {
            return setErrorMessage('Password should have at least one upper case letter, one lower case letter, one digit, one special character and Minimum eight character.');
        }

        if (inputs.username !== "hr" && inputs.password !== "@Hr_1234" && inputs.username !== "admin" && inputs.password !== "@Admin_123") return setErrorMessage("Invalid Password");

        localStorage.setItem('auth', true);
        if (inputs.username === "hr") {
            toast.success("Login Successfully!");
            navigate("/hrdashboard");
        } else if (inputs.username === "admin") {
            navigate("/interviewer")
            toast.success("Login Successfully!");
        }

    }

    return (
        <div className='login_container'>
            <div className='login_wrap'>
                <div className='login_img'>
                    <img src={img} alt='login-image' />
                </div>

                <div className="login_form_container">

                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>

                    <form className="form_wrap" onSubmit={formSubmit}>

                        <input className="input-field" placeholder="Username"
                            name="username" onChange={handleChange} required />

                        <div className="password-field">
                            <input className="input-field"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password" name="password" onChange={handleChange} required />
                            <span className="absolute right-2" onClick={passwordVisibilit}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        <button type="submit" className={`loginBtn ${inputs.username != "" && inputs.password != "" ? '!bg-blue-400' : '!bg-gray-500'}`}>Login</button>
                        {errorMessage.length > 0 && (
                            <span className="errMsg" style={{ color: "primary" }}>{errorMessage}</span>
                        )}

                        {/* {successMessage.length > 0 && (
                        <span className="errMsg" style={{ color: "green" }}>{successMessage}</span>
                    )} */}

                    </form>

                </div>
            </div>

        </div>
    )
}

export default Login