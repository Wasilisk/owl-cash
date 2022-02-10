import React, {useEffect, useState} from 'react';
import Flex from "../elements/Flex";
import OwlIcon from "../assets/images/owl4.png"
import Image from "../elements/Image";
import Paper from "../elements/Paper";
import Typography from "../elements/Typography";
import {getUserProfile, updateProfile} from "../store/actions/profileActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MainLayout from "../components/MainLayout";
import Button from "../elements/Button";
import UpdateProfile from "../components/UpdateProfile";
import {passwordRecovery} from "../store/actions/authActions";

const ProfilePage = ({userProfile, userId, isLoading, getUserProfile, updateProfile, passwordRecovery}) => {
    const [isProfileUpdateOpen, setIsProfileUpdateOpen] = useState(false);

    useEffect(() => {
        getUserProfile(userId)
    }, [])

    return (
        <MainLayout>
            <Flex>
                <Image width="300px" height="300px" src={OwlIcon}/>
                {
                    isProfileUpdateOpen
                        ? <UpdateProfile
                            userId={userId}
                            updateProfile={updateProfile}
                            userProfile={userProfile}
                            setIsOpen={setIsProfileUpdateOpen}
                        />
                        : <>
                            <Paper width="400px" margin="10px">
                                <Flex direction="row" justifyContent="flex-start">
                                    <Typography>First name:</Typography>
                                    <Typography marginLeft="10px" color="#F4C038">
                                        {
                                            isLoading
                                                ? "... Loading"
                                                : userProfile.firstName
                                        }
                                    </Typography>
                                </Flex>
                                <Flex direction="row" justifyContent="flex-start">
                                    <Typography>Last name:</Typography>
                                    <Typography marginLeft="10px" color="#F4C038">
                                        {
                                            isLoading
                                                ? "... Loading"
                                                : userProfile.lastName
                                        }
                                    </Typography>
                                </Flex>
                                <Flex direction="row" justifyContent="flex-start">
                                    <Typography>Email:</Typography>
                                    <Typography marginLeft="10px" color="#F4C038">
                                        {
                                            isLoading
                                                ? "... Loading"
                                                : userProfile.email
                                        }
                                    </Typography>
                                </Flex>
                            </Paper>
                            <Button width="300px" onClick={() => setIsProfileUpdateOpen(true)}>
                                Update Profile
                            </Button>
                        </>
                }
                <Button width="300px" onClick={() => passwordRecovery(userProfile.email)}>Update Password</Button>
            </Flex>
        </MainLayout>
    );
};

ProfilePage.propTypes = {
    userProfile: PropTypes.object,
    userId: PropTypes.string,
    isLoading: PropTypes.bool,
    getUserProfile: PropTypes.func,
    updateProfile: PropTypes.func,
    passwordRecovery: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profile.currentProfile,
        userId: state.auth.currentUser.id,
        isLoading: state.profile.isLoading
    }
}

export default connect(mapStateToProps, {passwordRecovery, getUserProfile, updateProfile})(ProfilePage);