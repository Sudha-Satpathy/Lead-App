import {BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate, Outlet} from 'react-router-dom';
import './App.css';
import DataProvider from './contextApi/DataProvider';
import Register from './component/Accounts/Register';
import Login from './component/Accounts/Login';
import Dashboard from './component/Dashboard/Dashboard';


function App() {
  return (
    <DataProvider>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login/> } />
              <Route path='/register' element={<Register/> } />
              <Route path='/dashboard' element={<Dashboard/> } />
          </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
