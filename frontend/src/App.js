import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProtectedRoute from './routing/ProtectedRoute';
import ForgotPass from './screens/ForgotPassword/ForgotPass';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPass />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </Router>
  );
}

export default App;
