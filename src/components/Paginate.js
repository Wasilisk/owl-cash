import React from 'react';
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import styled from "styled-components";

const PaginateContainer = styled.div`
  width: 100%;
  height: 50px;
  position: relative;

  & > ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    cursor: pointer;
    padding: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    
    & > li {
      margin: 0 5px 0 5px;
      font-weight: 500;
    }
  }
  
  & .pagination a {
    padding: 10px;
    border-radius: 5px;
    background-color: #F4C038;
  }

  & .pagination__link {
    font-weight: bold;
  }

  & .pagination__link--active a {
    color: #F4C038;
    background: #272E3B;
    border: 1px solid #F4C038;
  }
  
`

const Paginate = ({pageCount, ...props}) => {

    return (
            <PaginateContainer>
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                    {...props}
                />
            </PaginateContainer>
    );
};

Paginate.propTypes = {
    pageCount: PropTypes.number,
}

export default Paginate;