// src/components/user/StoresList.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Container,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { Search, Star } from '@mui/icons-material';
import { storeAPI } from '../../services/api';

const StoresList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [ratingDialog, setRatingDialog] = useState({
    open: false,
    store: null,
    rating: 0,
  });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchStores();
  }, [search, sortBy, sortOrder]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const params = {
        search: search.trim() || undefined,
        sortBy,
        sortOrder,
      };
      const response = await storeAPI.getAllStores(params);
      setStores(response.data);
    } catch (error) {
      console.error('Failed to fetch stores:', error);
      setAlert({
        open: true,
        message: 'Failed to fetch stores',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (store) => {
    setRatingDialog({
      open: true,
      store,
      rating: store.userRating || 0,
    });
  };

  const handleRatingSubmit = async () => {
    try {
      await storeAPI.submitRating({
        storeId: ratingDialog.store.id,
        rating: ratingDialog.rating,
      });
      
      setAlert({
        open: true,
        message: ratingDialog.store.userRating 
          ? 'Rating updated successfully!' 
          : 'Rating submitted successfully!',
        severity: 'success',
      });
      
      setRatingDialog({ open: false, store: null, rating: 0 });
      fetchStores(); // Refresh the list
    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.message || 'Failed to submit rating',
        severity: 'error',
      });
    }
  };

  const handleRatingChange = (event, newValue) => {
    setRatingDialog({
      ...ratingDialog,
      rating: newValue,
    });
  };

  const handleCloseRatingDialog = () => {
    setRatingDialog({ open: false, store: null, rating: 0 });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
          Stores
        </Typography>

        {/* Search and Sort Controls */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search stores"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ 
              minWidth: 200,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6366f1',
                },
                '& input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 1,
                  },
                },
                '& label': {
                  color: 'rgba(255, 255, 255, 0.6)',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ 
            minWidth: 120,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6366f1',
              },
              '& .MuiSelect-select': {
                color: 'white',
              },
              '& .MuiSvgIcon-root': {
                color: 'rgba(255, 255, 255, 0.5)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.6)',
            },
          }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="name" sx={{ color: 'black' }}>Name</MenuItem>
              <MenuItem value="address" sx={{ color: 'black' }}>Address</MenuItem>
              <MenuItem value="averageRating" sx={{ color: 'black' }}>Rating</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ 
            minWidth: 120,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6366f1',
              },
              '& .MuiSelect-select': {
                color: 'white',
              },
              '& .MuiSvgIcon-root': {
                color: 'rgba(255, 255, 255, 0.5)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.6)',
            },
          }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              label="Order"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="ASC" sx={{ color: 'black' }}>Ascending</MenuItem>
              <MenuItem value="DESC" sx={{ color: 'black' }}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Alert */}
        {alert.open && (
          <Alert 
            severity={alert.severity} 
            onClose={handleCloseAlert}
            sx={{ mb: 2 }}
          >
            {alert.message}
          </Alert>
        )}

        {/* Stores Grid */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {stores.map((store) => (
              <Grid item xs={12} sm={6} md={4} key={store.id}>
                <Card elevation={0} sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
                      {store.name}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                      {store.address}
                    </Typography>
                    
                    <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                      <Rating 
                        value={store.averageRating} 
                        precision={0.1} 
                        readOnly 
                        size="small"
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: '#fbbf24',
                          },
                          '& .MuiRating-iconEmpty': {
                            color: 'rgba(255, 255, 255, 0.3)',
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ ml: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                        {store.averageRating.toFixed(1)}/5
                      </Typography>
                    </Box>
                    
                    {store.userRating && (
                      <Box sx={{ mb: 2 }}>
                        <Chip 
                          label={`Your Rating: ${store.userRating}/5`}
                          color="primary"
                          size="small"
                        />
                      </Box>
                    )}
                    
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleRatingClick(store)}
                      startIcon={<Star />}
                      sx={{
                        py: 1.5,
                        backgroundColor: '#6366f1',
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#5855eb',
                        },
                      }}
                    >
                      {store.userRating ? 'Update Rating' : 'Rate Store'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && stores.length === 0 && (
          <Alert severity="info">
            No stores found matching your search criteria.
          </Alert>
        )}
      </Box>

      {/* Rating Dialog */}
      <Dialog 
        open={ratingDialog.open} 
        onClose={handleCloseRatingDialog} 
        maxWidth="sm" 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 600 }}>
          Rate {ratingDialog.store?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
              How would you rate this store?
            </Typography>
            <Rating
              value={ratingDialog.rating}
              onChange={handleRatingChange}
              size="large"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#fbbf24',
                },
                '& .MuiRating-iconEmpty': {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            />
            <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
              {ratingDialog.rating > 0 ? `${ratingDialog.rating}/5 stars` : 'Select a rating'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseRatingDialog}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRatingSubmit} 
            variant="contained"
            disabled={ratingDialog.rating === 0}
            sx={{
              backgroundColor: '#6366f1',
              '&:hover': {
                backgroundColor: '#5855eb',
              },
              '&:disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StoresList;