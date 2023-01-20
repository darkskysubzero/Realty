import React, { useState } from 'react'
import LoginImage from '../Assets/login.jpg';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import OAuth from "../Components/OAuth";
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function SignIn() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData;

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            }
        })
    }



    // When user clicks on sign in
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();

            //Get user credentials
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);

            // If successful
            if (userCredentials.user) {
                navigate("/")
                toast.success("Logged in successfully!");
            }



        } catch (error) {
            toast.error("Invalid login!");
        }
    }

    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold font-poppins' >Sign In</h1>
            <div className='flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto'>
                {/* Image */}
                <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                    <img
                        src={LoginImage} alt="sign in image"
                        className='w-full rounded-2xl' />
                </div>

                {/* Form */}
                <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                    <form autoComplete="off" onSubmit={onSubmit}>
                        {/* Email Input */}
                        <input
                            type="email"
                            id='email'
                            value={email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className='w-full px-4 py-2 text-xl rounded-md transition ease-in-out font-poppins mb-6'
                        />

                        {/* Password Input */}
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                value={password}
                                onChange={handleChange}
                                placeholder="Password"
                                className='w-full px-4 py-2 text-xl rounded-md transition ease-in-out font-poppins mb-6'
                            />
                            {showPassword ?
                                <AiFillEyeInvisible
                                    className='absolute text-xl right-3 top-3 cursor-pointer'
                                    onClick={() => setShowPassword(prevState => !prevState)}
                                /> :
                                <AiFillEye
                                    className='absolute text-xl right-3 top-3 cursor-pointer'
                                    onClick={() => setShowPassword(prevState => !prevState)}
                                />}
                        </div>

                        <div className='flex justify-between whitespace-nowrap
                        text-sm sm:text-lg
                        '>
                            <p className='mb-6 select-none'>Don't have an account? <Link to="/sign-up" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Register</Link></p>

                            <p><Link to="/forgot-password" className='text-gray-500 hover:text-gray-900 transition duration-200 ease-in-out select-none'>Forgot Password?</Link></p>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type='submit' className='w-full bg-blue-600 text-white px-7 py-3 font-medium uppercase rounded-md shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800 select-none'>Sign in</button>

                        {/* Or Line */}
                        <div className='
                            my-4 flex items-center before:border-t before:flex-1 before:border-gray-700 after:border-t after:flex-1 after:border-gray-700
                            '> <p className='text-center font-semibold mx-4'>OR</p>
                        </div>

                        {/* Google Sign In */}
                        <OAuth />

                    </form>


                </div>
            </div>
        </section>
    )
}
