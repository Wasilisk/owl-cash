/* node-modules */
import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

/* elements */
import Flex from "../elements/Flex";
import SearchInput from "../elements/SearchInput";
import CustomSelect from "../elements/CustomSelect";
import Paper from "../elements/Paper";

const SearchContainer = React.forwardRef(({onSubmit, setValue, ...props}, ref) => {
    const { t } = useTranslation("labels")

    const searchOptions = [
        {value: "email", label: t("email")},
        {value: "firstName", label: t("firstName")},
        {value: "lastName", label: t("lastName")}
    ]
    const handler = (event) => {
        setValue(event.value)
    }
    return (
        <Paper width="500px" padding="10px" margin="10px">
            <Flex direction="row">
                <SearchInput
                    ref={ref}
                    onSubmit={onSubmit}
                    placeholder={t("search")}
                    {...props}
                />
                <CustomSelect
                    defaultValue={{value: "email", label: t("email")}}
                    classNamePrefix={'Select'}
                    isSearchable={true}
                    options={searchOptions}
                    onChange={handler}
                />
            </Flex>
        </Paper>
    );
})

SearchContainer.displayName="SearchContainer";

SearchContainer.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    props: PropTypes.any,
}

export default SearchContainer;