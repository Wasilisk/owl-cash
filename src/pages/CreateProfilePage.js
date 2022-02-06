import React from 'react';
import PropTypes from 'prop-types';
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import Header from "../elements/Header";
import Input from "../elements/Input";
import InputButton from "../elements/InputButton";
import Form from "../elements/Form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {connect} from "react-redux";
import {createProfile} from "../store/actions/profileActions";
import {useNavigate} from "react-router-dom";

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
}).required();

const CreateProfilePage = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        props.createProfile({
            user: props.userId,
            email: props.email,
            firstName: data.firstName,
            lastName: data.lastName
        }, {
            redirect: navigate,
            path: "/transactions"
        });
    }

    return (
        <Flex>
            <Paper>
                <Flex>
                    <Header>Create Profile</Header>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input type="text" label="FirstName" error={errors.firstName} {...register("firstName")}/>
                        <Input type="text" label="LastName" error={errors.lastName} {...register("lastName")}/>
                        <InputButton isLoading={props.isLoading} type="submit" value="Submit"/>
                    </Form>
                </Flex>
            </Paper>
        </Flex>
    );
};

CreateProfilePage.propTypes = {
    userId: PropTypes.string,
    email: PropTypes.string,
    isLoading: PropTypes.bool,
    createProfile: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
        email: state.auth.currentUser.email,
        isLoading: state.profile.isLoading
    }
}

export default connect(mapStateToProps, {createProfile})(CreateProfilePage);
