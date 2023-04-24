import React from 'react';

interface Props {
  type: string;
  id: string;
  name: string;
  value: string | number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Input = ({ type, id, name, value, onChange }: Props) => {
  return (
    <>
      <label htmlFor={id}>{name}:</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
