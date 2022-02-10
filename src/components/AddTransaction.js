import React, {useEffect, useState} from 'react';
import Paper from "../elements/Paper";
import Typography from "../elements/Typography";
import {CustomSelect} from "./CustomSelect";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getContacts} from "../store/actions/contactActions";


const AddTransaction = ({userId, userContacts, getContacts}) => {
    const [valueState,setValueState] = useState("")

    console.log(valueState)
    useEffect(() => {
        getContacts(userId)
    }, [])
    const handler = (event) => {
        setValueState(event.value)
    }

    return (
        <Paper width="500px" height="300px">
            <Typography>
                New Transaction
                <CustomSelect
                    classNamePrefix={'Select'}
                    isSearchable={true}
                    options={userContacts}
                    onChange={handler}
                />
            </Typography>
        </Paper>
    );
};

AddTransaction.propTypes = {
    userId: PropTypes.string,
    userContacts: PropTypes.array,
    getContacts: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
        userContacts: state.contact.contacts.map(profile => {
            return {
                value: profile.contact.user,
                label: `${profile.contact.firstName} ${profile.contact.lastName}`
            }
        })
    }
}

export default connect(mapStateToProps, {getContacts})(AddTransaction);