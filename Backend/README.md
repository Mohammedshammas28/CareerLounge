# Career Lounge - Backend API

Production-ready Node.js/Express/MongoDB backend for Career Lounge - "Empowering Careers. Enabling Futures."

## Features

✅ **Authentication** - JWT-based signup and login  
✅ **Lead Management** - Capture and manage leads from contact forms  
✅ **Booking System** - Manage consultation bookings with time slots  
✅ **Admin Panel** - User management, lead tracking, booking oversight  
✅ **Security** - Helmet, Rate limiting, CORS, Input validation  
✅ **Database** - MongoDB with Mongoose ORM  

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **CORS** - Cross-origin resource sharing

## Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── leadController.js    # Lead management
│   │   ├── bookingController.js # Booking management
│   │   └── adminController.js   # Admin operations
│   ├── middleware/
│   │   └── auth.js              # JWT & admin middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Lead.js              # Lead schema
│   │   └── Booking.js           # Booking schema
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth routes
│   │   ├── leadRoutes.js        # /api/leads routes
│   │   ├── bookingRoutes.js     # /api/bookings routes
│   │   └── adminRoutes.js       # /api/admin routes
│   ├── seed.js                  # Admin seeding script
│   └── server.js                # Entry point
├── .env.example                 # Environment variables template
├── package.json
└── README.md
```

## Setup Instructions

### 1. Clone and Install

```bash
cd Backend
npm install
```

### 2. Configure Environment

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/career-lounge
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3001

ADMIN_EMAIL=admin@careerlounge.com
ADMIN_PASSWORD=Admin@123456
ADMIN_NAME=Career Lounge Admin
```

### 3. Start MongoDB

**Windows (with MongoDB installed):**
```bash
mongod
```

**Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 4. Run Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 5. Seed Admin User (Optional)

```bash
npm run seed
```

This creates an admin user with credentials from `.env`:
- Email: `admin@careerlounge.com`
- Password: `Admin@123456`

## API Endpoints

### Authentication

```
POST /api/auth/signup
POST /api/auth/login
```

### Leads

```
POST /api/leads                    # Create lead (public)
GET /api/leads                     # Get all leads (admin only)
PATCH /api/leads/:id               # Update lead status (admin only)
```

### Bookings

```
POST /api/bookings                 # Create booking (authenticated)
GET /api/bookings                  # Get all bookings (admin only)
GET /api/bookings/user/my-bookings # Get user's bookings (authenticated)
PATCH /api/bookings/:id            # Update booking status (admin only)
```

### Admin

```
GET /api/admin/users               # Get all users (admin only)
DELETE /api/admin/users/:id        # Delete user (admin only)
GET /api/admin/stats               # Get system stats (admin only)
```

### Health Check

```
GET /api/health
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String ('user' | 'admin', default: 'user'),
  phone: String,
  timestamps: true
}
```

### Lead
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  service: String ('Career Counselling' | 'Educational Consultancy' | 'Recruitment Services' | 'Immigration Services'),
  message: String,
  status: String ('new' | 'contacted' | 'converted' | 'closed', default: 'new'),
  timestamps: true
}
```

### Booking
```javascript
{
  userId: ObjectId (ref: User, required),
  name: String (required),
  email: String (required),
  phone: String (required),
  service: String (required),
  date: Date (required),
  timeSlot: String (required),
  notes: String,
  status: String ('pending' | 'confirmed' | 'completed' | 'cancelled', default: 'pending'),
  timestamps: true
}
```

## Security Features

- **Helmet** - Sets various HTTP headers for security
- **CORS** - Restricted to frontend URL from `.env`
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **JWT** - Token-based authentication with expiration
- **Password Hashing** - bcryptjs with salt rounds
- **Input Validation** - Required fields checked on all endpoints
- **Admin Middleware** - Role-based access control

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | `mongodb://localhost:27017/career-lounge` |
| JWT_SECRET | Secret key for JWT signing | `your_super_secret_key` |
| JWT_EXPIRE | Token expiration time | `7d` |
| PORT | Server port | `5000` |
| NODE_ENV | Environment | `development` |
| FRONTEND_URL | Frontend URL | `http://localhost:3001` |
| CORS_ORIGIN | Allowed CORS origin | `http://localhost:3001` |
| ADMIN_EMAIL | Admin email for seeding | `admin@careerlounge.com` |
| ADMIN_PASSWORD | Admin password for seeding | `Admin@123456` |
| ADMIN_NAME | Admin name for seeding | `Career Lounge Admin` |

## Development

### Running in Watch Mode

```bash
npm run dev
```

Uses `node --watch` for automatic restarts on file changes.

### Production

```bash
npm start
```

## Error Handling

All endpoints return consistent JSON error responses:

```json
{
  "message": "Error description"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## CORS Configuration

The backend is configured to accept requests only from the frontend URL specified in `.env`:

```env
CORS_ORIGIN=http://localhost:3001
```

For production, change this to your deployed frontend URL.

## Rate Limiting

Endpoints are rate-limited to 100 requests per 15 minutes per IP address to prevent abuse.

## License

ISC

## Support

For issues or questions, please contact the development team.

---

**Career Lounge** - Empowering Careers. Enabling Futures. 🚀
