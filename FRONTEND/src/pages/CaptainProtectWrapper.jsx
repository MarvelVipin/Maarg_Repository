import React, { useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = React.useContext(CaptainDataContext)
    console.log(token);

    useEffect(() => {
        if (!token) {
            navigate('/user-login')
        }
    }, [token, navigate])

    if (!token) {
        return null; 
    }

    return <>{children}</>
}

export default UserProtectWrapper
