import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MainLayout from "../components/MainLayout";
import Paginate from "../components/Paginate";
import {CustomSelect} from "../components/CustomSelect";
import {useForm} from "react-hook-form";
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import SearchInput from "../elements/SearchInput";
import Loading from "../components/Loading";
import {getContacts} from "../store/actions/contactActions";
import Contact from "../components/Contact";
import EmptyList from "../components/EmptyList";

const ContactsPage = ({userId, isLoading, totalContacts, userContacts, getContacts}) => {
    const [valueState, setValueState] = useState("email")
    const [itemOffset, setItemOffset] = useState(0);
    const {register, handleSubmit, getValues} = useForm();
    const onSubmit = data => {
        getContacts(userId, valueState, data.search_value, 0, itemsPerPage);
    }

    const emptyListText = valueState && getValues("search_value") ? "Нажаль за вашим запитом нікого не знайдено" : "У вас немає жодних контактів";
    const itemsPerPage = 5;
    const pageCount = Math.ceil(totalContacts / itemsPerPage);
    const searchOptions = [
        {value: "email", label: "Email"},
        {value: "firstName", label: "First Name"},
        {value: "lastName", label: "Last Name"}

    ]


    const handler = (event) => {
        setValueState(event.value)
    }

    useEffect(() => {
        getContacts(userId, valueState, getValues("search_value"), itemOffset, itemOffset + itemsPerPage)
    }, [itemOffset])


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalContacts;
        setItemOffset(newOffset);
    };

    return (
        <MainLayout>
            <Flex>
                <Paper width="500px" padding="10px">
                    <Flex direction="row">
                        <SearchInput
                            onSubmit={handleSubmit(onSubmit)}
                            {...register("search_value")}
                        />
                        <CustomSelect
                            defaultValue={{label: "Email", value: "email"}}
                            classNamePrefix={'Select'}
                            isSearchable={true}
                            options={searchOptions}
                            onChange={handler}
                        />
                    </Flex>
                </Paper>
                <Flex>
                    {
                        isLoading
                            ? <Loading width="500px"/>
                            : userContacts.length === 0
                                ? <EmptyList text={emptyListText}/>
                                : userContacts.map(userContact => <Contact
                                    key={userContact.id}
                                    contactData={userContact}
                                />)
                    }
                </Flex>
                {
                    totalContacts > 5
                        ? <Paginate
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                        />
                        : null
                }
            </Flex>
        </MainLayout>
    );
};

ContactsPage.propTypes = {
    userId: PropTypes.string,
    isLoading: PropTypes.bool,
    totalContacts: PropTypes.number,
    userContacts: PropTypes.array,
    getContacts: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
        isLoading: state.contact.isLoading,
        userContacts: state.contact.contacts,
        totalContacts: state.contact.totalContacts,
    }
}

export default connect(mapStateToProps, {getContacts})(ContactsPage);