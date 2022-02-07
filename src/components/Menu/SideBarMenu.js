import React from 'react';
import styled from "styled-components";
import Logo from "../Logo";
import MenuItem from "./MenuItem";
import {FaUserAlt, FaMoneyCheckAlt, FaUsers, FaSearch} from "react-icons/fa"

const MenuContainer = styled.div`
  height: 100vh;
  width: 300px;
  background-color: #272E3B;
  display: flex;
  align-items: center;
  flex-direction: column;
  
`

const SideBarMenu = () => {
    return (
        <MenuContainer>
            <Logo/>
            <MenuItem
                label="Profile"
                icon={<FaUserAlt/>}
                to="/profile"
            />
            <MenuItem
                label="Transactions"
                icon={<FaMoneyCheckAlt/>}
                to="/transactions"
            />
            <MenuItem
                label="Contacts"
                icon={<FaUsers/>}
                to="/contacts"
            />
            <MenuItem
                label="Search"
                icon={<FaSearch/>}
                to="/search"
            />

        </MenuContainer>
    );
};

export default SideBarMenu;