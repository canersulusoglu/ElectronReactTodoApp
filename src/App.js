import React, { useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import Body from './components/Body';
import { moment } from 'globalthis/implementation';

function App() {
  return (
    <div className="App">
      <Header/>
      <Body/>
    </div>
  );
}

export default App;
