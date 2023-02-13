
import React from 'react';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useAuthStatus() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);


    //When app is loaded
    useEffect(() => {
        //Checking is user is logged in
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            //Gives true or false
            if (user) {
                setLoggedIn(true)
            }
            setCheckingStatus(false);
        })

    }, []);

    return {
        loggedIn: loggedIn,
        checkingStatus: checkingStatus
    }
}
