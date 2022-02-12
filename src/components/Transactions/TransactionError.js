import React from 'react';
import Flex from "../../elements/Flex";
import Image from "../../elements/Image";
import OwlIcon from "../../assets/images/owl9.png";
import Typography from "../../elements/Typography";
import Paper from "../../elements/Paper";

const TransactionError = () => {
    return (
        <Paper width="400px" height="350px">
            <Flex>
                <Image src={OwlIcon} width="300px" height="300px" margin="0px"/>
                <Typography color="#D93855">Під час транзакції відбулась помилка</Typography>
            </Flex>
        </Paper>
    );
};

export default TransactionError;