/* node-modules */
import React, {useEffect, useState} from 'react';
import {FaUser, FaUserMinus} from "react-icons/fa"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {RiMoneyDollarCircleFill} from "react-icons/ri"

/* components */
import AddTransaction from "../Transactions/AddTransaction";
import Loader from "../Loader";
import Avatar from "../Avatar";

/* elements */
import Flex from "../../elements/Flex";
import Paper from "../../elements/Paper";
import Typography from "../../elements/Typography";
import StyledModal from "../../elements/StyledModal";
import IconButton from "../../elements/IconButton";

/* actions */
import {deleteContact} from "../../store/actions/contactActions";

const Contact = ({contactData, deleteContact}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=> {
        return () => setIsLoading(false)
    },[])

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Paper width="500px" padding="10px" margin="5px">
                <Flex direction="row">
                    <Flex direction="row" justifyContent="flex-start">
                        <Avatar>
                            <FaUser/>
                        </Avatar>
                        <div>
                            <Typography
                                margin="0px 0px 0px 10px">{contactData.contact.firstName} {contactData.contact.lastName}</Typography>
                            <Typography margin="0px 0px 0px 10px">{contactData.contact.email}</Typography>
                        </div>
                    </Flex>
                    <IconButton color="#F4C038" onClick={toggleModal}>
                        <RiMoneyDollarCircleFill/>
                    </IconButton>
                    {
                        isLoading
                            ? <Loader margin="0px 2px"/>
                            : <IconButton color="#D93855" onClick={() => deleteContact(contactData.id, setIsLoading)}>
                                <FaUserMinus/>
                            </IconButton>
                    }
                </Flex>
            </Paper>
            <StyledModal
                isOpen={isOpen}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}
            >
                <AddTransaction closeModal={toggleModal} contactData={contactData.contact}/>
            </StyledModal>
        </>
    );
};

Contact.propTypes = {
    contactData: PropTypes.object.isRequired,
    deleteContact: PropTypes.func.isRequired,
    toggleModal: PropTypes.func
}


export default connect(null, {deleteContact})(Contact);