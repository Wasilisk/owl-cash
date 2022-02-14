/* node-modules */
import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

/* elements */
import Paper from "../elements/Paper";
import Flex from "../elements/Flex";
import Image from "../elements/Image";

/* assets */
import owlImage from "../assets/images/owl2.png";

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

const UserAmount = ({userAmount, isLoading}) => {
    const { t } = useTranslation("texts")

    return (
        <Paper height="200px" width="400px" margin="10px 0px 5px 0px">
            <Flex direction="row" justifyContent="flex-start">
                <Image
                    width="200px"
                    height="200px"
                    src={owlImage}
                    alt="Image"
                />
                <AmountContainer>
                    <p>{t("transaction_page.total_amount")}</p>
                    <h1>{
                        isLoading
                            ? t("common.loading")
                            : `$${userAmount}`
                    }</h1>
                </AmountContainer>
            </Flex>
        </Paper>
    );
};

UserAmount.propTypes = {
    userAmount: PropTypes.number,
    userId: PropTypes.string,
    transactions: PropTypes.array,
    isLoading: PropTypes.bool.isRequired
}

export default UserAmount;