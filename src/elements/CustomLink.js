import styled from "styled-components";
import {Link} from "react-router-dom";

const CustomLink = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  color: #2DA0E0;
  margin: ${({margin}) => margin || "0px"};
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: white;
  }
`

export default CustomLink;