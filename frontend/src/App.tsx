import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import './App.css';

import { Login } from './components/Login';
import { CreateAccount } from './components/CreateAccount';
import { MainFeed } from './components/MainFeed';
import { Profile } from './components/Profile';
import { Messenger } from './components/Messenger';
import { Settings } from './components/Settings';
import { FriendsList } from './components/FriendsList';

const App: React.FC = () => {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/create-account' element={<CreateAccount/>} />
      <Route path='/feed/:id' element={<MainFeed/>} />
      <Route path='/profile/:id' element={<Profile/>} />
      <Route path='/messenger/:id' element={<Messenger/>}/>
      <Route path='/settings/:id' element={<Settings/>}/>
      <Route path='friends-list/:id' element={<FriendsList/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
