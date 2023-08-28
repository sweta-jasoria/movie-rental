import React from 'react';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {Route, Routes, Navigate} from 'react-router-dom';
import {AppContextProvider} from './context/AppContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Movies from './components/Movies';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <AppContextProvider>
          <Navbar />

          <Routes>
              <Route path='/movies' element={<Movies />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/' element={<Navigate replace to='/movies' />} />
          </Routes>
      </AppContextProvider>
    </React.Fragment>
  )
}

export default App;
