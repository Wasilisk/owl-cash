import styled from "styled-components";

const Flex = styled.div`
  width: ${({width}) => width || "100%"};
  height: ${({height}) => height || "100%"};
  display: flex;
  justify-content: ${({justifyContent}) => justifyContent || "center"};;
  align-items: ${({alignItems}) => alignItems || "center"};
  flex-direction: ${({direction}) => direction || "column"};
`

export default Flex;