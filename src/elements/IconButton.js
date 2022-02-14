import styled from "styled-components";

const IconButton = styled.button`
  all: unset;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;

  & > svg {
    height: 20px;
    width: 20px;
    color: ${({color}) => color || "white"};
  }
`

export default IconButton;