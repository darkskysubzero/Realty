import React, { useState, useEffect } from 'react'
import logo from "../Assets/logo.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {

    //Getting current page location
    const location = useLocation();
    const pathMatches = (route) => route === location.pathname;

    //To navigate between pages
    const navigate = useNavigate();

    //To change name based on name
    const [pageState, setPageState] = useState("Sign in");

    //checking auth status for login status
    const auth = getAuth();

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            //if user authenticated
            if (user) {
                setPageState("Profile");
            } else {
                setPageState("Sign in")
            }
        })
    }, [auth]);

    return (
        <div className='bg-white border-b sticky top-0 z-50'>
            <header className='flex flex-wrap justify-between items-center px-10  max-w-6xl mx-auto'>
                <div><img
                    src={logo}
                    alt="logo"
                    className='h-12 cursor-pointer'
                    onClick={() => navigate("/")}
                /></div>
                <div>
                    <ul className='flex space-x-10 font-poppins'>
                        <li
                            className={`cursor-pointer py-6 text-black text-opacity-50 ${pathMatches("/") && " text-opacity-100 text-black border-b-4 border-b-red-500"}`}
                            onClick={() => navigate("/")}
                        >Home</li>

                        <li
                            className={`cursor-pointer py-6 text-black text-opacity-50 ${pathMatches("/offers") && "text-opacity-100 text-black border-b-4 border-b-red-500"}`}
                            onClick={() => navigate("/offers")}
                        >Offers</li>

                        <li
                            className={`cursor-pointer py-6 text-black text-opacity-50 ${(pathMatches("/sign-in") || pathMatches("/profile")) && "text-opacity-100 text-black border-b-4 border-b-red-500"}`}
                            onClick={() => navigate("/profile")}
                        >{pageState}</li>
                    </ul>
                </div>
            </header>
        </div>
    )
}
