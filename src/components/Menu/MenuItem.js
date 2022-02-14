import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

const MenuItemContainer = styled(NavLink)`
  height: 50px;
  width: 250px;
  display: flex;
  border-radius: 20px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  text-decoration: none;
  margin-bottom: 10px;
  
  &.active {
    background-color: #20222A;
  }
  &:hover {
    background-color: #20222A;
  }
  
  & > p {
    font-family: Rubik, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: white;
    text-decoration: none;
  }

  & > svg {
    margin-right: 10px;
    color: white;
  }
`

const MenuItem = ({label, icon, to}) => {
    return (
        <MenuItemContainer to={to}>
            {icon}
            <p>{label}</p>
        </MenuItemContainer>
    );
};

MenuItem.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired
}

export default MenuItem;