# Store Rating System - FullStack Intern Coding Challenge

A comprehensive web application that allows users to submit ratings for stores registered on the platform. Built with React.js frontend and Express.js backend with PostgreSQL database.

## 🚀 Features

### System Administrator
- ✅ **Dashboard** with statistics (Total users, stores, ratings)
- ✅ **Add new stores** with owner accounts
- ✅ **Add new users** (normal users and admin users)
- ✅ **View and manage** all users and stores
- ✅ **Search and filter** functionality on all listings
- ✅ **Sorting** capabilities for all data tables
- ✅ **Role-based access** control

### Normal User
- ✅ **Sign up and login** with form validation
- ✅ **Update password** functionality
- ✅ **Browse stores** with search by name and address
- ✅ **Submit ratings** (1-5 stars) for stores
- ✅ **Modify existing ratings**
- ✅ **View store details** with overall ratings

### Store Owner
- ✅ **Dashboard** showing store statistics
- ✅ **View ratings** submitted by users
- ✅ **Update password** functionality
- ✅ **Store management** interface

## 🛠 Tech Stack

### Backend
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Password Hashing**: bcryptjs

### Frontend
- **Framework**: React.js
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Styling**: MUI System + Custom CSS

## 📋 Requirements Compliance

### ✅ Form Validations
- **Name**: Min 20 characters, Max 60 characters
- **Address**: Max 400 characters
- **Password**: 8-16 characters, must include uppercase letter and special character
- **Email**: Standard email validation rules

### ✅ Database Schema
- **Users Table**: id, name, email, password, address, role, storeId
- **Stores Table**: id, name, email, address, averageRating, totalRatings
- **Ratings Table**: id, userId, storeId, rating (with unique constraint)

### ✅ User Roles
- **System Administrator**: Full access to all features
- **Normal User**: Can rate stores and manage profile
- **Store Owner**: Can view store ratings and manage store

### ✅ Additional Features
- ✅ **Sorting**: All tables support ascending/descending sorting
- ✅ **Search & Filter**: Based on Name, Email, Address, and Role
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **Modern UI**: Dark-themed authentication forms
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Security**: JWT authentication, password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ROLIXER
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Database Setup**
   ```bash
   # Start PostgreSQL service
   brew services start postgresql@14
   
   # Create database
   createdb store_rating
   ```

4. **Environment Configuration**
   ```bash
   # Create .env file in backend directory
   echo "DATABASE_URL=postgresql://shivamkumargiri@localhost:5432/store_rating" > .env
   echo "JWT_SECRET=your-super-secret-jwt-key-change-this-in-production" >> .env
   echo "PORT=3001" >> .env
   ```

5. **Start Backend Server**
   ```bash
   npm run dev
   ```

6. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

7. **Start Frontend Development Server**
   ```bash
   npm start
   ```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api

## 📁 Project Structure

```
ROLIXER/
├── backend/
│   ├── controllers/
│   │   ├── adminController.js    # Admin functionality
│   │   ├── authController.js     # Authentication
│   │   └── storeController.js    # Store and rating management
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── validation.js        # Form validation
│   ├── models/
│   │   └── index.js             # Database models
│   ├── routes/
│   │   └── index.js             # API routes
│   └── server.js                # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/           # Admin components
│   │   │   ├── user/            # User components
│   │   │   ├── store-owner/     # Store owner components
│   │   │   ├── Login.jsx        # Authentication
│   │   │   ├── Register.jsx     # User registration
│   │   │   └── Profile.jsx      # User profile
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   └── services/
│   │       └── api.js           # API service
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `PUT /api/auth/password` - Update password

### Admin Routes
- `GET /api/admin/dashboard` - Dashboard statistics
- `POST /api/admin/users` - Create new user
- `POST /api/admin/stores` - Create new store
- `GET /api/admin/users` - Get all users (with filters)
- `GET /api/admin/stores` - Get all stores (with filters)

### User Routes
- `GET /api/stores` - Get stores (with search)
- `POST /api/ratings` - Submit rating

### Store Owner Routes
- `GET /api/store-owner/dashboard` - Store owner dashboard

## 🎨 UI Features

### Modern Design
- **Dark-themed authentication forms** with glassmorphism effects
- **Responsive design** that works on all devices
- **Material-UI components** for consistent styling
- **Interactive elements** with hover effects and animations
- **Professional color scheme** with proper contrast

### User Experience
- **Intuitive navigation** with role-based routing
- **Real-time feedback** for all user actions
- **Loading states** and error handling
- **Form validation** with helpful error messages
- **Accessible design** following best practices

## 🔒 Security Features

- **JWT Authentication** for secure sessions
- **Password hashing** using bcryptjs
- **Input validation** and sanitization
- **Role-based access control**
- **Protected routes** on frontend and backend
- **CORS configuration** for API security

## 📊 Database Design

### Users Table
```sql
CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  role ENUM('admin', 'normal', 'store_owner') DEFAULT 'normal',
  storeId INTEGER REFERENCES "Stores"(id),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Stores Table
```sql
CREATE TABLE "Stores" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  address TEXT NOT NULL,
  averageRating FLOAT DEFAULT 0,
  totalRatings INTEGER DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Ratings Table
```sql
CREATE TABLE "Ratings" (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES "Users"(id),
  storeId INTEGER NOT NULL REFERENCES "Stores"(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  UNIQUE(userId, storeId)
);
```

## 🧪 Testing

The application includes comprehensive error handling and validation:

- **Form validation** on both frontend and backend
- **API error handling** with proper HTTP status codes
- **Database constraint validation**
- **Authentication error handling**
- **Input sanitization** and validation

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Install dependencies: `npm install`
4. Run database migrations: `npm run migrate`
5. Start server: `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Serve the build folder using a web server
3. Configure API base URL for production

## 📝 License

This project is created for the FullStack Intern Coding Challenge.

## 👨‍💻 Author

Created with ❤️ for the coding challenge requirements.

---

**Note**: This implementation fully satisfies all the requirements specified in the coding challenge, including form validations, user roles, database design, and modern UI/UX practices.
