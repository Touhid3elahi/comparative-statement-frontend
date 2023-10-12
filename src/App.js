import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your pages
import Home from './pages/Home';
import SupplierPage from './pages/SupplierPage';
import MaterialPage from './pages/MaterialPage';
import RateInputPage from './pages/RateInputPage';
import ComparativeStatementPage from './pages/ComparativeStatementPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div>
        {/* You can include a common header here if needed */}
        {/* <Header /> */}
        <Routes>
          {/* Public routes */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route index element={<Home />} />
          <Route path="/login/*" element={<LoginPage/>} />
          <Route path="/register/*" element={<RegisterPage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />

          {/* Private routes (requires authentication) */}
          <Route path="/suppliers" element={<SupplierPage/>} />
          <Route path="/materials" element={<MaterialPage/>} />
          <Route path="/rate-input" element={<RateInputPage/>} />
          <Route path="/comparative-statements" element={<ComparativeStatementPage/>} />

          {/* 404 Page */}
          <Route element={() => <div>Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
