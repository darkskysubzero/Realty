import React, { useState } from 'react'
import PasswordImage from '../Assets/password.jpg';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Link } from 'react-router-dom';
import OAuth from "../Components/OAuth";
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';


export default function ForgotPassword() {

    const [email, setEmail] = useState("");


    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();

            await sendPasswordResetEmail(auth, email);
            toast.success("Email Sent!");

        } catch (error) {
            toast.error("Could not find email");
        }
    }

    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold font-poppins' >Forgot Password</h1>
            <div className='flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto'>
                {/* Image */}
                <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                    <img
                        src={PasswordImage} alt="sign in image"
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


                        <div className='flex justify-between whitespace-nowrap
                        text-sm sm:text-lg
                        '>
                            <p className='mb-6 select-none'>Don't have an account? <Link to="/sign-up" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Register</Link></p>

                            <p><Link to="/sign-in" className='text-gray-500 hover:text-gray-900 transition duration-200 ease-in-out select-none'>Sign In Instead</Link></p>
                        </div>

                        {/* Sign In Button */}
                        <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 font-medium uppercase rounded-md shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800 select-none'>Send Reset Password</button>

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
