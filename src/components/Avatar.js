import styled from "styled-components";

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #556080;
  border: 2px solid #3D4554;

  & > svg {
    color: white;
  }
`

export default Avatar;