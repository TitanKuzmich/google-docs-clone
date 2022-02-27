import React from 'react'
import {Navigate, Route, Routes, useNavigate} from "react-router-dom"

import HomeScreen from "pages/HomeScreen"

const InitialRouting = () => {
    const navigate = useNavigate()

    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={<Navigate to='/docs'/>}
                />
                <Route
                    path='/docs'
                    element={<HomeScreen/>}
                />
            </Routes>
        </>
    )
}

export default InitialRouting