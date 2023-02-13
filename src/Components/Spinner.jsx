import React from 'react'
import spinner from "../Assets/svg/spinner.svg";

function Spinner() {
    return (
        <div className='fixed left-0 right-0 bottom-0 top-0 bg-white z-50  flex items-center justify-center'>
            <div>
                <img src={spinner} alt="spinner" className='h-24' />
            </div>
        </div>
    )
}

export default Spinner
