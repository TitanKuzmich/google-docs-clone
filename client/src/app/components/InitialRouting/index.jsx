import React from 'react'
import {Route, Routes} from "react-router-dom"

import HomeScreen from "pages/HomeScreen"

const InitialRouting = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<HomeScreen/>}
                />
            </Routes>
        </>
    )
}

export default InitialRouting