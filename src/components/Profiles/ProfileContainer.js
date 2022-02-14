/* node-modules */
import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

/* components */
import ProfileInfo from "./ProfileInfo";

/* elements */
import Paper from "../../elements/Paper";
import Flex from "../../elements/Flex";
import Typography from "../../elements/Typography";
import Button from "../../elements/Button";

const ProfileContainer = ({isLoading, userProfile, setIsOpen}) => {
    const { t } = useTranslation([ "labels", "buttons", "texts"])

    return (
        <>
            <Paper width="400px" margin="10px" padding="10px 30px 30px 30px">
                <Flex>
                    <Typography fontSize="20px" color="white" margin="20px">{t("profile_page.header", {ns: "texts"})}</Typography>
                </Flex>
                <ProfileInfo label={t("firstName")} isLoading={isLoading} text={userProfile.firstName}/>
                <ProfileInfo label={t("lastName")} isLoading={isLoading} text={userProfile.lastName}/>
                <ProfileInfo label={t("email")} isLoading={isLoading} text={userProfile.email}/>
            </Paper>
            <Button width="300px" onClick={() => setIsOpen(true)}>
                {t("update_profile", {ns: "buttons"})}
            </Button>
        </>
    );
};

ProfileContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    userProfile: PropTypes.object.isRequired,
    setIsOpen: PropTypes.func.isRequired,
}

export default ProfileContainer;