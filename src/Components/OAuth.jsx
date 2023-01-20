
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'

// Firebase========
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router'


export default function OAuth() {

    const navigate = useNavigate();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check for the user
            const docRef = doc(db, "users", user.uid);

            // Checking if user exists
            const docSnap = await getDoc(docRef)

            // If does not exist then add to database
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }

            // Go to homepage
            navigate("/");

            toast.success("Logged in with google sucessfully!");

        } catch (error) {
            toast.error("Could not authorize with Google")
        }
    }

    return (
        <button
            type='button'
            onClick={onGoogleClick}
            className='flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 rounded-md shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out'>
            <FcGoogle className='text-2xl bg-white rounded-full mr-2' />
            Continue With Google
        </button>
    )
}
