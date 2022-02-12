import React, {useState} from 'react';
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import styled from "styled-components"
import {FaUser, FaUserMinus} from "react-icons/fa"
import {RiMoneyDollarCircleFill} from "react-icons/ri"
import PropTypes from "prop-types";
import Typography from "../elements/Typography";
import {deleteContact} from "../store/actions/contactActions";
import {connect} from "react-redux";
import AddTransaction from "./Transactions/AddTransaction";
import Modal from "styled-react-modal";
import Loader from "../assets/loader/Loader";

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
`

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #556080;
  border: 2px solid #3D4554;

  & > svg {
    color: white;
  }
`

const IconButton = styled.button`
  all: unset;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;

  & > svg {
    height: 20px;
    width: 20px;
    color: ${({color}) => color || "white"};
  }
`

const Contact = ({contactData, deleteContact}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }


    return (
        <>
            <Paper width="500px" padding="10px" margin="5px">
                <Flex direction="row">
                    <Flex direction="row" justifyContent="flex-start">
                        <AvatarContainer>
                            <FaUser/>
                        </AvatarContainer>
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
                <AddTransaction contactData={contactData.contact}/>
            </StyledModal>
        </>
    );
};

Contact.propTypes = {
    contactData: PropTypes.object,
    deleteContact: PropTypes.func,
    toggleModal: PropTypes.func
}


export default connect(null, {deleteContact})(Contact);