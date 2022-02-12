import React from 'react';
import Flex from "../../elements/Flex";
import Image from "../../elements/Image";
import OwlIcon from "../../assets/images/owl8.png";
import Typography from "../../elements/Typography";
import Paper from "../../elements/Paper";

const TransactionSuccess = () => {
    return (
        <Paper width="400px" height="350px">
            <Flex>
                <Image src={OwlIcon} width="300px" height="300px" margin="0px"/>
                <Typography color="#3CBF27">Транзакція пройшла успішно</Typography>
            </Flex>
        </Paper>
    );
};

export default TransactionSuccess;