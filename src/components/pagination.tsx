import React from 'react';
import { createUseStyles } from 'react-jss';

import PageSizeDropDown from './pageSize';

interface Props {
  itemsCount: number;
  pageSize: number;
  onPageChange: (sign: number) => void;
  onPageSizeChange: (page: number) => void;
  currentPage: number;
}

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <nav>
        <ul className={classes.pagination}>
          <li className={classes.pageItem}>
            {currentPage > 1 && (
              <button
                className={classes.pageLink}
                onClick={() => onPageChange(-1)}
              >
                {'<'}
              </button>
            )}
            {itemsCount >= pageSize && (
              <button
                className={classes.pageLink}
                onClick={() => onPageChange(+1)}
              >
                {'>'}
              </button>
            )}
          </li>
        </ul>
      </nav>
      <PageSizeDropDown
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
    </>
  );
};

const useStyles = createUseStyles({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    margin: '20px 0',
    padding: '0',
  },
  pageItem: {
    margin: '0 10px',
  },
  pageLink: {
    color: '#fff',
    textDecoration: 'none',
    backgroundColor: '#9E4784',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 15px',
    fontSize: '16px',
    marginRight: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: '.33s',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#D27685',
    },
  },
});

export default Pagination;
