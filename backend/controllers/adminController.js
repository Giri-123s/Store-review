// controllers/adminController.js
const bcrypt = require('bcryptjs');
const { User, Store, Rating } = require('../models');
const { Op } = require('sequelize');

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count({ where: { role: { [Op.ne]: 'admin' } } });
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: role || 'normal'
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerName, ownerEmail, ownerPassword, ownerAddress } = req.body;
    
    // Check if store email already exists
    const existingStore = await Store.findOne({ where: { email } });
    if (existingStore) {
      return res.status(400).json({ message: 'Store already exists with this email' });
    }

    // Check if owner email already exists
    const existingOwner = await User.findOne({ where: { email: ownerEmail } });
    if (existingOwner) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create store
    const store = await Store.create({
      name,
      email,
      address
    });

    // Hash owner password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ownerPassword, salt);

    // Create store owner
    const owner = await User.create({
      name: ownerName,
      email: ownerEmail,
      password: hashedPassword,
      address: ownerAddress,
      role: 'store_owner',
      storeId: store.id
    });

    res.status(201).json({
      message: 'Store and owner created successfully',
      store: {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: {
          id: owner.id,
          name: owner.name,
          email: owner.email
        }
      }
    });
  } catch (error) {
    console.error('Create store error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { sortBy = 'name', sortOrder = 'ASC', search, role } = req.query;
    
    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (role) {
      whereClause.role = role;
    }

    const users = await User.findAll({
      where: whereClause,
      include: [{ model: Store, as: 'ownedStore' }],
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    res.json(users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      rating: user.ownedStore ? user.ownedStore.averageRating : null
    })));
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllStores = async (req, res) => {
  try {
    const { sortBy = 'name', sortOrder = 'ASC', search } = req.query;
    
    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const stores = await Store.findAll({
      where: whereClause,
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    res.json(stores);
  } catch (error) {
    console.error('Get all stores error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getDashboardStats,
  createUser,
  createStore,
  getAllUsers,
  getAllStores,
};