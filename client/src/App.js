// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AudiobookDetail from './pages/AudiobookDetail';
import Library from './pages/Library';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/audiobooks/:id" 
          element={
            <ProtectedRoute>
              <AudiobookDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/library" 
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
