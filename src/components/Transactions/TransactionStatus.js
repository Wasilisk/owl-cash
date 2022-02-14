/* node-modules */
import React from 'react';

/* components */
import CloseModalButton from "../CloseModalButton";

/* elements */
import Flex from "../../elements/Flex";
import Image from "../../elements/Image";
import Typography from "../../elements/Typography";
import Paper from "../../elements/Paper";

/* assets */
import PropTypes from "prop-types";

const TransactionStatus = ({closeModal, src, color, text}) => {
    return (
        <Paper width="400px" height="350px">
            {
                closeModal
                    ? <CloseModalButton closeModal={closeModal}/>
                    : null
            }
            <Flex>
                <Image src={src} width="300px" height="300px" margin="0px"/>
                <Typography color={color}>{text}</Typography>
            </Flex>
        </Paper>
    );
};

TransactionStatus.propTypes = {
    closeModal: PropTypes.func,
    src: PropTypes.string.isRequired,
    color: PropTypes.string,
    text: PropTypes.string.isRequired
}

export default TransactionStatus;