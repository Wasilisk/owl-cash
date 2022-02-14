/* node-modules */
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";

/* components */
import MainLayout from "../components/MainLayout";
import Paginate from "../components/Paginate";
import Profile from "../components/Profiles/Profile";
import Loading from "../components/Loading";
import EmptyList from "../components/EmptyList";
import SearchContainer from "../components/SearchContainer";

/* elements */
import Flex from "../elements/Flex";

/* actions */
import {getProfiles} from "../store/actions/profileActions";

const SearchUsersPage = ({userId, isLoading, totalProfiles, userProfiles, getProfiles}) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [valueState, setValueState] = useState("email");
    const { t } = useTranslation("texts");
    const {register, handleSubmit, getValues} = useForm();
    const itemsPerPage = 7;
    useEffect(() => {
        getProfiles(userId, valueState, getValues("search_value"), itemOffset, itemOffset + itemsPerPage)
    }, [itemOffset]);

    const onSubmit = ({search_value}) => {
        getProfiles(userId, valueState, search_value, 0, itemsPerPage);
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalProfiles;
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
                            ? <Loading width="500px" height="445px"/>
                            : userProfiles.length === 0
                                ? <EmptyList text={t("search_empty")}/>
                                : userProfiles.map(profile => <Profile key={profile.id} profileData={profile}/>)
                    }
                </Flex>
                {
                    totalProfiles > 8
                        ? <Paginate
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageClick}
                            totalItems={totalProfiles}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                        />
                        : null
                }
            </Flex>
        </MainLayout>
    );
};

SearchUsersPage.propTypes = {
    userId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalProfiles: PropTypes.number,
    userProfiles: PropTypes.array.isRequired,
    getProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
        isLoading: state.profile.isLoading,
        userProfiles: state.profile.userProfiles,
        totalProfiles: state.profile.totalProfiles,
    }
}

export default connect(mapStateToProps, {getProfiles})(SearchUsersPage);