import React from 'react';

import { useAuthentication } from '../hooks/useAuthentication';
import Form from '../components/form';

const JokeEditor = () => {
  useAuthentication();

  return <Form />;
};

export default JokeEditor;
