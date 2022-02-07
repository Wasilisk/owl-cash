import React from 'react';
import Paper from "../elements/Paper";
import Flex from "../elements/Flex";
import PropTypes from "prop-types";
import {FaCheck, FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa"
import styled from "styled-components";
import moment from 'moment';

const handleColorType = transferType => {
    switch (transferType) {
        case "initial":
            return "rgba(244, 117, 35, 1)";
        case "incoming":
            return "rgba(60, 191, 39, 1)";
        default:
            return "rgba(217, 56, 85, 1)";
    }
};


const IconContainer = styled.div`
  min-width: 50px;
  min-height: 50px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  background-color: ${({ transferType }) => handleColorType(transferType)};

  & > svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`

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
        <Paper width="500px" padding="10px" margin="5px">
            <Flex direction="row" >
                <Flex direction="row" justifyContent="flex-start">
                    <IconContainer transferType={transferType}>
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
    transaction: PropTypes.object,
    transferType: PropTypes.string,
    userData: PropTypes.object
}

export default Transaction;