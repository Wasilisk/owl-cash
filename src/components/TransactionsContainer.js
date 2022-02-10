import React, {useState} from 'react';
import Paginate from "./Paginate";
import Flex from "../elements/Flex";
import PropTypes from "prop-types";
import Transaction from "./Transaction";
import Loading from "./Loading";


const TransactionsContainer = ({transactions, userId, isLoading}) => {
    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = 5;
    const pageCount = Math.ceil(transactions.length / itemsPerPage);

    const currentPageData = transactions.slice(itemOffset, itemOffset + itemsPerPage)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % transactions.length;
        setItemOffset(newOffset);
    };

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
                        onPageChange={handlePageClick}
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