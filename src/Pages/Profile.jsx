import React, { useState } from 'react'

import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FcHome } from "react-icons/fc";
import { Link } from 'react-router-dom';

export default function Profile() {

    const auth = getAuth();
    const navigate = useNavigate();


    const [form, setForm] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })
    const { name, email } = form;

    const [changeDetail, setChangeDetail] = useState(false);


    // User logging out
    const logout = () => {
        // Built in method
        auth.signOut();
        //Navigate to home
        navigate("/");

    }

    // Changing existing data method
    const onChange = (e) => {
        setForm((prev) => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        })
    }


    // used to add change to database
    const onSubmit = async (e) => {
        try {
            if (auth.currentUser.displayName !== name) {
                //update display name in firebase auth
                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                //update name in the firestore
                const docRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(docRef, {
                    name: name
                })

                toast.success("Profile updated sucessfully", { toastId: "success" })
            }
        } catch (e) {
            toast.error("Could not update the profile details")
        }
    }

    return (
        <>
            <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
                <h1 className='text-3xl text-center mt-6 font-bold font-poppins'>My Profile</h1>
                <div className='w-full md:w-[50%] mt-6 px-3'>
                    {/* Profile with name and email and edit options */}
                    <form>
                        {/* Name Input  */}
                        <input type="text" id='name' value={name}
                            disabled={!changeDetail}
                            onChange={onChange}
                            className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${changeDetail && "bg-red-200 focus:bg-red-200"}`}
                        />
                        {/* Email Input */}
                        <input type="email" id='email' value={email}

                            disabled={!changeDetail}
                            onChange={onChange}
                            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'
                        />

                        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
                            <p>Do you want to change your name? <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'
                                onClick={() => {

                                    //On click calling the submit method if state is set to save
                                    changeDetail && onSubmit();
                                    setChangeDetail((prev) => !prev);
                                }
                                }>
                                {changeDetail ? "Save" : "Edit"}
                            </span></p>


                            <p className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer' onClick={logout}>Sign out</p>
                        </div>
                    </form>

                    {/* Button to add listing */}
                    <button type='submit' className='w-full bg-blue-600  text-white uppercase px-7 py-3 text-sm font-medium   shadow-md rounded hover:bg-blue-700 hover:cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg active:bg-blue-800'>

                        <Link to="/create-list" className='flex justify-center items-center gap-2'>
                            <FcHome className='text-3xl bg-red-200 rounded-full p-1 border-2' />Sell or rent your home
                        </Link>
                    </button>


                </div>
            </section>
        </>
    )
}
