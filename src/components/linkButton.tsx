import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

interface Props {
  title: string;
  path: string;
}

const LinkButton: React.FC<Props> = ({ title, path }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Link to={{ pathname: path }} className={classes.link}>
        <button className={classes.button}>{title}</button>
      </Link>
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    backgroundColor: '#66347F',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#201968',
    },
  },
});

export default LinkButton;
