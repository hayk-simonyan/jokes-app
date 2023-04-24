import React from 'react';
import { createUseStyles } from 'react-jss';

interface PageSizeDropDownProps {
  pageSize: number;
  onPageSizeChange: (page: number) => void;
}

function PageSizeDropdown({
  pageSize,
  onPageSizeChange,
}: PageSizeDropDownProps) {
  const classes = useStyles();
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(+event.target.value);
  };

  return (
    <select
      value={`${pageSize}`}
      onChange={handleOptionChange}
      className={classes.dropdown}
    >
      <option value='5'>5</option>
      <option value='10'>10</option>
    </select>
  );
}

const useStyles = createUseStyles({
  dropdown: {
    display: 'inline-block',
    position: 'relative',
    width: '100px',
    height: '30px',
    lineHeight: '30px',
    padding: '0 10px',
    border: '1px solid rgb(77, 77, 77)',
    borderRadius: '4px',
    background: '#9E4784',
    overflow: 'hidden',
    outline: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#201968',
    },
    '&:focus': {
      borderColor: '#201968',
    },
    '& option': {
      padding: '10px',
    },
  },
});

export default PageSizeDropdown;
