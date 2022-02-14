import styled from "styled-components";

const handleColorType = transferType => {
    switch (transferType) {
        case "initial":
            return "rgba(244, 117, 35, 1)";
        case "incoming":
            return "rgba(60, 191, 39, 1)";
        default:
            return "rgba(217, 56, 85, 1)";
    }
};

const IconContainer = styled.div`
  width: ${({ width }) => width || "30px"};
  height: ${({ height }) => height || "30px"};
  display: flex;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  margin: ${({margin}) => margin || "0px"};
  background-color: ${({ transferType }) => transferType ? handleColorType(transferType) : null};

  & > svg {
    height: 20px;
    width: 20px;
    color: ${({ color }) => color || "white"};
  }
`

export default IconContainer;