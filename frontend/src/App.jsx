// src/App.jsx - Main application component
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Profile from './components/Profile';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminStores from './components/admin/AdminStores';
import StoresList from './components/user/StoresList';
import StoreOwnerDashboard from './components/store-owner/StoreOwnerDashboard';
import { Box, Container, Typography, Button } from '@mui/material';
import { Store, Star, Search, People } from '@mui/icons-material';

// Import AuthContext first
import { AuthProvider } from './contexts/AuthContext';

// Home component with dark theme
const Home = () => (
  <Box sx={{ 
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: 4
  }}>
    <CssBaseline />
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          textAlign: 'center',
        }}
      >
        {/* Logo and Title */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 3,
            }}
          >
            <Store sx={{ color: 'white', fontSize: 40 }} />
          </Box>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              mb: 2
            }}
          >
            Welcome to Store Rating System
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Rate and discover the best stores in your area. Join our community to share your experiences and help others make informed decisions.
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                backgroundColor: '#6366f1',
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#5855eb',
                }
              }}
            >
              Create Account
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              Sign In
            </Button>
          </Link>
        </Box>

        {/* Features */}
        <Box sx={{ mt: 6, display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', maxWidth: 200 }}>
            <Box sx={{ 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              bgcolor: 'rgba(99, 102, 241, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 2,
            }}>
              <Star sx={{ color: '#6366f1', fontSize: 24 }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              Rate Stores
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Share your experiences with 1-5 star ratings
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', maxWidth: 200 }}>
            <Box sx={{ 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              bgcolor: 'rgba(34, 197, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 2,
            }}>
              <Search sx={{ color: '#22c55e', fontSize: 24 }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              Discover
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Find the best stores in your area
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', maxWidth: 200 }}>
            <Box sx={{ 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              bgcolor: 'rgba(59, 130, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 2,
            }}>
              <People sx={{ color: '#3b82f6', fontSize: 24 }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              Community
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Join our growing community of reviewers
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <AdminUsers />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/stores" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <AdminStores />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* User Routes */}
            <Route path="/stores" element={
              <ProtectedRoute allowedRoles={['normal']}>
                <Layout>
                  <StoresList />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Store Owner Routes */}
            <Route path="/store-owner" element={
              <ProtectedRoute allowedRoles={['store_owner']}>
                <Layout>
                  <StoreOwnerDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;