/* node-modules */
import React from 'react';
import styled from "styled-components";
import {FaUserAlt, FaMoneyCheckAlt, FaUsers, FaSearch} from "react-icons/fa"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

/* components */
import Logo from "../Logo";
import MenuItem from "./MenuItem";
import Languages from "../Languages";

/* elements */
import Button from "../../elements/Button";

/* actions */
import {userLogout} from "../../store/actions/authActions";


const MenuContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 300px;
  background-color: #272E3B;
  display: flex;
  align-items: center;
  flex-direction: column;
  
`

const SideBarMenu = ({userLogout}) => {
    const { t } = useTranslation("buttons")
    return (
        <MenuContainer>
            <Logo/>
            <MenuItem
                label={t("menu.profile")}
                icon={<FaUserAlt/>}
                to="/profile"
            />
            <MenuItem
                label={t("menu.transactions")}
                icon={<FaMoneyCheckAlt/>}
                to="/transactions"
            />
            <MenuItem
                label={t("menu.contacts")}
                icon={<FaUsers/>}
                to="/contacts"
            />
            <MenuItem
                label={t("menu.search")}
                icon={<FaSearch/>}
                to="/search_user"
            />
            <Button onClick={userLogout}>{t("menu.logout")}</Button>
            <Languages inBottom={true}/>
        </MenuContainer>
    );
};

SideBarMenu.propTypes = {
    userLogout: PropTypes.func.isRequired
}

export default connect(null, {userLogout})(SideBarMenu);