# Career Lounge - Frontend

Production-ready React (Vite) frontend for Career Lounge - "Empowering Careers. Enabling Futures."

## Features

✅ **Responsive Design** - Mobile-first approach with Tailwind CSS  
✅ **Dark/Light Mode** - System preference detection with localStorage  
✅ **Authentication** - JWT-based login and signup  
✅ **Protected Routes** - Role-based access control (User/Admin)  
✅ **Consultation Booking** - Calendar with time slots  
✅ **Admin Dashboard** - Manage leads, bookings, and users  
✅ **Toast Notifications** - Real-time user feedback  
✅ **Glassmorphism UI** - Modern design with blur effects  

## Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **react-hot-toast** - Notifications
- **Lucide React** - Icons

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation bar
│   │   └── Footer.jsx       # Footer component
│   ├── context/
│   │   ├── ThemeContext.jsx # Dark/light mode
│   │   └── AuthContext.jsx  # Authentication state
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── About.jsx        # About page
│   │   ├── Services.jsx     # Services page
│   │   ├── Contact.jsx      # Contact form page
│   │   ├── BookConsultation.jsx # Booking page
│   │   ├── Login.jsx        # Login page
│   │   ├── Signup.jsx       # Signup page
│   │   ├── Dashboard.jsx    # User dashboard
│   │   └── AdminDashboard.jsx # Admin dashboard
│   ├── styles/
│   │   └── globals.css      # Global styles
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd Frontend
npm install
```

### 2. Development Server

```bash
npm run dev
```

Server runs on `http://localhost:3001`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Build

```bash
npm run preview
```

## Environment Configuration

The frontend is configured to proxy API requests to the backend:

```js
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

Make sure the backend is running on `http://localhost:5000`

## Pages Overview

### Public Pages
- **Home** - Landing page with hero section and service previews
- **About** - Company information and values
- **Services** - Detailed service descriptions
- **Contact** - Contact form for lead generation
- **Login** - User authentication
- **Signup** - New user registration

### Protected Pages (Authenticated users)
- **Book Consultation** - Schedule a consultation with expert
- **Dashboard** - View bookings and consultation history

### Admin Pages (Admin users only)
- **Admin Dashboard** - Overview with stats, recent leads and bookings

## Authentication

### Login Flow

1. User enters email and password
2. Frontend sends credentials to `/api/auth/login`
3. Backend returns JWT token
4. Token stored in localStorage
5. Token added to axios default headers

### Demo Credentials

```
Admin User:
Email: admin@careerlounge.com
Password: password123

Regular User:
Email: user@careerlounge.com
Password: password123
```

## Styling

### Color Scheme

- **Primary**: Blue (`primary-600`, etc.)
- **Accent Emerald**: Green for highlights
- **Accent Gold**: Yellow for secondary highlights
- **Accent Violet**: Purple for tertiary highlights
- **Dark Mode**: `dark-900`, `dark-800`, etc.

### Custom Classes

```css
.glass               /* Glassmorphism effect */
.btn-primary         /* Primary button */
.btn-secondary       /* Secondary button */
.btn-outline         /* Outline button */
.gradient-text       /* Gradient text effect */
.icon-bg             /* Icon background */
.section-padding     /* Standard section padding */
```

## Components

### Navbar
- Logo with dark/light theme toggle
- Navigation links
- Auth status display (Login/Signup or Dashboard/Logout)
- Mobile menu

### Footer
- Company info
- Service links
- Contact details
- Social media links

### Protected Routes
- Redirect unauthenticated users to login
- Show loading spinner while checking auth state
- Support for admin-only routes

## API Integration

### Authentication

```javascript
// Login
POST /api/auth/login
{ email, password }

// Signup
POST /api/auth/signup
{ name, email, password, phone }
```

### Bookings

```javascript
// Create booking
POST /api/bookings
{ name, email, phone, service, date, timeSlot, notes }

// Get user bookings
GET /api/bookings/user/my-bookings

// Get all bookings (admin)
GET /api/bookings

// Update booking status
PATCH /api/bookings/:id
{ status }
```

### Leads

```javascript
// Create lead
POST /api/leads
{ name, email, phone, service, message }

// Get all leads (admin)
GET /api/leads

// Update lead status
PATCH /api/leads/:id
{ status }
```

## Toast Notifications

Using `react-hot-toast` for real-time feedback:

```javascript
import toast from 'react-hot-toast';

toast.success('Success message');
toast.error('Error message');
toast.loading('Loading...');
```

## Dark Mode

Dark mode is automatically detected from system preferences and can be toggled via the sun/moon icon in the navbar. Preference is saved to localStorage.

## Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Performance

- **Code Splitting** - React Router enables lazy loading
- **Image Optimization** - Lucide icons (SVG)
- **CSS Optimization** - Tailwind CSS purging
- **Build Optimization** - Vite's fast HMR

## Security

- **JWT Tokens** - Secure authentication
- **HTTPS Ready** - Can be deployed securely
- **CORS Protection** - Backend validates origins
- **Input Validation** - Frontend and backend validation

## Deployment

### Vercel / Netlify

```bash
npm run build
# Deploy the dist/ folder
```

### Docker

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Support

For issues or questions, please contact the development team.

---

**Career Lounge** - Empowering Careers. Enabling Futures. 🚀
