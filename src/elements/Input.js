import styled from "styled-components";
import PropTypes from 'prop-types';
import React from "react";
import ErrorMessage from "./ErrorMessage";
import Flex from "./Flex";

const InputContainer = styled.div`
  position: relative;
  
  & > input {
    width: 400px;
    height: 48px;
    position: relative;
    border: ${({error}) => error ? "2px solid rgba(217, 56, 85, 1)" : "2px solid #3D4554"};
    box-sizing: border-box;
    border-radius: 24px;
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
    margin: 16px 0px 5px;
    background: none;
    padding-left: 15px;

    /*Input text*/
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #FFFFFF;
    &:focus {
      outline: none;
      border: ${({error}) => error ? "2px solid rgba(217, 56, 85, 1)" : "2px solid rgba(244, 192, 56, 1)"};
    }

    &:-webkit-autofill {
      -webkit-background-clip: text;
      -webkit-text-fill-color: white !important;
    }
    
    &:focus ~ label {
      bottom: 42px;
      color: ${({error}) => error ? "rgba(217, 56, 85, 1)" : "rgba(244, 192, 56, 1)"};
    }

    &:valid ~ label {
      bottom: 42px;
    }
  }
  
  & > label {
    bottom: 20px;
    left: 15px;
    position: absolute;
    color: ${({error}) => error ? "rgba(217, 56, 85, 1)" : "rgba(255, 255, 255, 0.5)"};
    background-color: #272E3B;
    padding: 0px 5px 0px 5px;
    font-size: 1.1em;
    transition: 0.2s;
    pointer-events: none;
  }
`

const Input = React.forwardRef(({label, error, ...props}, ref) => {
    return (
        <Flex alignItems="start">
            <InputContainer error={error}>
                <input ref={ref} {...props} required/>
                <label>{label}</label>
            </InputContainer>
            <ErrorMessage>{error?.message}</ErrorMessage>
        </Flex>
    )
})

Input.displayName="Input"

Input.propTypes= {
    label: PropTypes.string,
    error: PropTypes.string,
}

export default Input;