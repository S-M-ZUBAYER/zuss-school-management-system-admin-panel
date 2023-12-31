import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/UserContext'
import DisplaySpinner from '../Pages/Shared/Spinners/DisplaySpinner'




const PrivateRoute = ({ children }) => {
    const { user, loading, schoolName } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <DisplaySpinner></DisplaySpinner>
    }

    if (user && user.uid) {
        return children
    }
    return <Navigate to={`/${schoolName}/login`} state={{ from: location }} replace />
}

export default PrivateRoute