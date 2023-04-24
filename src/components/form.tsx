import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Joke } from '../utils/types';
import Input from './input';
import { createdAtDate, validateEmail } from '../utils/functions';
import Button from './button';
import LinkButton from './linkButton';
import http from '../services/httpService';
import { createUseStyles } from 'react-jss';

const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const [data, setData] = useState<Joke | null>(location.state || null);
  const { id } = useParams<{ id: string }>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const isEditPage = !!id;

  useEffect(() => {
    const validateForm = () => {
      const { Author } = data!;
      validateEmail(Author) ? setIsValid(true) : setIsValid(false);
    };

    validateForm();
  }, [data]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setData((prevFormData) => ({
      ...prevFormData!,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditPage) {
      await http.put(`${process.env.REACT_APP_JOKES_API}/${id}`, data);
    } else {
      await http.post(`${process.env.REACT_APP_JOKES_API}`, {
        ...data,
        CreatedAt: createdAtDate(),
      });
    }
    navigate('/');
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    http.delete(`${process.env.REACT_APP_JOKES_API}/${id}`);
    navigate('/');
  };

  return (
    <>
      <LinkButton path='/' title='Back' />
      <form className={classes.form} onSubmit={handleSubmit}>
        <Input
          type='text'
          id='body'
          name='Body'
          value={data?.Body || ''}
          onChange={handleChange}
        />
        <Input
          type='text'
          id='joke'
          name='Joke'
          value={data?.Joke || ''}
          onChange={handleChange}
        />
        <Input
          type='text'
          id='title'
          name='Title'
          value={data?.Title || ''}
          onChange={handleChange}
        />
        <Input
          type='email'
          id='author'
          name='Author'
          value={data?.Author || ''}
          onChange={handleChange}
        />
        <Input
          type='number'
          id='views'
          name='Views'
          value={data?.Views || ''}
          onChange={handleChange}
        />
        <button type='submit' disabled={!isValid}>
          Submit
        </button>
      </form>
      {isEditPage && (
        <Button title='Delete' onClick={handleDelete} type='delete' />
      )}
    </>
  );
};

const useStyles = createUseStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
    '& label': {
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    '& input, textarea': {
      padding: '8px',
      marginBottom: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    '& input:focus, textarea:focus': {
      borderColor: '#201968',
      outline: 'none',
    },
    '& button': {
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
    '& button:disabled': {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
  },
});

export default Form;
