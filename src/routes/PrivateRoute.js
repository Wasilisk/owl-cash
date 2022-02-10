import React from 'react';
import {connect} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({isAuth}) => {
    return isAuth ? <Outlet /> : <Navigate to="/"/>;
};

PrivateRoute.propTypes = {
    isAuth: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(PrivateRoute);