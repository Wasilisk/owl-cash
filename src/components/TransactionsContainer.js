import React, {useState} from 'react';
import Paginate from "./Paginate";
import Flex from "../elements/Flex";
import PropTypes from "prop-types";
import Transaction from "./Transaction";
import Loading from "./Loading";


const TransactionsContainer = ({transactions, userId, isLoading}) => {
    const [currentPage, setCurrentPage] = useState(0);

    const perPage = 5;
    const offset = currentPage * perPage;
    const pageCount = Math.ceil(transactions.length / perPage);

    const currentPageData = transactions.slice(offset, offset + perPage)

    if(isLoading) {
        return <Loading/>
    }

    return (
        <>
            <Flex height="480px" justifyContent="flex-start">
                {currentPageData.map(transaction => {
                    if (transaction.from.user === transaction.to.user) {
                        return <Transaction key={transaction.id}
                                            transaction={transaction}
                                            userData={transaction.from}
                                            transferType="initial"
                        />
                    } else if (transaction.from.user === userId) {
                        return <Transaction key={transaction.id}
                                            transaction={transaction}
                                            userData={transaction.to}
                                            transferType="outgoing"
                        />
                    } else {
                        return <Transaction key={transaction.id}
                                            transaction={transaction}
                                            userData={transaction.from}
                                            transferType="incoming"
                        />
                    }
                })}
            </Flex>
            {
                transactions.length > 5
                    ? <Paginate
                        pageCount={pageCount}
                        setCurrentPage={setCurrentPage}
                    />
                    : null
            }
        </>
    );
};

TransactionsContainer.propTypes = {
    transactions: PropTypes.any,
    userId: PropTypes.string,
    isLoading: PropTypes.bool
}

export default TransactionsContainer;