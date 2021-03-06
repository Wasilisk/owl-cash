import styled from "styled-components";

const Paper = styled.div`
  width: ${({width}) => width || "auto"};
  height: ${({height}) => height || "auto"};
  display: flex;
  position: relative;
  flex-direction: ${({direction}) => direction || "column"};
  border-radius: 20px;
  padding: ${({padding}) => padding || "30px"};
  margin: ${({margin}) => margin || "0px"};
  white-space: normal;
  background-color: #272E3B;
  border: 2px solid #3D4554;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`

export default Paper;