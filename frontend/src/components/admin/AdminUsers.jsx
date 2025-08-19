// src/components/admin/AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  IconButton,
  Chip,
  Grid,
  Alert,
  InputAdornment,
} from '@mui/material';
import { Add, Search, Visibility, VisibilityOff } from '@mui/icons-material';
import { adminAPI } from '../../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [createUserDialog, setCreateUserDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'normal',
  });

  useEffect(() => {
    fetchUsers();
  }, [sortBy, sortOrder, search, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        sortBy,
        sortOrder,
        search: search.trim() || undefined,
        role: roleFilter || undefined,
      };
      const response = await adminAPI.getAllUsers(params);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setAlert({
        open: true,
        message: 'Failed to fetch users',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column) => {
    const isAsc = sortBy === column && sortOrder === 'ASC';
    setSortOrder(isAsc ? 'DESC' : 'ASC');
    setSortBy(column);
  };

  const handleCreateUser = async () => {
    try {
      await adminAPI.createUser(newUser);
      setAlert({
        open: true,
        message: 'User created successfully',
        severity: 'success',
      });
      setCreateUserDialog(false);
      setNewUser({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'normal',
      });
      fetchUsers();
    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.message || 'Failed to create user',
        severity: 'error',
      });
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'store_owner':
        return 'warning';
      case 'normal':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateUserDialog(true)}
        >
          Add User
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Role</InputLabel>
              <Select
                value={roleFilter}
                label="Filter by Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="">All Roles</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="normal">Normal User</MenuItem>
                <MenuItem value="store_owner">Store Owner</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={fetchUsers}
              disabled={loading}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Alert */}
      {alert.open && (
        <Alert
          severity={alert.severity}
          sx={{ mb: 2 }}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          {alert.message}
        </Alert>
      )}

      {/* Users Table */}
      <TableContainer 
        component={Paper} 
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backgroundImage: 'none',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortBy === 'name' ? sortOrder.toLowerCase() : 'asc'}
                  onClick={() => handleSort('name')}
                  sx={{
                    '& .MuiTableSortLabel-icon': {
                      color: 'rgba(255,255,255,0.3) !important',
                    },
                  }}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <TableSortLabel
                  active={sortBy === 'email'}
                  direction={sortBy === 'email' ? sortOrder.toLowerCase() : 'asc'}
                  onClick={() => handleSort('email')}
                  sx={{
                    '& .MuiTableSortLabel-icon': {
                      color: 'rgba(255,255,255,0.3) !important',
                    },
                  }}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Address
              </TableCell>
              <TableCell 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <TableSortLabel
                  active={sortBy === 'role'}
                  direction={sortBy === 'role' ? sortOrder.toLowerCase() : 'asc'}
                  onClick={() => handleSort('role')}
                  sx={{
                    '& .MuiTableSortLabel-icon': {
                      color: 'rgba(255,255,255,0.3) !important',
                    },
                  }}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Rating
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell 
                  colSpan={5} 
                  align="center"
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={5} 
                  align="center"
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow 
                  key={user.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(255,255,255,0.05)'
                    },
                    transition: 'background-color 0.2s'
                  }}
                >
                  <TableCell 
                    sx={{ 
                      color: 'rgba(255,255,255,0.9)',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'rgba(255,255,255,0.9)',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'rgba(255,255,255,0.9)',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      maxWidth: {
                        xs: 100,
                        sm: 150,
                        md: 200
                      }
                    }}
                  >
                    {user.address.length > 50 
                      ? `${user.address.substring(0, 50)}...` 
                      : user.address}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <Chip
                      label={user.role.replace('_', ' ').toUpperCase()}
                      color={getRoleColor(user.role)}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        '& .MuiChip-label': {
                          color: 'white'
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'rgba(255,255,255,0.9)',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {user.rating ? user.rating.toFixed(1) : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create User Dialog */}
      <Dialog
        open={createUserDialog}
        onClose={() => setCreateUserDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            helperText="Name must be between 20 and 60 characters"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            helperText="8-16 characters, must include uppercase letter and special character"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Address"
            multiline
            rows={3}
            value={newUser.address}
            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            helperText="Maximum 400 characters"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              label="Role"
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <MenuItem value="normal">Normal User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateUserDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateUser} variant="contained">
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUsers;