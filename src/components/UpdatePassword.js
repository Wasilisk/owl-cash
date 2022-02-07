import React from 'react';
import Paper from "../elements/Paper";
import Flex from "../elements/Flex";
import Button from "../elements/Button";
import PropTypes from "prop-types";
import Input from "../elements/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "../elements/Form";
import InputButton from "../elements/InputButton";

const schema = yup.object({
    password: yup.string().min(6, "Пароль мусить містити більше 6 символів").required(),
}).required();

const UpdatePassword = ({setIsOpen, updatePassword}) => {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        updatePassword(data.password);
        setIsOpen(false)
    }

    return (
        <Paper width="400px" margin="10px">
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Input type="password" label="New Password" autoComplete="on" error={errors.password} {...register("password")}/>
            <Flex direction="row">
                <Button type="button" onClick={() => {setIsOpen(false)}}>Cancel</Button>
                <InputButton type="submit" value="Update"/>
            </Flex>
            </Form>
        </Paper>
    );
};

UpdatePassword.propTypes = {
    setIsOpen: PropTypes.func,
    updatePassword: PropTypes.func
}

export default UpdatePassword;