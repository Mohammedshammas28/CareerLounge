# Welcome to Career Lounge! 🎯

**Empowering Careers. Enabling Futures.**

A production-ready full-stack career consulting platform built with React, Node.js, and MongoDB.

## 🚀 Quick Start (2 Steps)

### 1. Verify Installation
```bash
verify-setup.bat
```

### 2. Start Services
```bash
# Terminal 1 - Backend
cd Backend
npm install
npm run dev

# Terminal 2 - Frontend
cd Frontend
npm install
npm run dev
```

**Access:** http://localhost:3001

---

## 📖 Documentation

Read these files in order:

1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - What was built (READ FIRST!)
2. **[README.md](README.md)** - Project overview
3. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick commands
4. **[SETUP.md](SETUP.md)** - Detailed setup guide
5. **[Backend/README.md](Backend/README.md)** - API documentation
6. **[Frontend/README.md](Frontend/README.md)** - Frontend guide

---

## 🔐 Demo Credentials

Use these to login and test:

```
Admin User:
Email: admin@careerlounge.com
Password: password123

Regular User:
Email: user@careerlounge.com
Password: password123
```

---

## 📁 Project Structure

```
Career Lounge/
├── Backend/              # Node.js + Express + MongoDB API
├── Frontend/             # React + Vite + Tailwind CSS
├── README.md            # Main overview
├── PROJECT_SUMMARY.md   # Complete project details
├── SETUP.md             # Setup instructions
├── QUICK_REFERENCE.md   # Quick reference guide
├── verify-setup.bat     # Installation verification
└── INDEX.md             # This file
```

---

## 🎯 What's Included

### Frontend Features
✅ 9 pages (Home, About, Services, Contact, Login, Signup, Dashboard, Admin, Book)  
✅ Dark/Light mode with system preference  
✅ JWT authentication  
✅ Protected user and admin routes  
✅ Responsive design (mobile-first)  
✅ Premium UI with animations  
✅ Form validation  
✅ Toast notifications  

### Backend Features
✅ REST API (13 endpoints)  
✅ JWT authentication  
✅ MongoDB database  
✅ Role-based access control  
✅ Lead management  
✅ Booking system  
✅ Admin dashboard  
✅ Security: Helmet, Rate limiting, CORS  

### Database
✅ 3 models (User, Lead, Booking)  
✅ Password hashing  
✅ Timestamps on all records  
✅ Proper indexing  

---

## 🎨 Technology Stack

### Frontend
- React 18
- Vite 5
- Tailwind CSS 3
- React Router 6
- Axios
- react-hot-toast
- Lucide React icons

### Backend
- Node.js
- Express 4
- MongoDB
- Mongoose 8
- JWT
- bcryptjs
- Helmet
- CORS

---

## 📊 API Endpoints

**Auth:** 2 endpoints (signup, login)  
**Leads:** 3 endpoints (create, get, update)  
**Bookings:** 4 endpoints (create, get, get-user, update)  
**Admin:** 3 endpoints (users, stats, delete)  
**Health:** 1 endpoint (status)  

**Total: 13 endpoints**

---

## 🔧 System Requirements

- Node.js v16+ ✅
- npm v8+ ✅
- MongoDB v4.4+ (local or Atlas)
- Modern web browser

---

## 📱 Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3001 |
| Backend API | http://localhost:5000 |
| API Health | http://localhost:5000/api/health |

---

## 🧪 Testing Checklist

- [ ] Frontend loads at localhost:3001
- [ ] Backend responds at localhost:5000/api/health
- [ ] Can signup with new account
- [ ] Can login with demo credentials
- [ ] Can book consultation (authenticated)
- [ ] Can view bookings in dashboard
- [ ] Admin dashboard accessible (admin only)
- [ ] Dark mode toggle works
- [ ] Mobile responsive (resize browser)
- [ ] Forms validate properly
- [ ] Toast notifications appear

---

## 🚀 Next Steps

1. **Run verification script:**
   ```bash
   verify-setup.bat
   ```

2. **Read PROJECT_SUMMARY.md** for complete details

3. **Follow SETUP.md** for step-by-step instructions

4. **Start both services:**
   - Backend: `cd Backend && npm run dev`
   - Frontend: `cd Frontend && npm run dev`

5. **Access the app:** http://localhost:3001

6. **Test with demo credentials**

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| PROJECT_SUMMARY.md | Complete project documentation |
| README.md | Project overview and features |
| SETUP.md | Detailed setup and troubleshooting |
| QUICK_REFERENCE.md | Quick commands and reference |
| Backend/README.md | Backend API documentation |
| Frontend/README.md | Frontend setup guide |
| Backend/.env.example | Backend environment template |
| verify-setup.bat | Installation verification script |

---

## ⚙️ Environment Setup

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
```

### Frontend
Auto-configured to proxy `/api` to backend on port 5000.

---

## 🆘 Having Issues?

1. **Check SETUP.md** - Troubleshooting section
2. **Run verify-setup.bat** - Verify dependencies
3. **Check console errors** - Browser dev tools
4. **Check terminal output** - Backend logs
5. **Clear cache** - Browser cache and localStorage
6. **Restart services** - Stop and start again

---

## 🎓 Learning Path

1. Explore project structure in Backend and Frontend directories
2. Read API documentation in Backend/README.md
3. Review frontend components in Frontend/src
4. Check SETUP.md for deployment options
5. Deploy to production when ready

---

## 📝 Configuration Files

- **vite.config.js** - Vite bundler config (Frontend)
- **tailwind.config.js** - Tailwind CSS theme (Frontend)
- **postcss.config.js** - PostCSS plugins (Frontend)
- **package.json** - Dependencies and scripts (Backend & Frontend)
- **.env.example** - Environment template (Backend)

---

## 🔐 Security Features

✅ JWT authentication  
✅ Password hashing (bcryptjs)  
✅ Helmet security headers  
✅ CORS validation  
✅ Rate limiting  
✅ Input validation  
✅ Environment variables  
✅ Role-based access control  

---

## 📈 Performance

✅ Vite for fast builds  
✅ Tailwind CSS optimization  
✅ Lazy loading routes  
✅ Efficient database queries  
✅ Minified production builds  

---

## 🎯 Project Goals Met

✅ Complete full-stack application  
✅ Modern responsive UI  
✅ Secure authentication system  
✅ Database integration  
✅ Admin dashboard  
✅ Booking system  
✅ Lead management  
✅ Comprehensive documentation  
✅ Production-ready code  
✅ Demo credentials for testing  

---

## 📞 Support

- Check README.md for overview
- Check SETUP.md for detailed instructions
- Check QUICK_REFERENCE.md for quick help
- Check Backend/README.md for API docs
- Check Frontend/README.md for frontend guide

---

## 📜 File Summary

**Total Files Created: 60+**

- Backend: 22 files
- Frontend: 23 files
- Root documentation: 6 files
- Configuration: 5 files

---

## 🎉 Ready to Go!

Everything is set up and ready to use. Follow SETUP.md for detailed instructions, or use QUICK_REFERENCE.md for quick commands.

**Start with:**
1. Read PROJECT_SUMMARY.md
2. Run verify-setup.bat
3. Follow SETUP.md steps
4. Access http://localhost:3001

---

**Career Lounge** - Empowering Careers. Enabling Futures. 🚀

Status: ✅ Production Ready  
Version: 1.0.0  
Built: February 3, 2026
