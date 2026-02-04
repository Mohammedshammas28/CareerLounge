# Career Lounge - Quick Reference

## 🚀 Quick Start Commands

### Start Backend
```bash
cd Backend
cp .env.example .env        # First time only
npm install                 # First time only
npm run dev
```

### Start Frontend
```bash
cd Frontend
npm install                 # First time only
npm run dev
```

### Seed Admin User (First Time)
```bash
cd Backend
npm run seed
```

## 🔗 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3001 |
| Backend API | http://localhost:5000 |
| API Health | http://localhost:5000/api/health |

## 👤 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@careerlounge.com | password123 |
| User | user@careerlounge.com | password123 |

## 📁 Key Files

### Backend
```
Backend/
├── src/
│   ├── server.js              # Main server file
│   ├── seed.js                # Admin creation
│   ├── config/database.js     # MongoDB connection
│   ├── models/                # Database schemas
│   ├── controllers/           # Business logic
│   ├── routes/                # API endpoints
│   └── middleware/auth.js     # JWT validation
├── .env.example               # Environment template
├── package.json               # Dependencies
└── README.md                  # Backend docs
```

### Frontend
```
Frontend/
├── src/
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   ├── components/            # Navbar, Footer
│   ├── context/               # Theme, Auth state
│   ├── pages/                 # All pages
│   └── styles/globals.css     # Global styles
├── index.html                 # HTML template
├── vite.config.js             # Vite config
├── tailwind.config.js         # Tailwind config
├── package.json               # Dependencies
└── README.md                  # Frontend docs
```

## 📄 Pages & Routes

### Public Pages
- `/` - Home
- `/about` - About
- `/services` - Services
- `/contact` - Contact

### Auth Pages
- `/login` - Login
- `/signup` - Signup

### User Pages (Protected)
- `/book-consultation` - Book appointment
- `/dashboard` - User dashboard

### Admin Pages (Admin only)
- `/admin` - Admin dashboard

## 🔐 Authentication Flow

1. User submits credentials on Login/Signup
2. Backend validates and returns JWT token
3. Frontend stores token in localStorage
4. Token added to axios default Authorization header
5. All API requests include token automatically

## 📊 API Endpoints Quick Reference

### Auth
```
POST /api/auth/login      { email, password }
POST /api/auth/signup     { name, email, password, phone }
```

### Leads
```
POST /api/leads           { name, email, phone, service, message }
GET /api/leads            (admin only)
PATCH /api/leads/:id      { status }
```

### Bookings
```
POST /api/bookings        { name, email, phone, service, date, timeSlot, notes }
GET /api/bookings         (admin only)
GET /api/bookings/user/my-bookings
PATCH /api/bookings/:id   { status }
```

### Admin
```
GET /api/admin/stats
GET /api/admin/users      (admin only)
DELETE /api/admin/users/:id (admin only)
```

## 🎨 Design Colors

| Element | Color | Hex |
|---------|-------|-----|
| Primary | Blue | #0284c7 |
| Emerald | Green | #10b981 |
| Gold | Yellow | #f59e0b |
| Violet | Purple | #8b5cf6 |
| Dark BG | Gray | #111827 |

## 🛠️ Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/career-lounge
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3001
ADMIN_EMAIL=admin@careerlounge.com
ADMIN_PASSWORD=Admin@123456
ADMIN_NAME=Career Lounge Admin
```

## 📦 Key Dependencies

### Backend
- express (Web framework)
- mongoose (MongoDB ORM)
- jsonwebtoken (JWT auth)
- bcryptjs (Password hashing)
- helmet (Security)
- cors (Cross-origin)

### Frontend
- react (UI library)
- react-router-dom (Routing)
- axios (HTTP client)
- tailwindcss (Styling)
- vite (Build tool)
- react-hot-toast (Notifications)
- lucide-react (Icons)

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in .env or stop other service |
| MongoDB connection error | Start MongoDB: `mongod` |
| API 404 errors | Verify backend is running on 5000 |
| Auth fails | Check JWT_SECRET in .env |
| CSS not loading | Check tailwind.config.js and postcss.config.js |
| CORS errors | Update CORS_ORIGIN in backend .env |

## 🔄 Development Workflow

1. **Start Services**
   - Backend in Terminal 1: `npm run dev`
   - Frontend in Terminal 2: `npm run dev`

2. **Make Changes**
   - Edit files in src/
   - Hot reload automatic

3. **Test Changes**
   - Frontend: http://localhost:3001
   - Backend: http://localhost:5000/api/health

4. **Check Console**
   - Browser console for frontend errors
   - Terminal output for backend logs

## 🧪 Testing Workflow

1. **Test Signup**
   - Go to /signup
   - Create new account
   - Should auto-login to dashboard

2. **Test Login**
   - Go to /login
   - Use admin or user credentials
   - Verify redirect to correct dashboard

3. **Test Booking** (as user)
   - Click "Book Consultation"
   - Fill form and select date
   - Check booking appears in dashboard

4. **Test Admin** (as admin)
   - Login with admin account
   - Check admin dashboard loads
   - Verify leads and bookings visible

5. **Test Dark Mode**
   - Click theme toggle
   - Verify theme switches
   - Check persistence on refresh

## 📱 Responsive Breakpoints

- Mobile: < 768px (Tailwind: `max-w-sm`)
- Tablet: 768px - 1024px (Tailwind: `md:`)
- Desktop: > 1024px (Tailwind: `lg:`, `xl:`)

## 🚀 Production Checklist

- [ ] Change JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas
- [ ] Update CORS_ORIGIN
- [ ] Enable HTTPS
- [ ] Setup error logging
- [ ] Configure backups
- [ ] Test in production environment

## 📚 Documentation Files

- `README.md` - Main project overview
- `SETUP.md` - Detailed setup guide
- `Backend/README.md` - Backend API docs
- `Frontend/README.md` - Frontend docs
- `Backend/.env.example` - Environment template

## 🆘 Need Help?

1. Check relevant README file (Backend, Frontend, or main)
2. Review SETUP.md for detailed instructions
3. Check console output for error messages
4. Verify all services are running
5. Clear browser cache and localStorage

## 📞 Quick Commands

```bash
# Backend
cd Backend && npm run dev       # Start backend
cd Backend && npm run seed      # Create admin
cd Backend && npm start         # Production mode

# Frontend
cd Frontend && npm run dev      # Start frontend
cd Frontend && npm run build    # Build for production
cd Frontend && npm run preview  # Preview build

# Database
mongosh                         # Open MongoDB shell
npm install                     # Install dependencies
npm update                      # Update dependencies
```

---

**Career Lounge** - Empowering Careers. Enabling Futures. 🎯
