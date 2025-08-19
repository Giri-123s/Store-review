// src/components/store-owner/StoreOwnerDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import { storeOwnerAPI } from '../../services/api';

const StoreOwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await storeOwnerAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!dashboardData) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 2 }}>
          No dashboard data available
        </Alert>
      </Container>
    );
  }

  const { store, ratings } = dashboardData;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Store Dashboard
        </Typography>

        {/* Store Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Store Name
                </Typography>
                <Typography variant="h5" component="div">
                  {store.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Average Rating
                </Typography>
                <Box display="flex" alignItems="center">
                  <Rating value={store.averageRating} precision={0.1} readOnly />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {store.averageRating.toFixed(1)}/5
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Ratings
                </Typography>
                <Typography variant="h5" component="div">
                  {store.totalRatings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Ratings Table */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            User Ratings
          </Typography>
          
          {ratings.length === 0 ? (
            <Alert severity="info">
              No ratings have been submitted for your store yet.
            </Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ratings.map((rating) => (
                    <TableRow key={rating.id}>
                      <TableCell>{rating.user.name}</TableCell>
                      <TableCell>{rating.user.email}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Rating value={rating.rating} readOnly size="small" />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {rating.rating}/5
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default StoreOwnerDashboard;
