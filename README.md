# Career Lounge - Full Stack Web Application

**Tagline:** "Empowering Careers. Enabling Futures."

A comprehensive full-stack career consulting platform with modern UI, JWT authentication, and real-time booking system.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16+)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

#### 1. Setup Backend

```bash
cd Backend

# Create .env file
cp .env.example .env

# Install dependencies
npm install

# Run development server
npm run dev
```

Backend runs on `http://localhost:5000`

#### 2. Setup Frontend

```bash
cd Frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on `http://localhost:3001`

### 3. Seed Admin User (Optional)

In Backend directory:

```bash
npm run seed
```

This creates an admin user with credentials:
- Email: `admin@careerlounge.com`
- Password: `Admin@123456`

## 📋 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS (Premium theme with navy blue + emerald + gold)
- React Router v6
- Axios for HTTP requests
- react-hot-toast for notifications
- Lucide React for icons

### Backend
- Node.js + Express.js
- MongoDB with Mongoose ORM
- JWT Authentication
- Helmet for security
- Rate limiting
- CORS support

## 📁 Project Structure

```
Career Lounge/
├── Backend/
│   ├── src/
│   │   ├── config/          # Database config
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth & validation
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API endpoints
│   │   ├── seed.js           # Admin seeding
│   │   └── server.js         # Entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── Frontend/
│   ├── src/
│   │   ├── components/       # Navbar, Footer
│   │   ├── context/          # Theme, Auth
│   │   ├── pages/            # All pages
│   │   ├── styles/           # Global CSS
│   │   ├── App.jsx           # Main app
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
└── README.md (This file)
```

## 🎨 Features

### Frontend
✅ Premium corporate design (navy blue + emerald + gold)  
✅ Glassmorphism cards and effects  
✅ Dark/Light mode toggle with system preference  
✅ Fully responsive (mobile-first)  
✅ Smooth animations and transitions  
✅ JWT-based authentication  
✅ Protected routes for users/admins  
✅ Real-time toast notifications  
✅ User Dashboard with booking history  
✅ Admin Dashboard with analytics  

### Backend
✅ RESTful API with clean architecture  
✅ JWT authentication with token expiry  
✅ Role-based access control (User/Admin)  
✅ MongoDB database with Mongoose ORM  
✅ Input validation and error handling  
✅ Security headers (Helmet)  
✅ Rate limiting (100 req/15min per IP)  
✅ CORS support with origin validation  
✅ Admin seeding script  

## 📄 Pages

### Public Pages
- **Home** - Landing page with hero section and CTA
- **About** - Company information and values
- **Services** - Detailed service offerings
- **Contact** - Lead capture form

### Authentication
- **Login** - User sign-in with demo credentials
- **Signup** - New account registration

### User Pages (Authenticated)
- **Book Consultation** - Schedule with time slots
- **Dashboard** - View bookings and history

### Admin Pages (Admin only)
- **Admin Dashboard** - System overview with stats

## 🔐 Authentication

### Login Credentials

**Admin Account:**
```
Email: admin@careerlounge.com
Password: password123
```

**Regular User:**
```
Email: user@careerlounge.com
Password: password123
```

(These are demo credentials. In production, change the admin password in `.env`)

### JWT Token Flow

1. User submits email/password
2. Backend validates and returns JWT token
3. Frontend stores token in localStorage
4. All subsequent requests include token in Authorization header
5. Backend validates token for protected endpoints

## 🌍 API Endpoints

### Auth
```
POST   /api/auth/signup      # Create new user
POST   /api/auth/login       # User login
```

### Leads (Contact Form)
```
POST   /api/leads            # Create lead (public)
GET    /api/leads            # Get all leads (admin)
PATCH  /api/leads/:id        # Update lead status (admin)
```

### Bookings (Consultations)
```
POST   /api/bookings         # Create booking (authenticated)
GET    /api/bookings         # Get all bookings (admin)
GET    /api/bookings/user/my-bookings  # User's bookings
PATCH  /api/bookings/:id     # Update status (admin)
```

