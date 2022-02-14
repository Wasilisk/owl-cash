/* node-modules */
import React from 'react';
import PropTypes from "prop-types";

/* elements */
import Paper from "../elements/Paper";
import Flex from "../elements/Flex";
import Image from "../elements/Image";
import Typography from "../elements/Typography";

/* assets */
import OwlIcon from "../assets/images/owl6.png"

const EmptyList = ({text}) => {
    return (
        <Flex>
            <Paper width="500px" height="450px" padding="10px" margin="20px">
                <Flex>
                    <Image width="300px" height="300px" src={OwlIcon}/>
                    <Typography>{text}</Typography>
                </Flex>
            </Paper>
        </Flex>
    );
};

EmptyList.propTypes = {
    text: PropTypes.string.isRequired
}

export default EmptyList;