import React from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

const LanguageContainer = styled.ul`
  padding: 0;
  list-style: none;
  margin-bottom: 0;
  position: ${({inBottom}) => inBottom ? "absolute" : "static"};
  bottom: ${({inBottom}) => inBottom ? "20px" : null};

  & li {
    display: inline;
    font-size: 14px;
    margin-right: 5px;
    text-decoration: none;
  }

  & li + li:before {
    color: white;
    content: "/\\00a0";
  }

  & li:hover {
    color: white;
  }
`

const Language = styled.li`
  color: ${({isActive})=> isActive ? "rgba(244, 192, 56, 1)" : "rgba(255, 255, 255, 0.5)"}
`

const Languages = ({inBottom}) => {
    const {i18n} = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng)
    }

    return (
        <LanguageContainer inBottom={inBottom}>
            <Language isActive={i18n.language === "ua"} onClick={() => changeLanguage("ua")}>Ua</Language>
            <Language isActive={i18n.language === "ru"} onClick={() => changeLanguage("ru")}>Ru</Language>
            <Language isActive={i18n.language ==="en"} onClick={() => changeLanguage("en")}>Eng</Language>
        </LanguageContainer>
    );
};

Languages.propTypes = {
    inBottom: PropTypes.bool
}

export default Languages;