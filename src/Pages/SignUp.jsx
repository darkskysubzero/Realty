import React, { useState } from 'react'
import SignUpImage from '../Assets/signup.jpg';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Link } from 'react-router-dom';
import OAuth from "../Components/OAuth";

// Firebase---
import { db } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

// React Router (for navigating to signin after signup)
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function SignUp() {

    // Form data 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const { email, password, name } = formData;


    // Password field state of visibility
    const [showPassword, setShowPassword] = useState(false);

    // To navigate to other pages
    const navigate = useNavigate();


    // When user types in inputs
    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            }
        })
    }

    // When user clicks on Sign Up button
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("sending...")
            // AUTHENTICATING=====================================================================
            // Gets auth instance
            const auth = getAuth();

            // Creates user with email and password
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

            // Additional Information To Profile
            updateProfile(auth.currentUser, {
                displayName: name
            })
            const user = userCredentials.user;

            // SAVING USER TO DATABASE===========================================================
            // Removing password property using destructuring
            const dataWithoutPassword = { ...formData };
            delete dataWithoutPassword.password;

            // Adding timestamp from firebase to data object
            dataWithoutPassword.timestamp = serverTimestamp();

            // Saving to database (database, users table, user id), (data)
            await setDoc(doc(db, "users", user.uid), dataWithoutPassword);

            //Defined outside method (const navigate = useNavigate())
            navigate("/");

            toast.success("Signed up successfully!");

        } catch (error) {
            // Toasting the error
            toast.error("Something went wrong with registration");
        }
        console.log("done...")
    }


    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold font-poppins' >Sign Up</h1>
            <div className='flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto'>
                {/* Image */}
                <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                    <img
                        src={SignUpImage} alt="sign in image"
                        className='w-full rounded-2xl' />
                </div>

                {/* Form */}
                <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                    <form autoComplete="off" onSubmit={onSubmit}>

                        {/* Name Input */}
                        <input
                            type="text"
                            id='name'
                            value={name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className='w-full px-4 py-2 text-xl rounded-md transition ease-in-out font-poppins mb-6'
                        />

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
                            <p className='mb-6 select-none'>Have an account? <Link to="/sign-in" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Login</Link></p>

                            <p><Link to="/forgot-password" className='text-gray-500 hover:text-gray-900 transition duration-200 ease-in-out select-none'>Forgot Password?</Link></p>
                        </div>

                        {/* Sign Up Button */}
                        <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 font-medium uppercase rounded-md shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800 select-none'>Sign Up</button>

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
