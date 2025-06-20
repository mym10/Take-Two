import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginCard({isLogin, toggleAuthPage, setCurrentUser, setCurrentEmail}) {
    const navigate = useNavigate();

    //login
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    //signup
    const [signupUsername, setSignupUsername] = useState("");
    const [email, setEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [pwdStrength, setPwdStrength] = useState("");

    //password strength checker
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const checkPwdStrength = (password) => {
        if (passwordRegex.test(password)) {
            setPwdStrength("Strong");
        } else if (password.length >= 8) {
            setPwdStrength("Weak - Use uppercase, lowercase, number, and special character");
        } else {
            setPwdStrength("Too short");
        }
    };

    //handle login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: loginUsername, // using email as ID
                    password: loginPassword
                })
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentUser(data.user.username);
                localStorage.setItem("currentUser", data.user.username);
                toast.success("Login successful!");
                setTimeout(() => navigate("/home"), 500);
            } else {
                const error = await response.json();
                toast.error(error.detail || "Login failed.");
            }
        } catch (err) {
            toast.error("Server error during login.");
        }
    };

    //handle signup
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (pwdStrength !== "Strong") {
            toast.warn("Please set a strong password!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: signupUsername,
                    email: email,
                    password: signupPassword
                })
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentUser(signupUsername);
                setCurrentEmail(email);
                localStorage.setItem("currentUser", signupUsername);
                localStorage.setItem("currentEmail", email);
                toast.success("Account created successfully!");
                setTimeout(() => navigate("/home"), 500);
            } else {
                const error = await response.json();
                toast.error(error.detail || "Signup failed.");
            }
        } catch (err) {
            toast.error("Server error during signup.");
        }
    };

    return (
        <div className={`login-signup-page ${isLogin ? "" : "signup-visible"}`}>
            {isLogin ? (
                <div className={`login-card visible"}`}>
                <h1>Login</h1>
                    <div className="card">
                        <div className="form">
                        <p>Don't have an account?{" "} <span className="toggle-link" onClick={toggleAuthPage}> Sign Up here. </span> </p>
                            <input type="text" placeholder="Username" className="input" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)}/>
                            <input type="password" placeholder="Password" className="input" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                            <a href="#" className="link">Forgot Password?</a>
                            <button className="button" onClick={handleLoginSubmit}>LOGIN</button>
                        </div>
                    </div>
                </div>
            ):(
                <div className={`signup-card visible`}>
                <h1>SignUp</h1>
                    <div className="card">
                        <div className="form">
                        <p> Already have an account?{" "} <span className="toggle-link" onClick={toggleAuthPage}> Login here. </span></p>
                        <input type="text" placeholder="Username" className="input" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)}/>
                        <input type="text" placeholder="Email id" className="input" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input type="text" placeholder="Password" className="input" value={signupPassword} onChange={(e) => {setSignupPassword(e.target.value); checkPwdStrength(e.target.value)}}/>
                        <p className={`password-strength ${pwdStrength.toLowerCase()}`}>
                            {pwdStrength && `Password Strength: ${pwdStrength}`}
                        </p>
                        <button className="button" onClick={handleSignupSubmit}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default LoginCard;