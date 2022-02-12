import React, {useEffect, useState} from 'react';
import Paper from "../../elements/Paper";
import Typography from "../../elements/Typography";
import {CustomSelect} from "../CustomSelect";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getContacts} from "../../store/actions/contactActions";
import Flex from "../../elements/Flex";
import Form from "../../elements/Form";
import Input from "../../elements/Input";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createTransaction} from "../../store/actions/transactionActions";
import {errorNotification} from "../../helpers/notifications";
import InputButton from "../../elements/InputButton";
import OwlIcon from "../../assets/images/owl7.png"
import Image from "../../elements/Image";
import TransactionSuccess from "./TransactionSuccess";
import TransactionError from "./TransactionError";

const schema = yup.object({
    amount: yup.number().required().test(
        'Is positive?',
        'The number must be greater than 0!',
        (value) => value > 0
    )
}).required();

const AddTransaction = ({userId, userAmount, contactData, userContacts, getContacts, createTransaction}) => {
    const [status, setStatus] = useState("");
    const [valueState, setValueState] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        if (data.amount > userAmount) {
            errorNotification("Перевищено ліміт")
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
            <Paper width="400px" height="350px">
                <Flex>
                    <Image src={OwlIcon} width="300px" height="300px"/>
                    <Typography>Відправлення транзакції...</Typography>
                </Flex>
            </Paper>
        )
    }

    if(status === "success") {
        return <TransactionSuccess/>
    } else if (status === "error") {
        return <TransactionError/>
    }


    return (
        <Paper width="400px" height="350px">
            <Typography>
                New Transaction
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="row" justifyContent="space-between">
                    <Typography>
                        Recipient
                    </Typography>
                    {
                        contactData
                            ? <Typography>
                                {contactData.firstName} {contactData.lastName}
                            </Typography>
                            : <CustomSelect
                                width="250px"
                                classNamePrefix={'Select'}
                                isSearchable={true}
                                options={userContacts}
                                onChange={handler}
                            />
                    }
                </Flex>
                <Flex direction="row" justifyContent="space-between">
                    <Typography>Amount: </Typography>
                    <Input width="250px" type="text" label="Amount" error={errors.amount} {...register("amount")}/>
                </Flex>
                <Flex direction="row" justifyContent="space-between">
                    <Typography>On your account:</Typography>
                    <Typography>{userAmount}$</Typography>
                </Flex>
                <InputButton type="submit" value="Create"/>
            </Form>
        </Paper>
    );
};

AddTransaction.propTypes = {
    userId: PropTypes.string,
    userAmount: PropTypes.number,
    contactData: PropTypes.object,
    userContacts: PropTypes.array,
    getContacts: PropTypes.func,
    createTransaction: PropTypes.func
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