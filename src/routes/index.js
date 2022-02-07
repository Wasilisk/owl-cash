import React from "react"
import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import WelcomePage from "../pages/WelcomePage";
import CreateProfilePage from "../pages/CreateProfilePage";
import TransactionsPage from "../pages/TransactionsPage";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../pages/ProfilePage";

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route index element={<WelcomePage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/create-profile" element={<CreateProfilePage/>} />
                <Route path="/transactions" element={<PrivateRoute component={TransactionsPage}/>}/>
                <Route path="/profile" element={<PrivateRoute component={ProfilePage}/>}/>

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </>
    )
}


export default AppRouter;