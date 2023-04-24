import React from 'react';
import { createUseStyles } from 'react-jss';

export interface Filter {
  id: string;
  name: string;
  range: [number, number];
  query: string;
  default: boolean;
}

interface Props {
  items: Filter[];
  selectedItem: Filter;
  onItemSelect: (item: Filter) => void;
}

const FilterGroup: React.FC<Props> = ({
  items,
  selectedItem,
  onItemSelect,
}) => {
  const classes = useStyles();

  return (
    <div>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem
              ? `${classes.btn} ${classes.btnPrimary}`
              : `${classes.btn} ${classes.btnSecondary}`
          }
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

const useStyles = createUseStyles({
  btn: {
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: '.33s',
  },
  btnPrimary: {
    backgroundColor: '#27c72d',
  },
  btnSecondary: {
    backgroundColor: '#186780',
  },
});

export default FilterGroup;
