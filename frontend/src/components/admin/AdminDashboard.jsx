// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  People,
  Store,
  Star,
  PersonAdd,
  Storefront,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';

const StatCard = ({ title, value, icon, color, onClick }) => (
  <Card 
    sx={{ 
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 0.2s, box-shadow 0.2s',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 2,
      '&:hover': onClick ? {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
      } : {},
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
            {value}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
            {title}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            p: 2, 
            borderRadius: '50%', 
            backgroundColor: `${color}20`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const ActionCard = ({ title, description, icon, onClick, color }) => (
  <Card 
    sx={{ 
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 2,
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box 
          sx={{ 
            p: 1.5, 
            borderRadius: '50%', 
            backgroundColor: `${color}20`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)' }}>
          Welcome to the Store Rating System administration panel
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<People />}
              color="#1976d2"
              onClick={() => navigate('/admin/users')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Stores"
              value={stats.totalStores}
              icon={<Store />}
              color="#2e7d32"
              onClick={() => navigate('/admin/stores')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Ratings"
              value={stats.totalRatings}
              icon={<Star />}
              color="#ed6c02"
            />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Quick Actions
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <ActionCard
              title="Add New User"
              description="Create a new user account with specific role"
              icon={<PersonAdd />}
              color="#1976d2"
              onClick={() => navigate('/admin/users')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ActionCard
              title="Add New Store"
              description="Register a new store with owner account"
              icon={<Storefront />}
              color="#2e7d32"
              onClick={() => navigate('/admin/stores')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ActionCard
              title="Manage Users"
              description="View and manage all user accounts"
              icon={<People />}
              color="#9c27b0"
              onClick={() => navigate('/admin/users')}
            />
          </Grid>
        </Grid>

        {/* System Overview */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            System Overview
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            The Store Rating System allows users to rate stores from 1 to 5 stars. 
            Store owners can view ratings for their stores, while normal users can 
            browse and rate stores. Administrators have full control over user and 
            store management.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<People />}
              onClick={() => navigate('/admin/users')}
            >
              Manage Users
            </Button>
            <Button
              variant="outlined"
              startIcon={<Store />}
              onClick={() => navigate('/admin/stores')}
            >
              Manage Stores
            </Button>
            <Button
              variant="outlined"
              startIcon={<Star />}
              onClick={() => navigate('/stores')}
            >
              View All Stores
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard;