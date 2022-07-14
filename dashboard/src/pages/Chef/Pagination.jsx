import React from 'react';

const Pagination = ({ currentPage,mealsperpage, totalmeals, paginate }) => {
    
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalmeals / mealsperpage); i++) {
    pageNumbers.push(i);
   
  }

  return (
    <div className='mt-5' style={{marginLeft:"40%"}}>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`} >
            <a onClick={(e) => {e.preventDefault();paginate(number)}} href='#' className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;