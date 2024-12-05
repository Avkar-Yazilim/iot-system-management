import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import InputField from "../components/InputField";
import Button from "../components/Button";
import logo from "../assets/logo.png"; // avkar logo
import googleLogo from "../assets/google.png"; // Google logosu

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Login işlemi başarılı olduğunda yönlendirme yap
        // if (username && password) {  BUNLAR SONRADAN YORUM SATIRINDAN ÇIKARILACAK
        navigate("/mainmenu");
        /* } else {
             alert("Please enter username and password"); BUNLAR SONRADAN YORUM SATIRINDAN ÇIKARILACAK
         } */
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Tarla App</h1>
                <InputField
                    type="text"
                    placeholder="Username or email"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="google-login">
                    <span>Log in with Google</span>
                    <img src={googleLogo} alt="Google Logo" className="google-icon" />
                </div>
                <Button label="LOGIN" onClick={handleLogin} className="login-button" />
            </div>
        </div>
    );
};

export default Login;
