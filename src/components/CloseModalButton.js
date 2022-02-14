/* node-modules */
import React from 'react';
import {ImCancelCircle} from "react-icons/im";
import PropTypes from "prop-types";

/* elements */
import IconButton from "../elements/IconButton";

const CloseModalButton = ({closeModal}) => {
    return (
        <IconButton
            onClick={closeModal}
            color="rgba(255, 255, 255, 0.5)"
            style={{position: "absolute", right: "10px", top: "20px"}}>
            <ImCancelCircle/>
        </IconButton>
    );
};

CloseModalButton.propTypes ={
    closeModal: PropTypes.func.isRequired
}

export default CloseModalButton;