import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom"

import HomeScreen from "pages/HomeScreen"
import TextEditor from "pages/TextEditor"

const InitialRouting = () => {

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/docs"/>}
                />

                <Route
                    path="/docs"
                    element={<HomeScreen/>}
                />

                <Route
                    path="edit/:id"
                    element={<TextEditor/>}
                />
            </Routes>
        </>
    )
}

export default InitialRouting