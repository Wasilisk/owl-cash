
import ReactSelect from 'react-select';
import styled from "styled-components";

export const CustomSelect = styled(ReactSelect)`
  & .Select__indicator .Select__dropdown-indicator {
    border-color: transparent transparent red;
  }
  & .Select__control {
    margin-left: 10px;
    width: 160px;
    border-radius: 24px;
    background-color: #272E3B;
    border: 2px solid #3D4554;
  }
  & .Select__control:hover {
    border: 2px solid rgba(244, 192, 56, 1);
  }
  & .Select__control--is-focused {
    border: 2px solid rgba(244, 192, 56, 1);
    box-shadow: none;
  }
  
  & .Select__single-value {
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #FFFFFF;
  }
  
  & .Select__menu {
    background-color: #272E3B;
    border: 2px solid #3D4554;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }

  & .Select__option {
    color: white;
  }
  
  & .Select__option--is-focused {
    background-color: #20222A;
  }
  
  & .Select__option--is-selected {
    background-color: rgba(66, 81, 112, 1);
  }
`
