import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/Home/Home';

import './App.css'

function App() {

  const [ user, setUser ] = useState();

  return (
    <BrowserRouter>
    <div className='root'>
      <header>
        <h1>Task Manager</h1>
      </header>
      <Routes>
        <Route path='/' index element={<HomePage />}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
