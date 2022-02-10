import React from 'react';
import Flex from "../elements/Flex";
import Typography from "../elements/Typography";
import OwlIcon from "../assets/images/owl3.png"
import Image from "../elements/Image";
import Paper from "../elements/Paper";
import PropTypes from "prop-types";

const Loading = ({width}) => {
    return (
        <Paper width={width} margin="20px" padding="10px">
            <Flex>
                <Image height="300px" width="300px" src={OwlIcon}/>
                <Typography
                    color="#F4C038"
                    fontSize="24px"
                    margin="0px 0px 20px 0px"
                >
                    Is Loading...
                </Typography>
            </Flex>
        </Paper>
    );
};

Loading.propTypes = {
    width: PropTypes.string
}

export default Loading;