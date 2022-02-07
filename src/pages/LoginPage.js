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
import {userLogin} from "../store/actions/authActions";
import {useNavigate} from "react-router-dom";

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6, "Пароль мусить містити більше 6 символів").required(),
}).required();

const LoginPage = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => props.userLogin(data.email, data.password, {
        redirect: navigate,
        path: "/transactions"
    });

    return (
        <Flex>
            <Paper>
                <Flex>
                    <Header>Login</Header>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input type="text" label="Email" error={errors.email} {...register("email")}/>
                        <Input type="password" label="Password" autoComplete="on" error={errors.password} {...register("password")}/>
                        <InputButton isLoading={props.isLoading} type="submit" value="Login"/>
                    </Form>
                    <Flex direction="row">
                        <Typography fontSize="14px">
                            Ще не зареєстровані ?
                        </Typography>
                        <CustomLink to="/registration">
                            Зареєструватись
                        </CustomLink>
                    </Flex>
                </Flex>
            </Paper>
        </Flex>
    );
};

LoginPage.propTypes = {
    isLoading: PropTypes.bool,
    userLogin: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, {userLogin})(LoginPage);
