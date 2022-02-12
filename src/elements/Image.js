import styled from "styled-components";

const Image = styled.img`
  width: ${({width}) => width || "auto"};
  height: ${({height}) => height || "auto"};
  margin: ${({margin}) => margin || "20px"};
`

export default Image;