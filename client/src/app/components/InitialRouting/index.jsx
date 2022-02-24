import React from 'react'
import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import { v4 as uuidV4 } from 'uuid'

import HomeScreen from "pages/HomeScreen"

const InitialRouting = () => {
    const navigate = useNavigate()

    return (
        <>
            <Routes>
                <Route
                    path='/documents/:id'
                    element={<HomeScreen/>}
                />
                <Route
                    path='/'
                    element={<Navigate to={`/documents/${uuidV4()}`} />}
                />
            </Routes>
        </>
    )
}

export default InitialRouting