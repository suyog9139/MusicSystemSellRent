import React, { useState } from "react";
export const Login = (props) => {
    const [phonenumber, setphonenumber] = useState('');
    const [pass, setPass] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(phonenumber);
    }
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="phonenumber">Phone Number</label>
                <input value={phonenumber} onChange={(e) => setphonenumber(e.target.value)}type="number" placeholder="1234567890" id="phonenumber" name="phonenumber" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder=" ******** " id="password" name="password" />
                <div>
                <label className="checkbox" for="rememberMe">Remember me   </label>
                <input className="box" type="checkbox" value="lsRememberMe" id="rememberMe" />
                </div>
                <button className="submitbutton" type="submit">Log In</button>
                
            </form>
            <p>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
            
            </p>
        </div>
    )
}