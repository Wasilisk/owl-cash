import React from 'react';
import Flex from "../elements/Flex";
import Typography from "../elements/Typography";
import OwlIcon from "../assets/images/owl3.png"
import Image from "../elements/Image";
import Paper from "../elements/Paper";

const Loading = () => {
    return (
        <Paper width="400px">
            <Flex>
                <Image height="300px" width="300px" src={OwlIcon}/>
                <Typography color="#F4C038" fontSize="24px">Is Loading...</Typography>
            </Flex>
        </Paper>
    );
};

export default Loading;