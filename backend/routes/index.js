// routes/index.js
const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const storeController = require('../controllers/storeController');

// Import middleware
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { 
  validateUser, 
  validateStore, 
  validateRating, 
  validatePasswordUpdate 
} = require('../middleware/validation');

// Auth routes
router.post('/auth/register', validateUser, authController.register);
router.post('/auth/login', authController.login);
router.put('/auth/password', authenticateToken, validatePasswordUpdate, authController.updatePassword);

// Admin routes
router.get('/admin/dashboard', 
  authenticateToken, 
  authorizeRole('admin'), 
  adminController.getDashboardStats
);

router.post('/admin/users', 
  authenticateToken, 
  authorizeRole('admin'), 
  validateUser, 
  adminController.createUser
);

router.post('/admin/stores', 
  authenticateToken, 
  authorizeRole('admin'), 
  [
    validateStore,
    // Additional validation for owner fields
    ...validateUser.slice(0, -1), // Remove handleValidationErrors from validateUser
    validateUser[validateUser.length - 1] // Add it back at the end
  ],
  adminController.createStore
);

router.get('/admin/users', 
  authenticateToken, 
  authorizeRole('admin'), 
  adminController.getAllUsers
);

router.get('/admin/stores', 
  authenticateToken, 
  authorizeRole('admin'), 
  adminController.getAllStores
);

// Store routes (for normal users)
router.get('/stores', 
  authenticateToken, 
  authorizeRole('normal'), 
  storeController.getAllStores
);

router.post('/ratings', 
  authenticateToken, 
  authorizeRole('normal'), 
  validateRating, 
  storeController.submitRating
);

// Store owner routes
router.get('/store-owner/dashboard', 
  authenticateToken, 
  authorizeRole('store_owner'), 
  storeController.getStoreOwnerDashboard
);

module.exports = router;