import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { User, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import UploadWidget from '../../components/uploadWidget/UploadWidget';

const UpdateProfile = () => {

    const { currentUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await apiRequest.put(`/users/${currentUser.id}`, {
                username,
                email,
                password,
                avatar: avatar[0]
            });

            updateUser(res.data);

            navigate("/account");

        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="relative flex flex-col lg:flex-row gap-20 mb-20 lg:mb-0 lg:gap-5 h-[calc(100vh-130px)] px-5 lg:px-0">
            <Link to="/account" className="absolute top-2 lg:top-10 left-2 2xl:left-0 flex justify-center items-center p-1 rounded-full hover:bg-dark_gray/10 cursor-pointer transition duration-75">
                <X className="w-7 h-7 text-dark_gray" />
            </Link>
            <form onSubmit={handleSubmit} className="flex flex-col mt-24 lg:mt-0 justify-center items-center flex-1">
                <h1 className="text-3xl font-semibold">Update Profile</h1>

                <div className="flex flex-col gap-1 mt-5 w-full max-w-[300px]">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        defaultValue={currentUser.username}
                        className="bg-light_white border border-light_brown_3 h-10 px-4 py-2 rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1 mt-5 w-full max-w-[300px]">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={currentUser.email}
                        className="bg-light_white border border-light_brown_3 h-10 px-4 py-2 rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1 mt-5 w-full max-w-[300px]">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="bg-light_white border border-light_brown_3 h-10 px-4 py-2 rounded-md"
                    />
                </div>

                {error && <span className="text-red-600 text-[14px] w-max mt-10 text-wrap">{error}</span>}

                <button type="submit" disabled={isLoading} className="mt-5 w-full max-w-[300px] bg-light_brown_1 px-4 py-2 text-white rounded-md hover:bg-light_brown_1/90">
                    Update
                </button>
            </form>
            <div className="flex flex-col gap-10 p-4 lg:p-0 justify-center items-center bg-light_brown_3 flex-1">
                {avatar && avatar !== null && avatar !== "" ? (
                    <img src={avatar[0] || currentUser.avatar || null} alt="user" className="max-w-full max-h-96 object-cover object-center" />
                ) : (
                    <div className="flex justify-center items-center bg-dark_gray text-white w-24 h-24 rounded-full p-1">
                        <User className="w-20 h-20" />
                    </div>
                )}

                <div className="w-[90%]">
                    <UploadWidget uwConfig={{
                        cloudName: "deepcode",
                        uploadPreset: "nest-quest",
                        multiple: false,
                        maxImageFileSize: 2000000,
                        folder: "avatars",
                    }} setState={setAvatar} />
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile