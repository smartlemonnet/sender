import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailList from './pages/EmailList';
import SendEmail from './pages/SendEmail';
import Shop from './pages/Shop';
import EmailConfig from './pages/EmailConfig';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
          <Route 
            path="/emails" 
            element={
              <PrivateRoute>
                <EmailList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/send" 
            element={
              <PrivateRoute>
                <SendEmail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/config" 
            element={
              <PrivateRoute>
                <EmailConfig />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
