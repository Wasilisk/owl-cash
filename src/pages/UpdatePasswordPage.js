/* node-modules */
import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

/* components */
import Languages from "../components/Languages";

/* elements */
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import Header from "../elements/Header";
import Form from "../elements/Form";
import Input from "../elements/Input";
import InputButton from "../elements/InputButton";
import Image from "../elements/Image";
import Typography from "../elements/Typography";

/* assets */
import OwlIcon from "../assets/images/owl5.png"

/* actions */
import {updatePassword} from "../store/actions/authActions";

/* validation */
import passwordSchema from "../validations/passwordValidation";

const UpdatePasswordPage = ({isLoading, updatePassword}) => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const { t } = useTranslation(["texts", "buttons", "labels"])
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(passwordSchema)
    });

    const accessToken = state.hashValue.substring(1).split("&")[0].substring(13);

    const onSubmit = data => updatePassword(accessToken, data.password, {
        redirect: navigate,
        path: "/login"
    });

    return (
        <Flex>
            <Paper>
                <Flex>
                    <Header>{t("password_recovery.header")}</Header>
                    <Image width="300px" height="300px" src={OwlIcon}/>
                    <Typography>{t("password_recovery.owl_phrase")}</Typography>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="password"
                            label={t("new_password", {ns: "labels"})}
                            autoComplete="on"
                            error={errors.password}
                            {...register("password")}
                        />
                        <InputButton
                            isLoading={isLoading}
                            type="submit"
                            value={t("update", {ns: "buttons"})}
                        />
                    </Form>
                    <Languages/>
                </Flex>
            </Paper>
        </Flex>
    );
};

UpdatePasswordPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    updatePassword: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, {updatePassword})(UpdatePasswordPage);