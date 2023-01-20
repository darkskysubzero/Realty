import React from 'react'
import { Outlet, Navigate } from 'react-router';
import { useAuthStatus } from '../Hooks/useAuthStatus';

export default function PrivateRoute() {

    const { loggedIn, checkingStatus } = useAuthStatus();

    // So while sending request display loading
    if (checkingStatus) {
        return <h2>Loading...</h2>
    }

    /*
        An <Outlet> should be used in parent route elements to render their child route elements. 
    */

    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}
