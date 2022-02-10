import React from "react"
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import WelcomePage from "../pages/WelcomePage";
import CreateProfilePage from "../pages/CreateProfilePage";
import TransactionsPage from "../pages/TransactionsPage";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../pages/ProfilePage";
import SearchUsersPage from "../pages/SearchUsersPage";
import UpdatePasswordPage from "../pages/UpdatePasswordPage";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const AppRouter = ({isRehydrated}) => {
    let location = useLocation();
    const navigate = useNavigate();

    if (!isRehydrated) {
        return null
    }

    if(location.hash) {
        navigate('/update_password', { state: { hashValue: location.hash } });
    }

    return (
        <>
            <Routes>
                <Route index element={<WelcomePage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/create-profile" element={<CreateProfilePage/>}/>
                </Route>
                <Route element={<PrivateRoute/>}>
                    <Route path="/transactions" element={<TransactionsPage/>}/>
                </Route>
                <Route element={<PrivateRoute/>}>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Route>
                <Route element={<PrivateRoute/>}>
                    <Route path="/search_user" element={<SearchUsersPage/>}/>
                </Route>
                <Route element={<PrivateRoute/>}>
                    <Route path="/update_password" element={<UpdatePasswordPage/>}/>
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/"/>}
                />
            </Routes>
        </>
    )
}

AppRouter.propTypes = {
    isRehydrated: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        isRehydrated: state._persist.rehydrated
    }
}

export default connect(mapStateToProps)(AppRouter);