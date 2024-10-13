import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";

const SignUp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        try {
            await apiRequest.post("/auth/register", {
                username,
                email,
                password
            });

            navigate("/login");

        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex h-[calc(100vh-130px)]">
            <div className="hidden lg:flex relative flex-1">
                <img src="/auth_image_1.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute w-full h-full bg-black/30 top-0 left-0" />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1 bg-light_white mt-20 lg:mt-0 lg:justify-center items-center">
                <div className="flex flex-col gap-5 w-[90%] max-w-[400px]">
                    <h1 className="w-full text-4xl text-center">Sign Up</h1>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" className="w-full rounded-lg px-5 py-2 border border-light_brown_3" minLength="3" maxLength="20" required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" className="w-full rounded-lg px-5 py-2 border border-light_brown_3" required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" className="w-full rounded-lg px-5 py-2 border border-light_brown_3" minLength="5" required />
                    </div>

                    {error && <span className="text-red-600">{error}</span>}

                    <button type="submit" disabled={isLoading} className="w-full px-5 py-3 bg-light_brown_1 text-lg text-white mt-10 rounded-lg">Sign up</button>

                    <hr className="w-full bg-light_brown_3 mt-5 h-[2px]" />

                    <p className="text-center">Already have an account? <Link to="/login" className="text-light_brown_1 font-bold">Log in here.</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignUp