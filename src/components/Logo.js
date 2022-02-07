import React from 'react';
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 80px;
  
  & > h1:first-child {
    color: #F4C038;
  }
  
  & > h1:last-child {
    color: white;
  }
`

const Logo = () => {
    return (
        <LogoContainer>
            <h1>Owl</h1>
            <h1>Cash</h1>
        </LogoContainer>
    );
};

export default Logo;