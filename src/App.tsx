import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import JokeEditor from './pages/joke-editor';
import DarkModeToggle from './components/darkMode';

import './App.css';

function App() {
  return (
    <DarkModeToggle>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jokes/:id' element={<JokeEditor />} />
          <Route path='/jokes/new' element={<JokeEditor />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </DarkModeToggle>
  );
}

export default App;
