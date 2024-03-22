import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children, authentication = true }) {
    const [loader, setloader] = useState(true);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate();

    console.log(isLoggedIn)
    useEffect(() => {
        if (authentication && isLoggedIn !== authentication) {
            navigate('/login')
        } else if (!authentication && isLoggedIn !== authentication) {
            navigate('/')
        }
        setloader(false);
    }, [isLoggedIn, authentication, navigate])

    return loader ? <h1>Loading...</h1> : <>{ children }</>

}

export default ProtectedRoute
