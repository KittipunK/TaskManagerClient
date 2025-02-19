import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/Home';
import PrivateRoute from './Pages/PrivateRoute';
import TaskPage from './Pages/Task';
import AuthPage from './Pages/Auth';

import './App.css'

function App() {

  const [ user, setUser ] = useState({});

  return (
    <BrowserRouter>
    <div className='root'>
      <header>
        <h1>Task Manager</h1>
      </header>
      <Routes>
        <Route path='/' index element={<HomePage User={user}/>}/>
        <Route path='/tasks' element={<PrivateRoute component={TaskPage}/>}/>
        <Route path='/auth/login' element={<AuthPage AuthType='Login'/>}/>
        <Route path='/auth/register' element={<AuthPage AuthType='Register'/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
