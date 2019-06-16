import React from 'react';
import logo from './logo.svg';
import './App.css';
import Word from  './Components/word.js';

function App() {
  return (
    <div>
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          this is my game
        </p>

        <Word/>


      </header>
    </div>
  );
}

export default App;
