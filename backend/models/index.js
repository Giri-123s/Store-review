// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/store_rating', {
  dialect: 'postgres',
  logging: false,
});

// User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      len: [20, 60],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 400],
    },
  },
  role: {
    type: DataTypes.ENUM('admin', 'normal', 'store_owner'),
    allowNull: false,
    defaultValue: 'normal',
  },
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Stores',
      key: 'id',
    },
  },
});

// Store Model
const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      len: [20, 60],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 400],
    },
  },
  averageRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  totalRatings: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// Rating Model
const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Stores',
      key: 'id',
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'storeId'],
      name: 'unique_user_store_rating'
    }
  ]
});

// Associations
User.belongsTo(Store, { foreignKey: 'storeId', as: 'ownedStore' });
Store.hasOne(User, { foreignKey: 'storeId', as: 'owner' });

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating, { foreignKey: 'storeId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

// Add unique constraint for user-store rating combination
// This will be handled by the model definition with unique constraint

module.exports = {
  sequelize,
  User,
  Store,
  Rating,
};