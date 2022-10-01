import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Home from './routes/Home';
import NewAd from './routes/NewAd';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ad/new' element={<NewAd />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
