/* node-modules */
import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

/* components */
import Languages from "../components/Languages";

/* elements */
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import Header from "../elements/Header";
import Input from "../elements/Input";
import InputButton from "../elements/InputButton";
import Form from "../elements/Form";

/* actions */
import {createProfile} from "../store/actions/profileActions";

/* validation */
import {profileSchema} from "../validations/profileValidation";

const CreateProfilePage = ({userId, email, createProfile}) => {
    const navigate = useNavigate();
    const { t } = useTranslation(["buttons", "labels", "texts"])
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(profileSchema)
    });
    const onSubmit = ({firstName, lastName}) => {
       createProfile({
            user: userId,
            email: email,
            firstName: firstName,
            lastName: lastName
        }, {
            redirect: navigate,
            path: "/transactions"
        });
    }

    return (
        <Flex>
            <Paper>
                <Flex>
                    <Header>{t("create_profile.header", { ns: 'texts' })}</Header>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="text"
                            label={t("firstName", { ns: 'labels' })}
                            error={errors.firstName}
                            {...register("firstName")}
                        />
                        <Input
                            type="text"
                            label={t("lastName", { ns: 'labels' })}
                            error={errors.lastName}
                            {...register("lastName")}
                        />
                        <InputButton type="submit" value={t("submit")}/>
                    </Form>
                    <Languages/>
                </Flex>
            </Paper>
        </Flex>
    );
};

CreateProfilePage.propTypes = {
    userId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
        email: state.auth.currentUser.email,
    }
}

export default connect(mapStateToProps, {createProfile})(CreateProfilePage);
