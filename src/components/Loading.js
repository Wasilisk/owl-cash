/* node-modules */
import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

/* elements */
import Flex from "../elements/Flex";
import Typography from "../elements/Typography";
import Image from "../elements/Image";
import Paper from "../elements/Paper";

/* assets */
import OwlIcon from "../assets/images/owl3.png"

const Loading = ({width, height}) => {
    const { t } = useTranslation("texts")

    return (
        <Flex>
            <Paper width={width} height={height} margin="10px" padding="10px">
                <Flex>
                    <Image height="300px" width="300px" src={OwlIcon}/>
                    <Typography
                        color="#F4C038"
                        fontSize="24px"
                        margin="0px 0px 20px 0px"
                    >
                        {t("common.loading")}
                    </Typography>
                </Flex>
            </Paper>
        </Flex>
    );
};

Loading.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
}

export default Loading;