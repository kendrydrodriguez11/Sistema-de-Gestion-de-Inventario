import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import ProductList from './components/products/ProductList';
import ProductForm from './components/products/ProductForm';
import ProductDetail from './components/products/ProductDetail';
import MovementList from './components/inventory/MovementList';
import MovementForm from './components/inventory/MovementForm';
import NotificationCenter from './components/notifications/NotificationCenter';
import LowStockProducts from './components/products/LowStockProducts';
import CategoryView from './components/products/CategoryView';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <Navbar onMenuClick={handleSidebarToggle} />
          <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
        </>
      )}
      
      <Box sx={{ pt: isAuthenticated ? 8 : 0 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/products/new"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/products/edit/:id"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/products/:id"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/movements"
            element={
              <PrivateRoute>
                <MovementList />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/movements/new"
            element={
              <PrivateRoute>
                <MovementForm />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationCenter />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/low-stock"
            element={
              <PrivateRoute>
                <LowStockProducts />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <CategoryView />
              </PrivateRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Box>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;