### Admin
```
GET    /api/admin/users      # Get all users (admin)
DELETE /api/admin/users/:id  # Delete user (admin)
GET    /api/admin/stats      # System stats (admin)
```

### Health
```
GET    /api/health           # Check backend status
```

## 🗄️ Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  role: String ('user' | 'admin', default: 'user'),
  phone: String,
  timestamps: true
}
```

### Lead Schema
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  service: String (enum),
  message: String,
  status: String ('new' | 'contacted' | 'converted' | 'closed'),
  timestamps: true
}
```

### Booking Schema
```javascript
{
  userId: ObjectId (ref: User),
  name: String (required),
  email: String (required),
  phone: String (required),
  service: String (enum),
  date: Date (required),
  timeSlot: String (required),
  notes: String,
  status: String ('pending' | 'confirmed' | 'completed' | 'cancelled'),
  timestamps: true
}
```

## 🎨 Design System

### Colors
- **Primary**: Navy Blue (`#0284c7`)
- **Accent Emerald**: `#10b981`
- **Accent Gold**: `#f59e0b`
- **Accent Violet**: `#8b5cf6`
- **Dark Mode**: `#111827` to `#1f2937`

### Typography
- **Headings**: Bold, large font sizes
- **Body**: Regular weight, high contrast
- **Buttons**: Font-weight 600, uppercase on hover

### Effects
- **Glassmorphism**: `backdrop-blur-xl` with semi-transparent backgrounds
- **Shadows**: Subtle elevation on hover
- **Animations**: Fade-in, slide-up, pulse effects
- **Transitions**: 300ms ease-in-out

## 🔒 Security Features

- **Helmet.js** - HTTP security headers
- **bcryptjs** - Password hashing (10 salt rounds)
- **JWT** - Stateless authentication
- **Rate Limiting** - 100 requests per 15 minutes
- **CORS** - Restricted to frontend origin
- **Input Validation** - Server-side checks
- **Environment Variables** - Sensitive data in .env

## 📦 Dependencies

### Backend
```json
{
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "express-rate-limit": "^7.1.5",
  "helmet": "^7.1.0",
  "jsonwebtoken": "^9.1.2",
  "mongoose": "^8.0.3"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "lucide-react": "^0.292.0",
  "react-hot-toast": "^2.4.1",
  "tailwindcss": "^3.3.6",
  "vite": "^5.4.21"
}
```

## 🚀 Deployment

### Backend (Heroku / Render)

1. Set environment variables in platform
2. Push to Git
3. Backend auto-deploys

### Frontend (Vercel / Netlify)

1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set environment variable for backend API URL

### Docker Deployment

```bash
# Build images
docker-compose build

# Run services
docker-compose up
```

## 📝 Environment Variables

### Backend (.env)
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

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can sign up
- [ ] User can log in with credentials
- [ ] Authenticated user can book consultation
- [ ] Admin can view all leads and bookings
- [ ] Dark mode toggle works
- [ ] Form validation shows errors
- [ ] Toast notifications appear
- [ ] Protected routes redirect unauthenticated users
- [ ] Admin routes are restricted to admins only

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vite Documentation](https://vitejs.dev)

## 🆘 Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongod`
- Verify `.env` file exists with correct `MONGODB_URI`
- Check port 5000 is available: `netstat -an | grep 5000`

### Frontend won't load
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check backend is running and responding to `/api/health`

### API requests failing
- Verify CORS_ORIGIN in backend `.env` matches frontend URL
- Check Authorization header is being sent (should include "Bearer" token)
- Validate JWT_SECRET is same in .env

### Database connection errors
- Ensure MongoDB service is running
- Check MONGODB_URI syntax is correct
- For Atlas: verify IP whitelist includes your connection IP

## 📞 Support

For issues, questions, or feature requests, please check:
1. Backend README.md
2. Frontend README.md
3. API error messages in console

## 📄 License

ISC

---

**Career Lounge** - Empowering Careers. Enabling Futures. 🎯

Built with ❤️ using React, Node.js, and MongoDB
