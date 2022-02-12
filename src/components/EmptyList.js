import React from 'react';
import Paper from "../elements/Paper";
import Flex from "../elements/Flex";
import Image from "../elements/Image";
import OwlIcon from "../assets/images/owl6.png"
import Typography from "../elements/Typography";
import PropTypes from "prop-types";

const EmptyList = ({text}) => {
    return (
        <Paper width="500px" padding="10px" margin="20px">
            <Flex>
                <Image width="300px" height="300px" src={OwlIcon}/>
                <Typography>{text}</Typography>
            </Flex>
        </Paper>
    );
};

EmptyList.propTypes = {
    text: PropTypes.string
}

export default EmptyList;