import styled from "styled-components";

const Typography = styled.p`
  font-family: Rubik, sans-serif;
  font-style: normal;
  font-weight: ${({fontWeight}) => fontWeight || "500"};
  font-size: ${({fontSize}) => fontSize || "16px"};
  line-height: ${({fontHeight}) => fontHeight || "24px"};
  margin-left: ${({marginLeft}) => marginLeft || "0px"};
  overflow-wrap: anywhere;
  color: ${({color}) => color || "rgba(255, 255, 255, 0.5)"};
`

export default Typography;