# Deployment Guide for Career Lounge

## Frontend Deployment (Vercel)

### Steps:
1. Go to https://vercel.com and sign in with GitHub
2. Click "Import Project"
3. Select your CareerLounge repository
4. Configure:
   - **Framework**: Vite
   - **Build Command**: npm run build
   - **Output Directory**: dist
5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
6. Click "Deploy"

**Your frontend will be live at**: `https://your-project.vercel.app`

---

## Backend Deployment Options

### Option A: Render.com

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: career-lounge-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (for testing) or Starter (for production)
5. Add Environment Variables in Render dashboard:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   CORS_ORIGIN=https://your-frontend.vercel.app
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ADMIN_EMAIL=your_admin_email@gmail.com
   ADMIN_PASSWORD=your_admin_password
   ADMIN_NAME=Your Name
   ```
6. Click "Create Web Service"

**Your backend will be live at**: `https://career-lounge-backend.onrender.com`

---

### Option B: Railway.app

1. Go to https://railway.app and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your CareerLounge repository
4. Railway will auto-detect the backend
5. Add Environment Variables in Railway:
   - Go to Variables tab and add all the same environment variables as above
6. Railway will auto-deploy

**Your backend will be live at**: `https://careerlounge-production.up.railway.app` (or similar)

---

## Post-Deployment Steps

1. **Update Frontend Environment Variable**:
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Update `VITE_API_URL` with your backend URL

2. **Test the APIs**:
   - Try logging in from deployed frontend
   - Create a test booking
   - Verify emails are being sent

3. **Monitor Logs**:
   - **Vercel**: Deployments tab → Logs
   - **Render**: Dashboard → Logs
   - **Railway**: Logs section

---

## Recommendation

**For Production**: Use **Render** or **Railway** - both are reliable and have free tier options to start.

**Quick comparison**:
| Feature | Render | Railway |
|---------|--------|---------|
| Free tier | Yes | Yes ($5 credit) |
| Ease of use | Very easy | Very easy |
| Uptime | 99.9% | 99.9% |
| Support | Good | Good |
| Scaling | Good | Good |

---

## Troubleshooting

If deployment fails:
1. Check build logs in your deployment platform
2. Ensure all environment variables are set correctly
3. Verify MongoDB connection string is correct
4. Check CORS is configured for your frontend URL
5. Ensure your GitHub repo has all necessary files

---

## Database (MongoDB Atlas)

Your MongoDB Atlas connection is already configured. No changes needed unless you want to upgrade the cluster size.

Connection String Format:
```
mongodb+srv://username:password@cluster.mongodb.net/database?appName=Cluster0
```

This is already set in your `.env` files.
