/* node_modules */
import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import {FaSearch} from "react-icons/fa"

/* components */
import Form from "./Form";

const InputContainer = styled.div`
  position: relative;
  width: 300px;
  height: 40px;
  border: 2px solid #3D4554;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0;
  margin: 0;
  background: none;
  padding-left: 15px;

  &:hover {
    border: 2px solid rgba(244, 192, 56, 1);
  }

  & > input {
    all: unset;
    width: 250px;
    height: 40px;
    /*Input text*/
    font-family: Rubik, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #FFFFFF;
    
    &:-webkit-autofill {
      -webkit-background-clip: text;
      -webkit-text-fill-color: white !important;
    }
  }

  & > button {
    all: unset;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
    border-radius: 24px;
    
    &:hover {
      background-color: #20222A;
    }
  }
`

const SearchInput = React.forwardRef(({onSubmit, ...props}, ref) => {
    return (
        <Form onSubmit={onSubmit}>
            <InputContainer>
                <input placeholder="Search..." ref={ref} {...props}/>
                <button type="submit"><FaSearch/></button>
            </InputContainer>
        </Form>
    )
})

SearchInput.displayName = "SearchInput"

SearchInput.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default SearchInput;