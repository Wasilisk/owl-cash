/* node-modules */
import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

/* elements */
import Typography from "../../elements/Typography";
import Flex from "../../elements/Flex";

const ProfileInfo = ({isLoading, label, text}) => {
    const { t } = useTranslation("texts")

    return (
        <Flex direction="row" justifyContent="flex-start">
            <Typography>{label}:</Typography>
            <Typography margin="10px" color="#F4C038">
                {
                    isLoading
                        ? t("common.loading")
                        : text
                }
            </Typography>
        </Flex>
    );
};

ProfileInfo.propTypes = {
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    text: PropTypes.string
}

export default ProfileInfo;