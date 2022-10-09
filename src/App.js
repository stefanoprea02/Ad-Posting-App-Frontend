import './App.css';
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Home from './routes/Home';
import NewAd from './routes/NewAd';
import Ad from './routes/Ad';
import Login from './routes/Login';
import Private from './routes/Private';
import AdSearch from './routes/AdSearch';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Private><Home /></Private>} />
          <Route path='/ad/new' element={<Private><NewAd /></Private>} />
          <Route path='/ad/:id' element={<Private><Ad /></Private>} />
          <Route path='/ads/filter' element={<Private><AdSearch /></Private>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
