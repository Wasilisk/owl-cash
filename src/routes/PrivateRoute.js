import React from 'react';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({element: RouteComponent, isAuth}) => {
    if (isAuth) {
        return <RouteComponent />
    }

    return <Navigate to="/" />
};

PrivateRoute.propTypes = {
    element: PropTypes.node,
    isAuth: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(PrivateRoute);