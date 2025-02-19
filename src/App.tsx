import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/Home';
import PrivateRoute from './Pages/PrivateRoute';
import TaskPage from './Pages/Task';
import AuthPage from './Pages/Auth';

import './App.css'

function App() {

  return (
    <BrowserRouter>
    <div className='root'>
      <header>
        <h3>Task Manager</h3>
      </header>
      <Routes>
        <Route path='/' index element={<HomePage />}/>
        <Route path='/tasks' element={<PrivateRoute component={TaskPage}/>}/>
        <Route path='/auth/login' element={<AuthPage AuthType='Login'/>}/>
        <Route path='/auth/register' element={<AuthPage AuthType='Register'/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
