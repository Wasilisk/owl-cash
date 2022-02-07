import React, {useMemo} from 'react';
import Paper from "../elements/Paper";
import PropTypes from "prop-types";
import Flex from "../elements/Flex";
import owlImage from "../assets/images/owl2.png";
import Image from "../elements/Image";
import styled from "styled-components";

const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  & > p {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: white;
    margin: 0;
  }

  & > h1 {
    color: #F4C038;
  }
`

const UserAmount = ({transactions, userId, isLoading}) => {

    const amount = useMemo(() => {
        return transactions.reduce((amountValue, currentValue) => {
            if (currentValue.from.user === currentValue.to.user) {
                return amountValue + currentValue.amount
            } else if (currentValue.from.user === userId) {
                return amountValue - currentValue.amount;
            } else {
                return amountValue + currentValue.amount
            }
        }, 0)
    }, [transactions])

    return (
        <Paper height="200px" width="400px" margin="20px">
            <Flex direction="row" justifyContent="flex-start">
                <Image
                    width="200px"
                    height="200px"
                    src={owlImage}
                    alt="Image"
                />
                <AmountContainer>
                    <p>Total amount</p>
                    <h1>{
                        isLoading
                            ? "Loading..."
                            : `$${amount}`
                    }</h1>
                </AmountContainer>
            </Flex>
        </Paper>
    );
};

UserAmount.propTypes = {
    userId: PropTypes.string,
    transactions: PropTypes.array,
    isLoading: PropTypes.bool
}

export default UserAmount;