/* node-modules */
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useTranslation} from "react-i18next";

/* components */
import TransactionStatus from "./TransactionStatus";
import CloseModalButton from "../CloseModalButton";

/* elements */
import Paper from "../../elements/Paper";
import Typography from "../../elements/Typography";
import CustomSelect from "../../elements/CustomSelect";
import Flex from "../../elements/Flex";
import Form from "../../elements/Form";
import Input from "../../elements/Input";
import InputButton from "../../elements/InputButton";

/* actions */
import {getContacts} from "../../store/actions/contactActions";
import {createTransaction} from "../../store/actions/transactionActions";

/* helpers */
import {errorNotification} from "../../helpers/notifications";

/* assets */
import SuccessOwl from "../../assets/images/owl8.png";
import LoadingOwl from "../../assets/images/owl7.png";
import ErrorOwl from "../../assets/images/owl9.png";

/* validation */
import amountSchema from "../../validations/amountValidation";

const AddTransaction = ({closeModal, userId, userAmount, contactData, userContacts, getContacts, createTransaction}) => {
    const [status, setStatus] = useState("");
    const [valueState, setValueState] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { t } = useTranslation(["texts", "labels", "buttons", "notifications"]);
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(amountSchema)
    });
    const onSubmit = data => {
        if (data.amount > userAmount) {
            errorNotification(t("amount_limit", {ns: "notifications"}))
        } else {
            createTransaction({
                from: userId,
                to: contactData ? contactData.user : valueState,
                amount: data.amount
            }, setIsLoading, setStatus);
        }
    }

    useEffect(() => {
        if (!contactData) {
            getContacts(userId)
        }
    }, [])
    const handler = (event) => {
        setValueState(event.id)
    }

    if (isLoading) {
        return (
            <TransactionStatus
                src={LoadingOwl}
                text={t("transaction_page.status.loading")}
            />
        )
    }

    if(status === "success") {
        return <TransactionStatus
            closeModal={closeModal}
            src={SuccessOwl}
            color="#3CBF27"
            text={t("transaction_page.status.success")}
        />
    } else if (status === "error") {
        return <TransactionStatus
            closeModal={closeModal}
            src={ErrorOwl}
            color="#D93855"
            text={t("transaction_page.status.error")}
        />
    }


    return (
        <Paper width="400px" height="280px">
            <CloseModalButton closeModal={closeModal}/>
            <Flex height="80px">
                <Typography margin="0px 0px 30px 0px" color="white" fontSize="20px">
                    {t("transaction_page.header")}
                </Typography>
            </Flex>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="row" justifyContent="space-between">
                    <Typography>
                        {t("transaction_page.recipient")}
                    </Typography>
                    {
                        contactData
                            ? <Typography color="#F4C038">
                                {contactData.firstName} {contactData.lastName}
                            </Typography>
                            : <CustomSelect
                                placeholder={t("select", {ns: "labels"})}
                                width="250px"
                                classNamePrefix={'Select'}
                                isSearchable={true}
                                options={userContacts}
                                onChange={handler}
                            />
                    }
                </Flex>
                <Flex direction="row" justifyContent="space-between">
                    <Typography>{t("transaction_page.amount")}</Typography>
                    <Input width="250px" height="40px" type="text" label={t("transfer_amount", {ns: "labels"})} error={errors.amount} {...register("amount")}/>
                </Flex>
                <Flex direction="row" justifyContent="space-between">
                    <Typography>{t("transaction_page.on_your_account")}</Typography>
                    <Typography color="#F4C038">{userAmount}$</Typography>
                </Flex>
                <Flex>
                    <InputButton margin="30px" type="submit" value={t("send", {ns: "buttons"})}/>
                </Flex>
            </Form>
        </Paper>
    );
};

AddTransaction.propTypes = {
    closeModal: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    userAmount: PropTypes.number,
    contactData: PropTypes.object,
    userContacts: PropTypes.array.isRequired,
    getContacts: PropTypes.func.isRequired,
    createTransaction: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
        userAmount: state.transaction.userAmount,
        userContacts: state.contact.contacts.map(profile => {
            return {
                value: profile.contact.user,
                label: `${profile.contact.firstName} ${profile.contact.lastName}`,
                id: profile.contact.user
            }
        })
    }
}

export default connect(mapStateToProps, {getContacts, createTransaction})(AddTransaction);