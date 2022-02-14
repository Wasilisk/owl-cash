/* node-modules */
import React from 'react';
import PropTypes from 'prop-types';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

/* components */
import Languages from "../components/Languages";

/* elements */
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import Header from "../elements/Header";
import Input from "../elements/Input";
import Typography from "../elements/Typography";
import CustomLink from "../elements/CustomLink";
import InputButton from "../elements/InputButton";
import Form from "../elements/Form";

/* validation */
import {authSchema} from "../validations/authValidation";

/* actions */
import {userRegistration} from "../store/actions/authActions";

const RegistrationPage = ({userRegistration}) => {
    const navigate = useNavigate();
    const { t } = useTranslation(["buttons", "labels", "texts"])
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(authSchema)
    });

    const onSubmit = data => userRegistration(data.email, data.password, {
        redirect: navigate,
        path: "/create-profile"
    })

    return (
        <Flex>
            <Paper>
                <Flex>
                    <Header>{t("registration_form.header", { ns: 'texts' })}</Header>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label={t("email", { ns: 'labels' })}
                            error={errors.email}
                            {...register("email")}
                        />
                        <Input
                            label={t("password", { ns: 'labels' })}
                            error={errors.password}
                            type="password"
                            autoComplete="on"
                            {...register("password")}
                        />
                        <InputButton width="220px" type="submit" value={t("register")}/>
                    </Form>
                    <Flex direction="row">
                        <Typography fontSize="14px" margin="10px 0px 0px 0px">
                            {t("registration_form.already_registered", { ns: 'texts' })}
                        </Typography>
                        <CustomLink to="/login" margin="10px 0px 0px 10px">
                            {t("registration_form.login", { ns: 'texts' })}
                        </CustomLink>
                    </Flex>
                    <Languages/>
                </Flex>
            </Paper>
        </Flex>
    );
};

RegistrationPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    userRegistration: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, {userRegistration})(RegistrationPage);