/* node-modules */
import React, {useState} from 'react';
import PropTypes from "prop-types";

/* components */
import Transaction from "./Transaction";
import Loading from "../Loading";
import Paginate from "../Paginate";

/* elements */
import Flex from "../../elements/Flex";

const TransactionsContainer = ({transactions, userId, isLoading}) => {
    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = 5;
    const currentPageData = transactions.slice(itemOffset, itemOffset + itemsPerPage)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % transactions.length;
        setItemOffset(newOffset);
    };

    if(isLoading) {
        return <Loading width="500px" height="400px"/>
    }

    return (
        <>
            <Flex height="450px" justifyContent="flex-start">
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
                        totalItems={transactions.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                    />
                    : null
            }
        </>
    );
};

TransactionsContainer.propTypes = {
    transactions: PropTypes.array,
    userId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default TransactionsContainer;