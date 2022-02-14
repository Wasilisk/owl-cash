/* node-modules */
import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

/* elements */
import Paper from "../../elements/Paper";
import Typography from "../../elements/Typography";
import Flex from "../../elements/Flex";
import Input from "../../elements/Input";
import Form from "../../elements/Form";
import InputButton from "../../elements/InputButton";
import Button from "../../elements/Button";

/* validation */
import {profileSchema} from "../../validations/profileValidation";

const UpdateProfile = ({userId, userProfile, setIsOpen, updateProfile}) => {
    const { t } = useTranslation(["labels", "texts", "buttons"])
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName
        },
        resolver: yupResolver(profileSchema)
    });

    const onSubmit = data => {
        updateProfile({userId, ...data});
        setIsOpen(false)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Paper width="400px" margin="10px" padding="10px 30px 30px 30px">
                <Flex>
                    <Typography
                        fontSize="20px"
                        color="white"
                        margin="20px"
                    >
                        {t("profile_page.header", {ns: "texts"})}
                    </Typography>
                </Flex>
                <Input label={t("firstName")} error={errors.firstName} {...register("firstName")}/>
                <Input label={t("lastName")} error={errors.lastName} {...register("lastName")}/>
                <Flex direction="row" justifyContent="flex-start">
                    <Typography>{t("email")}:</Typography>
                    <Typography margin="10px" color="#F4C038">{userProfile.email}</Typography>
                </Flex>
            </Paper>
            <Flex direction="row">
                <InputButton type="submit" value={t("update", {ns: "buttons"})}/>
                <Button type="button" onClick={() => setIsOpen(false)}>{t("cancel", {ns: "buttons"})}</Button>
            </Flex>
        </Form>
    );
};

UpdateProfile.propTypes = {
    userId: PropTypes.string.isRequired,
    userProfile: PropTypes.object.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired
}

export default UpdateProfile;