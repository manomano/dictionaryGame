import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Word from  './Components/word.js';

function App() {
  return (
    <Container maxWidth="sm">
      <header>

        <h1>
          THIS IS DICTIONARY GAME
        </h1>

        <Word/>


      </header>
    </Container>
  );
}

export default App;
