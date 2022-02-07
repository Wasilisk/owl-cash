import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import SideBarMenu from "./Menu/SideBarMenu";

const MainLayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const MainLayout = ({children}) => {
    return (
        <MainLayoutContainer>
            <SideBarMenu/>
            {children}
        </MainLayoutContainer>
    );
};

MainLayout.propTypes = {
    children: PropTypes.any
}

export default MainLayout;