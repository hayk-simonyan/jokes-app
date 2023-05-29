import React from 'react';
import { createUseStyles } from 'react-jss';

interface Props {
  title: string;
  onClick: (event: React.MouseEvent) => void;
  type?: 'default' | 'delete';
  className?: string;
}

const Button: React.FC<Props> = ({
  title,
  onClick,
  type = 'default',
  className,
}) => {
  const classes = useStyles();

  return (
    <div className={`button-wrapper ${className}`}>
      <button
        className={type === 'default' ? classes.default : classes.delete}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

const useStyles = createUseStyles({
  default: {
    backgroundColor: '#66347F',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    margin: '10px 0',
    '& hover': {
      backgroundColor: '#201968',
    },
  },
  delete: {
    backgroundColor: 'white',
    color: 'red',
    border: '1px solid red',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    margin: '10px 0',
    '& hover': {
      backgroundColor: 'red',
      color: 'white',
    },
  },
});

export default Button;
