/* node-modules */
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

/* components */
import MainLayout from "../components/MainLayout";
import UpdateProfile from "../components/Profiles/UpdateProfile";
import ProfileContainer from "../components/Profiles/ProfileContainer";

/* elements */
import Flex from "../elements/Flex";
import Image from "../elements/Image";
import Button from "../elements/Button";

/* assets */
import OwlIcon from "../assets/images/owl4.png"

/* actions */
import {getUserProfile, updateProfile} from "../store/actions/profileActions";
import {passwordRecovery} from "../store/actions/authActions";

const ProfilePage = ({userProfile, userId, isLoading, getUserProfile, updateProfile, passwordRecovery}) => {
    const [isProfileUpdateOpen, setIsProfileUpdateOpen] = useState(false);
    const { t } = useTranslation("buttons")

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
                            <ProfileContainer
                                isLoading={isLoading}
                                userProfile={userProfile}
                                setIsOpen={setIsProfileUpdateOpen}
                            />
                            <Button
                                width="300px"
                                onClick={() => passwordRecovery(userProfile.email)}
                            >
                                {t("change_password")}
                            </Button>
                        </>
                }
            </Flex>
        </MainLayout>
    );
};

ProfilePage.propTypes = {
    userProfile: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    passwordRecovery: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profile.currentProfile,
        userId: state.auth.currentUser.id,
        isLoading: state.profile.isLoading
    }
}

export default connect(mapStateToProps, {passwordRecovery, getUserProfile, updateProfile})(ProfilePage);