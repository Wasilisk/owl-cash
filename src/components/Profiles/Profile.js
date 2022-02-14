/* node-modules */
import React, {useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FaUser, FaUserCheck, FaUserPlus} from "react-icons/fa"

/* components */
import Avatar from "../Avatar";
import IconContainer from "../IconContainer";
import Loader from "../Loader";

/* elements */
import Flex from "../../elements/Flex";
import Paper from "../../elements/Paper";
import Typography from "../../elements/Typography";
import IconButton from "../../elements/IconButton";

/* actions */
import {createContact} from "../../store/actions/contactActions";

const Profile = ({userId, profileData, createContact}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Paper width="500px" padding="10px" margin="5px">
            <Flex direction="row">
                <Flex direction="row" justifyContent="flex-start">
                    <Avatar>
                        <FaUser/>
                    </Avatar>
                    <div>
                        <Typography
                            margin="0px 0px 0px 10px">{profileData.firstName} {profileData.lastName}</Typography>
                        <Typography margin="0px 0px 0px 10px">{profileData.email}</Typography>
                    </div>
                </Flex>
                {
                    profileData.isUserContact
                        ? <IconContainer color="#3CBF27">
                            <FaUserCheck/>
                        </IconContainer>
                        : isLoading
                            ? <Loader/>
                            : <IconButton onClick={() => createContact(userId, profileData.user, setIsLoading)}>
                                <FaUserPlus/>
                            </IconButton>
                }
            </Flex>
        </Paper>
    );
};

Profile.propTypes = {
    userId: PropTypes.string.isRequired,
    profileData: PropTypes.object.isRequired,
    createContact: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
    }
}

export default connect(mapStateToProps, {createContact})(Profile);