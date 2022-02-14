/* node-modules */
import React from 'react';
import styled from "styled-components";
import moment from 'moment';
import PropTypes from "prop-types";
import {FaCheck, FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa"

/* components */
import IconContainer from "../IconContainer";

/* elements */
import Paper from "../../elements/Paper";
import Flex from "../../elements/Flex";

const TransactionInfo = styled.div`
  & > h4, h5 {
    margin: 0;
  }
  & > h4 {
    color: white;
    margin-bottom: 5px;
  }
  & > h5 {
    color: rgba(255, 255, 255, 0.5);
  }
`

const AmountNumber = styled.h4`
  color: #F4C038;
  margin-right: 20px;
`

const Transaction = ({transaction, transferType, userData}) => {

    return (
        <Paper width="500px" height="56px" padding="10px" margin="5px">
            <Flex direction="row" >
                <Flex direction="row" justifyContent="flex-start">
                    <IconContainer
                        height="40px"
                        width="40px"
                        margin="0px 10px 0px 10px"
                        transferType={transferType}
                    >
                        {
                            {
                                'initial': <FaCheck/>,
                                'incoming': <FaLongArrowAltDown/>,
                                'outgoing': <FaLongArrowAltUp/>
                            }[transferType]
                        }
                    </IconContainer>
                    <TransactionInfo>
                        <h4>{userData.firstName} {userData.lastName}</h4>
                        <h5>{moment(transaction.created_at).format('MMMM Do YYYY, h:mm:ss a')}</h5>
                    </TransactionInfo>
                </Flex>
                <AmountNumber className={transferType}>
                    {transferType === "outgoing" ? "-" : "+"}{transaction.amount}$
                </AmountNumber>
            </Flex>
        </Paper>
    );
};

Transaction.propTypes = {
    transaction: PropTypes.object.isRequired,
    transferType: PropTypes.string.isRequired,
    userData: PropTypes.object.isRequired
}

export default Transaction;