import React from 'react';
import PropTypes from 'prop-types';
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import Header from "../elements/Header";
import Input from "../elements/Input";
import Typography from "../elements/Typography";
import CustomLink from "../elements/Link";
import InputButton from "../elements/InputButton";
import Form from "../elements/Form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {connect} from "react-redux";
import {userRegistration} from "../store/actions/authActions";
import {useNavigate} from "react-router-dom";

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6, "Пароль мусить містити більше 8 символів").required(),
}).required();

const RegistrationPage = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => props.userRegistration(data.email, data.password, {
        redirect: navigate,
        path: "/create-profile"
    })

    return (
        <Flex>
            <Paper>
                <Flex>
                    <Header>Registration</Header>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Email" error={errors.email} {...register("email")}/>
                        <Input label="Password" error={errors.password} {...register("password")}/>
                        <InputButton type="submit" value="Login"/>
                    </Form>
                    <Flex direction="row">
                        <Typography fontSize="14px">
                            Ви вже зареєстровані ?
                        </Typography>
                        <CustomLink to="/login">
                            Увійти
                        </CustomLink>
                    </Flex>
                </Flex>
            </Paper>
        </Flex>
    );
};

RegistrationPage.propTypes = {
    isLoading: PropTypes.bool,
    userRegistration: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, {userRegistration})(RegistrationPage);