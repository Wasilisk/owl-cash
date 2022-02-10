import React, {useEffect, useState} from 'react';
import MainLayout from "../components/MainLayout";
import {connect} from "react-redux";
import {getTransactions} from "../store/actions/transactionActions";
import PropTypes from "prop-types";
import UserAmount from "../components/UserAmount";
import Flex from "../elements/Flex";
import TransactionsContainer from "../components/TransactionsContainer";
import Button from "../elements/Button";
import AddTransaction from "../components/AddTransaction";
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TransactionsPage = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
            props.getTransactions(props.userId)
        }
    , [])

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }
    return (
        <MainLayout>
            <Flex>
                <UserAmount transactions={props.transactions} userId={props.userId} isLoading={props.isLoading}/>
                <Button onClick={toggleModal}>Add Transaction</Button>
                <StyledModal
                    isOpen={isOpen}
                    onBackgroundClick={toggleModal}
                    onEscapeKeydown={toggleModal}
                >
                    <AddTransaction/>
                </StyledModal>
                <TransactionsContainer transactions={props.transactions} userId={props.userId} isLoading={props.isLoading}/>
            </Flex>
        </MainLayout>
    );
};

TransactionsPage.propTypes= {
    userId: PropTypes.string,
    transactions: PropTypes.any,
    isLoading: PropTypes.bool,
    getTransactions: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
        transactions: state.transaction.transactions,
        isLoading: state.transaction.isLoading,
    }
}

export default connect(mapStateToProps, {getTransactions})(TransactionsPage);