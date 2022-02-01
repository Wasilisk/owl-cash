import styled from "styled-components";

const InputContainer = styled.div`
  position: relative;
  & > label {
    bottom: 30px;
    left: 15px;
    position: absolute;
    color: rgba(255, 255, 255, 0.5);
    background-color: #272E3B;
    padding: 0px 5px 0px 5px;
    font-size: 1.1em;
    transition: 0.2s;
    pointer-events: none;
  }
`

const InputElement = styled.input`
  width: 400px;
  height: 48px;
  position: relative;
  border: 2px solid #3D4554;
  box-sizing: border-box;
  border-radius: 24px;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  margin: 16px 0px;
  background: none;
  padding-left: 15px;

  /*Input text*/
  font-family: Rubik, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #FFFFFF;

  &:focus {
    outline: 2px solid rgba(244, 192, 56, 1);
  }

  &:focus ~ label {
    bottom: 55px;
    color: rgba(244, 192, 56, 1);
  }

  &:valid ~ label {
    bottom: 55px;
  }
`
const Input = ({label}, props) => {
    return (
        <InputContainer>
            <InputElement type="text" id="usr" {...props} required/>
            <label for="usr">{label}</label>
        </InputContainer>
    )
}

export default Input;