/* node-modules */
import React from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

/* components */
import Languages from "../components/Languages";

/* elements */
import Flex from "../elements/Flex";
import Image from "../elements/Image";
import HeaderText from "../elements/Header";
import Typography from "../elements/Typography";
import Button from "../elements/Button";
import Paper from "../elements/Paper";

/* assets */
import WelcomeOwl from "../assets/images/owl1.png";

const WelcomePage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("buttons")

    return (
        <Flex>
            <Paper height="400px" width="800px">
                <Flex direction="row" justifyContent="space-between">
                    <Image
                        width="300px"
                        height="300px"
                        src={WelcomeOwl}
                        alt="Image"
                    />
                    <Flex width="600px">
                        <HeaderText>
                            Ласкаво просимо в OwlCash
                        </HeaderText>
                        <Typography>
                            fadssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasdfasdffffffffffffffffffffffff
                            asdfasdfasdfasdfasd
                            asdfasdfasdfasd
                            fasdfsdfasdfadfasdfasfsd
                        </Typography>
                        <Button width="300px" onClick={() => navigate("/login")}>{t("login")}</Button>
                        <Button width="300px" onClick={() => navigate("/registration")}>{t("register")}</Button>
                    </Flex>
                </Flex>
                <Flex>
                    <Languages/>
                </Flex>
            </Paper>
        </Flex>
    );
};


export default WelcomePage;