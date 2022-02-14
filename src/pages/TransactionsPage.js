/* node-modules */
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

/* components */
import MainLayout from "../components/MainLayout";
import UserAmount from "../components/UserAmount";
import AddTransaction from "../components/Transactions/AddTransaction";
import TransactionsContainer from "../components/Transactions/TransactionsContainer";

/* elements */
import Flex from "../elements/Flex";
import Button from "../elements/Button";
import StyledModal from "../elements/StyledModal";

/* actions */
import {getTransactions} from "../store/actions/transactionActions";

const TransactionsPage = ({userId, userAmount, isLoading, transactions, getTransactions}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("buttons")

    useEffect(() => {
            getTransactions(userId)
        }, [])

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <MainLayout>
            <Flex>
                <UserAmount userAmount={userAmount} isLoading={isLoading}/>
                <Button width="450px" onClick={toggleModal}>{t("new_transaction")}</Button>
                <StyledModal
                    isOpen={isOpen}
                    onBackgroundClick={toggleModal}
                    onEscapeKeydown={toggleModal}
                >
                    <AddTransaction closeModal={toggleModal}/>
                </StyledModal>
                <TransactionsContainer transactions={transactions} userId={userId} isLoading={isLoading}/>
            </Flex>
        </MainLayout>
    );
};

TransactionsPage.propTypes= {
    userId: PropTypes.string.isRequired,
    userAmount: PropTypes.number,
    transactions: PropTypes.any.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getTransactions: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
        userAmount: state.transaction.userAmount,
        transactions: state.transaction.transactions,
        isLoading: state.transaction.isLoading,
    }
}

export default connect(mapStateToProps, {getTransactions})(TransactionsPage);