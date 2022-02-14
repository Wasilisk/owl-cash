/* node-modules */
import React from 'react';
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

/* elements */
import Paper from "../elements/Paper";
import Flex from "../elements/Flex";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Form from "../elements/Form";
import InputButton from "../elements/InputButton";

/* validation */
import passwordSchema from "../validations/passwordValidation";


const UpdatePassword = ({setIsOpen, updatePassword}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(passwordSchema)
    });
    const onSubmit = data => {
        updatePassword(data.password);
        setIsOpen(false)
    }

    return (
        <Paper width="400px" margin="10px">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="password"
                    label="New Password"
                    autoComplete="on"
                    error={errors.password}
                    {...register("password")}
                />
                <Flex direction="row">
                    <Button type="button" onClick={() => {
                        setIsOpen(false)
                    }}>Cancel</Button>
                    <InputButton type="submit" value="Update"/>
                </Flex>
            </Form>
        </Paper>
    );
};

UpdatePassword.propTypes = {
    setIsOpen: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired
}

export default UpdatePassword;