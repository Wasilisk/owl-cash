import React from 'react';
import Paper from "../elements/Paper";
import Typography from "../elements/Typography";
import Flex from "../elements/Flex";
import Input from "../elements/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Form from "../elements/Form";
import * as yup from "yup";
import InputButton from "../elements/InputButton";
import Button from "../elements/Button";
import PropTypes from "prop-types";

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
}).required();

const UpdateProfile = ({userId, userProfile, setIsOpen, updateProfile}) => {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        defaultValues: {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName
        },
        resolver: yupResolver(schema)
    });
    const onSubmit = data => updateProfile({userId, ...data});

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Paper width="400px" margin="10px">
                <Input label="FirstName" error={errors.firstName} {...register("firstName")}/>
                <Input label="LastName" error={errors.lastName} {...register("lastName")}/>
            <Flex direction="row" justifyContent="flex-start">
                <Typography>Email:</Typography>
                <Typography marginLeft="10px" color="#F4C038">{userProfile.email}</Typography>
            </Flex>
        </Paper>
            <Flex direction="row">
                <InputButton type="submit" value="Update"/>
                <Button type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
            </Flex>
        </Form>
    );
};

UpdateProfile.propTypes = {
    userId: PropTypes.string,
    userProfile: PropTypes.object,
    setIsOpen: PropTypes.func,
    updateProfile: PropTypes.func
}

export default UpdateProfile;