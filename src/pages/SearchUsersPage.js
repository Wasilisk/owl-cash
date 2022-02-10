import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getProfiles} from "../store/actions/profileActions";
import PropTypes from "prop-types";
import MainLayout from "../components/MainLayout";
import Paginate from "../components/Paginate";
import {CustomSelect} from "../components/CustomSelect";
import {useForm} from "react-hook-form";
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import SearchInput from "../elements/SearchInput";
import Profile from "../components/Profile";
import Loading from "../components/Loading";

const SearchUsersPage = ({userId, isLoading, totalProfiles, userProfiles, getProfiles}) => {

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    const pageCount = Math.ceil(totalProfiles / itemsPerPage);
    const searchOptions = [
        {value: "email", label: "Email"},
        {value: "firstName", label: "First Name"},
        {value: "lastName", label: "Last Name"}

    ]

    const {register, handleSubmit, getValues} = useForm();
    const onSubmit = data => {
        getProfiles(userId, valueState, data.search_value, 0, itemsPerPage);
    }

    const [valueState, setValueState] = useState("email")

    const handler = (event) => {
        setValueState(event.value)
    }

    useEffect(() => {
        getProfiles(userId, null, null, itemOffset, itemOffset + itemsPerPage)
    }, [])

    useEffect(() => {
        getProfiles(userId, valueState, getValues("search_value"), itemOffset, itemOffset + itemsPerPage)
    }, [itemOffset])


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalProfiles;
        setItemOffset(newOffset);
    };

    return (
        <MainLayout>
            <Flex>
                <Paper width="500px" padding="10px">
                    <Flex direction="row">
                        <SearchInput
                            onSubmit={handleSubmit(onSubmit)}
                            label="Write email" {...register("search_value")}
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
                        : userProfiles.map(profile => <Profile key={profile.id} profileData={profile}/>)
                    }
                </Flex>
                {
                    totalProfiles > 5
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

SearchUsersPage.propTypes = {
    userId: PropTypes.string,
    isLoading: PropTypes.bool,
    totalProfiles: PropTypes.number,
    userProfiles: PropTypes.array,
    getProfiles: PropTypes.func,
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