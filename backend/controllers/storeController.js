/**
 * @fileoverview Store controller handling store-related operations and ratings
 * @module controllers/storeController
 */

const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');

/**
 * Retrieves all stores with optional filtering and sorting
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} [req.query.search] - Search term for store name or address
 * @param {string} [req.query.sortBy='name'] - Field to sort by
 * @param {string} [req.query.sortOrder='ASC'] - Sort order (ASC/DESC)
 * @param {Object} req.user - Authenticated user object
 * @param {number} req.user.id - User ID for getting user's ratings
 * @param {Object} res - Express response object
 * @returns {Object} Response with stores data
 */
const getAllStores = async (req, res) => {
  try {
    const { search, sortBy = 'name', sortOrder = 'ASC' } = req.query;
    const userId = req.user.id;
    
    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const stores = await Store.findAll({
      where: whereClause,
      order: [[sortBy, sortOrder.toUpperCase()]],
      include: [
        {
          model: Rating,
          where: { userId },
          required: false,
          attributes: ['rating']
        }
      ]
    });

    const storesWithUserRating = stores.map(store => ({
      id: store.id,
      name: store.name,
      address: store.address,
      averageRating: store.averageRating,
      userRating: store.Ratings.length > 0 ? store.Ratings[0].rating : null
    }));

    res.json(storesWithUserRating);
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    // Check if store exists
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Check if user already rated this store
    const existingRating = await Rating.findOne({
      where: { userId, storeId }
    });

    let ratingRecord;
    if (existingRating) {
      // Update existing rating
      await existingRating.update({ rating });
      ratingRecord = existingRating;
    } else {
      // Create new rating
      ratingRecord = await Rating.create({
        userId,
        storeId,
        rating
      });
    }

    // Recalculate store average rating
    const ratings = await Rating.findAll({ where: { storeId } });
    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / ratings.length;

    await store.update({
      averageRating: parseFloat(averageRating.toFixed(2)),
      totalRatings: ratings.length
    });

    res.json({
      message: existingRating ? 'Rating updated successfully' : 'Rating submitted successfully',
      rating: ratingRecord
    });
  } catch (error) {
    console.error('Submit rating error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Store Owner Controller
const getStoreOwnerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      include: [{ model: Store, as: 'ownedStore' }]
    });

    if (!user.ownedStore) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Get ratings for the store
    const ratings = await Rating.findAll({
      where: { storeId: user.ownedStore.id },
      include: [{ model: User, attributes: ['name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      store: {
        id: user.ownedStore.id,
        name: user.ownedStore.name,
        averageRating: user.ownedStore.averageRating,
        totalRatings: user.ownedStore.totalRatings
      },
      ratings: ratings.map(rating => ({
        id: rating.id,
        rating: rating.rating,
        createdAt: rating.createdAt,
        user: {
          name: rating.User.name,
          email: rating.User.email
        }
      }))
    });
  } catch (error) {
    console.error('Store owner dashboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllStores,
  submitRating,
  getStoreOwnerDashboard,
};