import React from 'react';
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import Header from "../elements/Header";
import Form from "../elements/Form";
import Input from "../elements/Input";
import InputButton from "../elements/InputButton";
import OwlIcon from "../assets/images/owl5.png"
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Image from "../elements/Image";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updatePassword} from "../store/actions/authActions";
import * as yup from "yup";

const schema = yup.object({
    password: yup.string().min(6, "Пароль мусить містити більше 6 символів").required(),
}).required();

const UpdatePasswordPage = ({isLoading, updatePassword}) => {
    const navigate = useNavigate();
    const {state} = useLocation();
    console.log(state.hashValue)
    const accessToken = state.hashValue.substring(1).split("&")[0].substring(13);
    console.log(accessToken)
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => updatePassword(accessToken, data.password, {
        redirect: navigate,
        path: "/login"
    });

    return (
        <Flex>
            <Paper>
                <Flex>
                    <Header>Password Recovery</Header>
                    <Image width="300px" height="300px" src={OwlIcon}/>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input type="password" label="New password" autoComplete="on" error={errors.password} {...register("password")}/>
                        <InputButton isLoading={isLoading} type="submit" value="Update"/>
                    </Form>
                </Flex>
            </Paper>
        </Flex>
    );
};

UpdatePasswordPage.propTypes = {
    isLoading: PropTypes.bool,
    updatePassword: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, {updatePassword})(UpdatePasswordPage);