import React, {useEffect} from 'react';
import MainLayout from "../components/MainLayout";
import {connect} from "react-redux";
import {getTransactions} from "../store/actions/transactionActions";
import PropTypes from "prop-types";
import UserAmount from "../components/UserAmount";
import Flex from "../elements/Flex";
import TransactionsContainer from "../components/TransactionsContainer";

const TransactionsPage = (props) => {
    useEffect(() => {
            props.getTransactions(props.userId)
        }
    , [])

    return (
        <MainLayout>
            <Flex>
                <UserAmount transactions={props.transactions} userId={props.userId} isLoading={props.isLoading}/>
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