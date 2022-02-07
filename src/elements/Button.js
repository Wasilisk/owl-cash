import styled from "styled-components";

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 24px;
  width: ${({width}) => width || "180px"};
  height: ${({height}) => height || "48px"};
  margin: 5px;
  background: ${({color}) => color || "#F4C038"};
  border-radius: 48px;
  border: none;
  cursor: pointer;
  
  /*Button text*/
  font-family: Rubik, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #20222A;
  
  &:hover {
    box-shadow: rgba(255, 255, 255, 0.8) 0px 0px 0px 3px;
    color: rgba(255, 255, 255, 1);
  }
`

export default Button;