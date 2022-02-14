/* node-modules */
import React from 'react';
import PropTypes from 'prop-types';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import {connect} from "react-redux";

/* components */
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import Header from "../elements/Header";
import Input from "../elements/Input";
import Typography from "../elements/Typography";
import CustomLink from "../elements/CustomLink";
import InputButton from "../elements/InputButton";
import Form from "../elements/Form";
import Languages from "../components/Languages";

/* actions */
import {userLogin} from "../store/actions/authActions";

/* validation */
import {authSchema} from "../validations/authValidation";


const LoginPage = ({userLogin}) => {
    const navigate = useNavigate();
    const { t } = useTranslation(["buttons", "labels", "texts"])
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(authSchema)
    });

    const onSubmit = ({email, password}) => userLogin(email, password, {
        redirect: navigate,
        path: "/transactions"
    });

    return (
        <Flex>
            <Paper>
                <Flex>
                    <Header>{t("login_form.header", { ns: 'texts' })}</Header>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="text"
                            label={t("email", { ns: 'labels' })}
                            error={errors.email}
                            {...register("email")}
                        />
                        <Input
                            type="password"
                            label={t("password", { ns: 'labels' })}
                            autoComplete="on"
                            error={errors.password}
                            {...register("password")}
                        />
                        <InputButton type="submit" value={t("login")}/>
                    </Form>
                    <Flex direction="row">
                        <Typography fontSize="14px" margin="10px 0px 0px 0px">
                            {t("login_form.not_registered", { ns: 'texts' })}
                        </Typography>
                        <CustomLink margin="10px 0px 0px 10px" to="/registration">
                            {t("login_form.register", { ns: 'texts' })}
                        </CustomLink>
                    </Flex>
                    <Languages/>
                </Flex>
            </Paper>
        </Flex>
    );
};

LoginPage.propTypes = {
    userLogin: PropTypes.func.isRequired
}

export default connect(null, {userLogin})(LoginPage);
