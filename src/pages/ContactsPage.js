/* node-modules */
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";

/* components */
import MainLayout from "../components/MainLayout";
import Paginate from "../components/Paginate";
import Loading from "../components/Loading";
import Contact from "../components/Contacts/Contact";
import EmptyList from "../components/EmptyList";
import SearchContainer from "../components/SearchContainer";

/* elements */
import Flex from "../elements/Flex";

/* actions */
import {getContacts} from "../store/actions/contactActions";

const ContactsPage = ({userId, isLoading, totalContacts, userContacts, getContacts}) => {
    const [valueState, setValueState] = useState("email")
    const [itemOffset, setItemOffset] = useState(0);
    const { t } = useTranslation("texts")
    const {register, handleSubmit, getValues} = useForm();

    useEffect(() => {
        getContacts(userId, valueState, getValues("search_value"), itemOffset, itemOffset + itemsPerPage)
    }, [itemOffset])

    const itemsPerPage = 7;
    const emptyListText = valueState && getValues("search_value")
        ? t("search_empty")
        : t("contacts_empty");

    const onSubmit = ({search_value}) => {
        getContacts(userId, valueState, search_value, 0, itemsPerPage);
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalContacts;
        setItemOffset(newOffset);
    };

    return (
        <MainLayout>
            <Flex>
                <SearchContainer
                    onSubmit={handleSubmit(onSubmit)}
                    setValue={setValueState}
                    {...register("search_value")}
                />
                <Flex height="650px" justifyContent="flex-start">
                    {
                        isLoading
                            ? <Loading width="500px" height="450px"/>
                            : userContacts.length === 0
                                ? <EmptyList text={emptyListText}/>
                                : userContacts.map(userContact => <Contact
                                    key={userContact.id}
                                    contactData={userContact}
                                />)
                    }
                </Flex>
                {
                    totalContacts > 8
                        ? <Paginate
                            itemsPerPage={itemsPerPage}
                            totalItems={totalContacts}
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
    userId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalContacts: PropTypes.number,
    userContacts: PropTypes.array.isRequired,
    getContacts: PropTypes.func.isRequired,
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