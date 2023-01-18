import React from 'react'
import logo from "../Assets/logo.png";
import { useLocation, useNavigate } from 'react-router-dom';


export default function Header() {

    //Getting current page location
    const location = useLocation();
    const pathMatches = (route) => route === location.pathname;

    //To navigate between pages
    const navigate = useNavigate();

    return (
        <div className='bg-white border-b sticky top-0 z-50'>
            <header className='flex justify-between items-center px-10  max-w-6xl mx-auto'>
                <div><img
                    src={logo}
                    alt="logo"
                    className='h-12 cursor-pointer'
                    onClick={() => navigate("/")}
                /></div>
                <div>
                    <ul className='flex space-x-10 font-poppins'>
                        <li
                            className={`hover:font-medium cursor-pointer py-6 text-black ${pathMatches("/") && "text-black border-b-4 border-b-red-500"}`}
                            onClick={() => navigate("/")}
                        >Home</li>

                        <li
                            className={`hover:font-medium  cursor-pointer py-6 text-black ${pathMatches("/offers") && "text-black border-b-4 border-b-red-500"}`}
                            onClick={() => navigate("/offers")}
                        >Offers</li>

                        <li
                            className={`hover:font-medium  cursor-pointer py-6 text-black ${pathMatches("/sign-in") && "text-black border-b-4 border-b-red-500"}`}
                            onClick={() => navigate("/sign-in")}
                        >Sign in</li>
                    </ul>
                </div>
            </header>
        </div>
    )
}
