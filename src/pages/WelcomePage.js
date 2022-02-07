import React from 'react';
import PropTypes from 'prop-types';
import Flex from "../elements/Flex";
import Image from "../elements/Image";
import owlImage from "../assets/images/owl1.png";
import HeaderText from "../elements/Header";
import Typography from "../elements/Typography";
import Button from "../elements/Button";
import Paper from "../elements/Paper";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {getTransactions} from "../store/actions/transactionActions";
import {getUserProfile} from "../store/actions/profileActions";

const WelcomePage = (props) => {
    const navigate = useNavigate();
    return (
        <Flex>
            <Paper height="400px" width="800px">
                <Flex direction="row" justifyContent="space-between">
                    <Image
                        width="300px"
                        height="300px"
                        src={owlImage}
                        alt="Image"
                    />
                    <Flex width="600px">
                        <HeaderText>
                            Ласкаво просимо
                        </HeaderText>
                        <Typography>
                            fadssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasdfasdffffffffffffffffffffffff
                            asdfasdfasdfasdfasd
                            asdfasdfasdfasd
                            fasdfsdfasdfadfasdfasfsd
                        </Typography>
                        <Button width="300px" onClick={() => navigate("/login")}>Login</Button>
                        <Button width="300px" onClick={() => navigate("/registration")}>Register</Button>
                        <Button width="300px" onClick={() => props.getUserProfile(props.userId)}>Get Profile</Button>
                    </Flex>
                </Flex>
            </Paper>
        </Flex>
    );
};

WelcomePage.propTypes = {
    userId: PropTypes.string,
    email: PropTypes.string,
    getTransactions: PropTypes.func,
    getUserProfile: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
        email: state.auth.currentUser.email,
    }
}

export default connect(mapStateToProps, {getUserProfile, getTransactions})(WelcomePage);