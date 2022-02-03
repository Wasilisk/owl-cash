import React from 'react';
import Flex from "../elements/Flex";
import Image from "../elements/Image";
import owlImage from "../assets/images/owl1.png";
import HeaderText from "../elements/Header";
import Typography from "../elements/Typography";
import Button from "../elements/Button";
import Paper from "../elements/Paper";
import {useNavigate} from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <Paper height="400px" width="800px">
            <Flex direction="row" justifyContent="space-between">
                <Image
                    width="300px"
                    height="300px"
                    src={owlImage}
                    alt="Image"
                />
                <Flex width="600px">
                    <HeaderText>
                        Ласкаво просимо
                    </HeaderText>
                    <Typography>
                        fadssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasdfasdffffffffffffffffffffffff
                        asdfasdfasdfasdfasd
                        asdfasdfasdfasd
                        fasdfsdfasdfadfasdfasfsd
                    </Typography>
                    <Button width="300px" onClick={()=> navigate("/login")}>Login</Button>
                    <Button width="300px" onClick={()=> navigate("/registration")}>Register</Button>
                </Flex>
            </Flex>
        </Paper>
    );
};

export default WelcomePage;