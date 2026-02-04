# Career Lounge - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Running Both Services](#running-both-services)
5. [Testing the Application](#testing-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Production Deployment](#production-deployment)

---

## Prerequisites

### System Requirements
- **Node.js** v16 or higher
- **npm** v8 or higher
- **MongoDB** v4.4 or higher (local installation or MongoDB Atlas account)
- **Git** (optional, for version control)

### Installation Verification

Run these commands to verify installations:

```bash
node --version      # Should be v16+
npm --version       # Should be v8+
mongod --version    # Should be v4.4+
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd Backend
```

### Step 2: Create Environment File

```bash
cp .env.example .env
```

### Step 3: Configure Environment Variables

Edit `.env` file with your configuration:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/career-lounge

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3001

# Admin Seeding
ADMIN_EMAIL=admin@careerlounge.com
ADMIN_PASSWORD=Admin@123456
ADMIN_NAME=Career Lounge Admin
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

### Step 4: Install Dependencies

```bash
npm install
```

This installs all required packages:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- helmet
- express-rate-limit
- dotenv

### Step 5: Start MongoDB

#### Option A: Local MongoDB Installation

```bash
mongod
```

#### Option B: Docker Container

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

#### Option C: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env` with your Atlas connection string

### Step 6: Seed Admin User (Optional)

```bash
npm run seed
```

This creates an admin user with credentials from `.env`:
- Email: `admin@careerlounge.com`
- Password: `Admin@123456`

### Step 7: Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
MongoDB Connected: 127.0.0.1
Server is running on port 5000
Environment: development
```

### Verify Backend is Running

Open in browser or curl:
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "Backend is running",
  "timestamp": "2024-02-03T..."
}
```

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd Frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages:
- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- vite
- lucide-react
- react-hot-toast

### Step 3: Verify Configuration

The frontend is configured to proxy API requests:

```js
// vite.config.js - Already configured
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.4.21  ready in 1234 ms

  ➜  Local:   http://localhost:3001/
  ➜  Network: use --host to expose
```

### Verify Frontend is Running

Open browser: `http://localhost:3001`

You should see:
- Career Lounge homepage
- Navbar with logo and navigation
- Hero section with CTA button
- Service cards
- Dark mode toggle

---

## Running Both Services

### Terminal 1: Backend

```bash
cd Backend
npm run dev
```

### Terminal 2: Frontend

```bash
cd Frontend
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

---

## Testing the Application

### 1. Test Public Pages

Visit these pages:
- Home: http://localhost:3001/
- About: http://localhost:3001/about
- Services: http://localhost:3001/services
- Contact: http://localhost:3001/contact

### 2. Test Authentication

**Login (Admin):**
1. Click "Get Started" button
2. Click "Sign in" link
3. Use demo credentials:
   - Email: `admin@careerlounge.com`
   - Password: `password123`
4. Should redirect to Admin Dashboard

**Login (Regular User):**
1. Go to http://localhost:3001/login
2. Use demo credentials:
   - Email: `user@careerlounge.com`
   - Password: `password123`
3. Should redirect to User Dashboard

**Signup:**
1. Go to http://localhost:3001/signup
2. Enter new user details
3. Should create account and auto-login

### 3. Test User Features

1. **Book Consultation:**
   - Login as user
   - Click "Book Consultation" (or navigate to /book-consultation)
   - Fill form and select date/time
   - Submit to create booking

2. **View Dashboard:**
   - After booking, go to User Dashboard
   - Should see booking in list
   - Status shows as "pending"

### 4. Test Admin Features

1. **Admin Dashboard:**
   - Login as admin
   - Should automatically redirect to /admin
   - See stats, recent leads, recent bookings

2. **Manage Leads:**
   - Use Contact form to create a lead
   - Admin should see it in dashboard

3. **Manage Bookings:**
   - Book consultation as user
   - Admin should see it in bookings list

### 5. Test Dark Mode

- Click sun/moon icon in navbar
- Page should switch theme
- Theme preference should persist on refresh

### 6. Test Responsive Design

- Resize browser window to mobile size (375px)
- Mobile menu should appear
- All elements should be readable
- Forms should be usable

### 7. Test Error Handling

- Try submitting forms with empty fields
- Try invalid email format
- Try logging in with wrong password
- Should show error toast notifications

---

## Troubleshooting

### Backend Issues

#### Problem: "Cannot find module 'mongoose'"
**Solution:**
```bash
cd Backend
npm install
```

#### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

Or change PORT in `.env`:
```env
PORT=5001
```

#### Problem: "MongoDB connection refused"
**Solution:**
- Check MongoDB is running: `mongod`
- If using Atlas, verify `MONGODB_URI` in `.env`
- Check firewall isn't blocking port 27017

#### Problem: "JWT_SECRET not set"
**Solution:**
- Verify `.env` file exists in Backend directory
- Add `JWT_SECRET=your_secret_key` to `.env`

### Frontend Issues

#### Problem: "Cannot find module 'react'"
**Solution:**
```bash
cd Frontend
npm install
```

#### Problem: "Port 3001 already in use"
**Solution:**
```bash
# Change in vite.config.js
server: {
  port: 3002,  // Use different port
}
```

#### Problem: "API requests failing (404 or network error)"
**Solution:**
- Verify backend is running on port 5000
- Check CORS_ORIGIN in backend `.env`
- Verify proxy configuration in `vite.config.js`

#### Problem: "Cannot read property 'message' of undefined"
**Solution:**
- Check backend is responding: `curl http://localhost:5000/api/health`
- Clear browser cache and localStorage
- Restart both services

### Database Issues

#### Problem: "No database selected"
**Solution:**
```bash
mongosh
use career-lounge
db.users.find()
```

#### Problem: "Authentication failed"
**Solution:**
- If using Atlas, verify connection string format
- Check username/password in connection string
- Verify IP whitelist includes your IP

#### Problem: "Write concern error"
**Solution:**
- Ensure MongoDB has a replica set configured
- Or use `w: 1` in Mongoose options

---

## Production Deployment

### Backend Deployment (Heroku)

1. **Create Heroku account** and install CLI
2. **Prepare for production:**
   ```bash
   # Change NODE_ENV
   NODE_ENV=production
   
   # Use secure JWT_SECRET
   JWT_SECRET=your_very_long_random_secret_key_here
   
   # Use MongoDB Atlas connection
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/career-lounge
   ```

3. **Deploy:**
   ```bash
   heroku login
   heroku create career-lounge-backend
   heroku config:set JWT_SECRET="your_secret"
   heroku config:set MONGODB_URI="your_atlas_uri"
   git push heroku main
   ```

### Frontend Deployment (Vercel)

1. **Prepare build:**
   ```bash
   npm run build
   ```

2. **Deploy with Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Configure environment:**
   - Set API backend URL in environment variables
   - Update `VITE_API_URL` if needed

### Docker Deployment

1. **Create docker-compose.yml:**
   ```yaml
   version: '3.8'
   services:
     mongodb:
       image: mongo:latest
       ports:
         - "27017:27017"
     backend:
       build: ./Backend
       ports:
         - "5000:5000"
       environment:
         - MONGODB_URI=mongodb://mongodb:27017/career-lounge
         - JWT_SECRET=your_secret
     frontend:
       build: ./Frontend
       ports:
         - "3001:3001"
   ```

2. **Run:**
   ```bash
   docker-compose up
   ```

---

## Production Checklist

- [ ] Change JWT_SECRET to secure random string
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas or secure database
- [ ] Update CORS_ORIGIN to production domain
- [ ] Update FRONTEND_URL to production domain
- [ ] Change admin password in database
- [ ] Enable HTTPS/SSL
- [ ] Setup error logging
- [ ] Configure backup strategy
- [ ] Setup monitoring and alerts
- [ ] Test all features in production environment
- [ ] Setup CI/CD pipeline
- [ ] Document deployment process

---

## Support & Resources

### Documentation
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

### Useful Commands

```bash
# Backend
npm run dev          # Start development server
npm run start        # Start production server
npm run seed         # Create admin user

# Frontend
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build

# MongoDB
mongosh              # Start MongoDB shell
show dbs             # List all databases
use career-lounge    # Switch database
db.users.find()      # List users
```

### Getting Help

1. Check error messages in console
2. Review Backend and Frontend README files
3. Check MongoDB connection status
4. Verify all environment variables
5. Clear cache and restart services

---

## Summary

You now have a complete full-stack Career Lounge application!

**Frontend:** Modern React app with dark mode, authentication, and responsive design  
**Backend:** Secure Node.js API with MongoDB database  
**Features:** User auth, booking system, admin dashboard, and more

Happy coding! 🚀

---

**Career Lounge** - Empowering Careers. Enabling Futures.
