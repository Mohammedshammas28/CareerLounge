# Career Lounge Page Structure & Implementation Guide

## Standard Page Structure

All pages follow this consistent structure:

```jsx
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const PageName = () => {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />
      
      {/* Page Content Sections */}
      <section className="section section-dark">
        {/* Content */}
      </section>
      
      <section className="section section-alt">
        {/* Content */}
      </section>
      
      <Footer />
    </div>
  );
};
```

## Page-by-Page Structure

### 1. HOME PAGE (`Home.jsx`)

**Structure**:
1. Hero Section (section-dark)
   - Accent line divider
   - Large headline ("Shape Your Future, Achieve Your Goals")
   - Subtitle paragraph
   - Primary CTA button

2. Stats Section (section-alt)
   - Title: "Why Choose Career Lounge?"
   - Grid of 4 stat cards
   - Each with: large number, label, icon

3. Services Preview Section (section-dark)
   - Title: "Our Core Services"
   - Grid of 4 service cards
   - Each with: icon, title, description, "Learn More" link

4. Testimonials Section (section-alt)
   - Title: "Success Stories"
   - Carousel of 3+ testimonial cards
   - Each with: quote, name, role, image

5. CTA Banner (section-dark)
   - Title: "Ready to Start Your Journey?"
   - Subtitle
   - Large primary button
   - Alternative secondary button

**Key Classes Used**:
- `.section-dark` / `.section-alt` - Section background
- `.section-title` - Main heading
- `.section-subtitle` - Descriptive text
- `.accent-line` - Gold divider
- `.stat-number` - Large stat value
- `.stat-label` - Stat description
- `.card-elevated` - Service/testimonial cards
- `.btn btn-primary` - Call-to-action buttons

---

### 2. SERVICES PAGE (`Services.jsx`)

**Structure**:
1. Hero Section (section-dark)
   - Accent line divider
   - Title: "Our Services"
   - Subtitle about comprehensive approach

2. Services Grid (section-alt)
   - Title: "Complete Consulting Solutions"
   - Grid of 4 service cards (md:grid-cols-2)
   - Each card contains:
     - Icon container (w-12 h-12, bg-gold-400/10, text-gold-400)
     - Service title (h3, text-ivory, font-semibold)
     - Service description paragraph
     - Bullet list of key features
     - "Learn More" link

3. CTA Section (section-dark)
   - Title: "Ready to Take the Next Step?"
   - Subtitle
   - Primary booking button

**Key Pattern**:
```jsx
<div className="card-elevated">
  <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400 group-hover:bg-gold-400/20 transition">
    <IconComponent size={20} />
  </div>
  <h3 className="text-ivory font-semibold mt-4">{service.name}</h3>
  <p className="text-slate-400 mt-2">{service.description}</p>
  <ul className="space-y-2 mt-4">
    {service.features.map(feature => (
      <li key={feature} className="flex items-center gap-3">
        <span className="text-gold-400">•</span>
        <span className="text-slate-300">{feature}</span>
      </li>
    ))}
  </ul>
</div>
```

---

### 3. ABOUT PAGE (`About.jsx`)

**Structure**:
1. Hero Section (section-dark)
   - Accent line
   - Title: "Empowering Futures, Globally"
   - Subtitle

2. Mission Section (section-alt)
   - Title: "Our Mission"
   - Text describing mission
   - Mission benefits grid (4 items with Check icons)
   - Stats card showing "10+ Years of Excellence"

3. Values Section (section-dark)
   - Title: "Our Core Values"
   - Grid of 4 value cards (Excellence, Integrity, Empowerment, Innovation)
   - Each with: title, description, icon

4. Why Choose Us Section (section-alt)
   - Title: "Why Choose Career Lounge?"
   - Grid of 4 value proposition cards
   - Each with: title, detailed description

5. CTA Section (section-dark)
   - Closing message
   - Primary button

**Key Classes**:
- Card structure with Check icons for benefits
- `.card-elevated` for value cards
- Grid layouts with `md:grid-cols-4` for values

---

### 4. CONTACT PAGE (`Contact.jsx`)

**Structure**:
1. Hero Section (section-dark)
   - Accent line
   - Title: "Get In Touch"
   - Subtitle about connecting

2. Contact Info Cards (section-alt)
   - 3 cards in a row: Email, Phone, Location
   - Each with: icon, title, info text, secondary note
   - Hover effect: bg-gold-400/20

3. Two-Column Form Section (section-alt)
   - Left: Contact form
   - Right: Info cards (Business Hours, Why Choose Us)

4. Contact Form Details
   - Name field
   - Email field
   - Phone field
   - Service dropdown
   - Message textarea
   - Submit button (`.btn btn-primary w-full`)

5. Info Cards on Right
   - Business Hours card (`.card-premium`)
   - Why Choose Us list (`.card-elevated`)

6. CTA Footer Section (section-dark)
   - "Can't find what you're looking for?"
   - Schedule consultation button

**Pattern**:
```jsx
<div className="grid md:grid-cols-2 gap-12">
  {/* Left: Form */}
  <form className="space-y-6">
    {/* Form fields */}
  </form>
  
  {/* Right: Info Cards */}
  <div className="space-y-8">
    <div className="card-premium">
      {/* Business Hours */}
    </div>
    <div className="card-elevated">
      {/* Why Choose Us */}
    </div>
  </div>
</div>
```

---

### 5. BOOK CONSULTATION PAGE (`BookConsultation.jsx`)

**Structure**: Multi-Step Form Wizard

1. Step Indicator (Top)
   - 3 numbered circles (1, 2, 3)
   - Lines between them (gray by default, gold when completed)
   - Check icon when step is completed

2. Step 1: Service Selection (section-alt)
   - Title: "Choose Your Service"
   - 4 service buttons (border-based selection)
   - Selected: border-gold-400, bg-gold-400/10
   - Each shows: title and description
   - Continue button

3. Step 2: Date & Time Selection (section-alt)
   - Title: "Select Date & Time"
   - Date input (native date picker)
   - Time slot grid (3 columns of buttons)
   - Selected slot: border-gold-400, bg-gold-400/10, text-gold-400
   - Back and Continue buttons

4. Step 3: Personal Details (section-alt)
   - Title: "Your Details"
   - Name field
   - Email field
   - Phone field
   - Notes textarea
   - Back and Complete Booking buttons

5. Step 4: Confirmation Screen (section-alt)
   - Success icon (Check icon in circle)
   - Confirmation message
   - Booking summary in dark box
   - Auto-redirect countdown

**Key Pattern**:
```jsx
const [step, setStep] = useState(1);

return (
  {step === 1 && <StepOneContent />}
  {step === 2 && <StepTwoContent />}
  {step === 3 && <StepThreeContent />}
  {step === 4 && <ConfirmationContent />}
);
```

---

### 6. LOGIN PAGE (`Login.jsx`)

**Structure**:
1. Centered Card Layout (section)
   - Min height: min-h-[calc(100vh-80px)] for centering
   - Card type: `.card-premium`

2. Card Header
   - Logo (w-12 h-12, gold gradient background)
   - Title: "Welcome Back"
   - Subtitle: "Sign in to your account"

3. Demo Credentials Box
   - Gold accent background (bg-gold-400/10, border-gold-400/30)
   - Admin email, user email, password
   - Muted gold text color

4. Login Form
   - Email input
   - Password input with toggle button (Eye/EyeOff icons)
   - Submit button (`.btn btn-primary w-full`)

5. Footer Links
   - Sign up link
   - Guest login button (`.btn btn-ghost w-full`)
   - Divider line between sections

**Key Classes**:
- Centered with: flex items-center justify-center min-h-[calc(100vh-80px)]
- Card: `.card-premium`
- Demo box: bg-gold-400/10, border border-gold-400/30

---

### 7. SIGNUP PAGE (`Signup.jsx`)

**Structure**: Similar to login but with additional features

1. Card Header (same as login)
   - Logo, title, subtitle

2. Signup Form
   - Full name field
   - Email field
   - Phone field
   - Password field with:
     - Toggle button (Eye/EyeOff)
     - Strength meter (5-level visual indicator)
     - Requirements checklist:
       - ✓ 8+ characters
       - ✓ Mix of uppercase/lowercase
       - ✓ At least one number

3. Password Strength Visualization
   ```jsx
   // Color progression: red → yellow → gold
   {passwordStrength <= 2 && 'bg-red-500'}
   {passwordStrength === 3 && 'bg-yellow-500'}
   {passwordStrength >= 4 && 'bg-gold-400'}
   ```

4. Form Footer
   - Submit button (disabled if passwordStrength < 3)
   - Sign in link

5. Trust Indicators (Below card)
   - 3-column grid: 500+ members, 10+ years, 95% satisfaction
   - Gold numbers, muted gray text

**Key Pattern**:
```jsx
<div className="mt-3 space-y-2">
  <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
    Requirements:
  </p>
  <div className="flex items-center gap-2 text-xs text-slate-400">
    <span className={formData.password.length >= 8 ? 'text-gold-400' : ''}>
      {formData.password.length >= 8 && <Check size={14} />}
    </span>
    <span>At least 8 characters</span>
  </div>
</div>
```

---

### 8. DASHBOARD PAGE (`Dashboard.jsx`)

**Structure**: Sidebar + Main Content Layout

1. Sidebar (Left)
   - Width: w-64
   - Background: bg-charcoal-900
   - Border: border-r border-slate-700/50
   
   Contents:
   - User profile section
     - Avatar (initial letter in circle)
     - User name
     - Email
   - Navigation tabs
     - Overview
     - My Bookings
     - Profile Settings
   - Action buttons
     - New Booking (`.btn btn-primary`)
     - Sign Out (`.btn btn-outline`)

2. Main Content (Right)
   - Flex-1 width, p-8 padding
   - Conditional rendering based on activeTab

3. Overview Tab Content
   - Welcome message
   - 3 stat cards (Total, Confirmed, Pending)
   - Recent bookings preview grid

4. My Bookings Tab Content
   - Title with "New Booking" button
   - List of booking cards
   - Each card shows: service, date, time, status, notes

5. Profile Settings Tab Content
   - 2-column grid
   - Left: Personal information display
   - Right: Account actions (Change Password, Download History)

**Key Pattern**:
```jsx
<div className="flex">
  <aside className="w-64 bg-charcoal-900 border-r border-slate-700/50">
    {/* Sidebar content */}
  </aside>
  
  <main className="flex-1 p-8">
    {activeTab === 'overview' && <OverviewContent />}
    {activeTab === 'bookings' && <BookingsContent />}
    {activeTab === 'profile' && <ProfileContent />}
  </main>
</div>
```

---

### 9. ADMIN DASHBOARD PAGE (`AdminDashboard.jsx`)

**Structure**: Sidebar + Tabbed Interface (similar to Dashboard)

1. Sidebar (Left)
   - Navigation tabs: Overview, Leads, Bookings
   - Admin panel title

2. Overview Tab
   - 4 stat cards (Total Users, Admin Users, Leads, Bookings)
   - Each with: metric, icon, trend indicator
   - Recent leads table (compact)
   - Recent bookings table (compact)

3. Leads Tab
   - Full-width leads data table
   - Columns: Name, Email, Service, Phone, Status, Action
   - Filter button
   - Eye icon for viewing details
   - Alternating row backgrounds

4. Bookings Tab
   - Full-width bookings data table
   - Filter buttons (All, Confirmed, Pending)
   - Columns: Name, Service, Date & Time, Email, Status, Action
   - Color-coded status badges
   - Alternating row backgrounds

**Table Pattern**:
```jsx
<table className="w-full text-sm">
  <thead className="border-b border-slate-700/50">
    <tr className="text-slate-400 text-xs uppercase tracking-widest">
      <th className="text-left py-3 px-4">Column Name</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, idx) => (
      <tr key={item._id} className={idx % 2 === 0 ? 'bg-slate-900/20' : ''}>
        <td className="py-3 px-4 text-ivory">{item.name}</td>
      </tr>
    ))}
  </tbody>
</table>
```

---

## Reusable Patterns

### Section Heading Pattern
```jsx
<section className="section section-dark">
  <div className="container-max">
    <div className="accent-line mb-4"></div>
    <h2 className="section-title">Section Title</h2>
    <p className="section-subtitle">Descriptive subtitle text</p>
    
    {/* Section content */}
  </div>
</section>
```

### Card Grid Pattern
```jsx
<div className="grid md:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id} className="card-elevated">
      <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400">
        <IconComponent size={20} />
      </div>
      <h3 className="text-ivory font-semibold mt-4">{item.title}</h3>
      <p className="text-slate-400 mt-2">{item.description}</p>
    </div>
  ))}
</div>
```

### Form Field Pattern
```jsx
<div>
  <label className="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
    Field Label
  </label>
  <input
    type="text"
    placeholder="Placeholder text"
    className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 
              text-ivory placeholder-slate-500 
              focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition"
  />
</div>
```

### Button Group Pattern
```jsx
<div className="flex gap-4">
  <button className="btn btn-primary flex-1">Primary Action</button>
  <button className="btn btn-outline flex-1">Secondary Action</button>
</div>
```

### Info Card Pattern
```jsx
<div className="card-elevated group">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400 group-hover:bg-gold-400/20 transition">
      <IconComponent size={20} />
    </div>
  </div>
  <h3 className="text-ivory font-semibold mb-2">Title</h3>
  <p className="text-slate-400 text-sm mb-3">Main content</p>
  <p className="text-slate-500 text-xs">Secondary info</p>
</div>
```

---

## Common Implementation Checklist

When adding new pages or sections, ensure:

- [ ] Page is wrapped in `<div className="min-h-screen bg-navy-950">`
- [ ] Navbar and Footer are included
- [ ] Sections use `.section`, `.section-dark`, or `.section-alt`
- [ ] Content uses `.container-max` for max width
- [ ] Headings use `.section-title` and `.section-subtitle` classes
- [ ] Dividers use `.accent-line` before headings
- [ ] Cards use `.card-elevated` or `.card-premium`
- [ ] Icons are from lucide-react with proper sizing
- [ ] Icon containers use `w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400`
- [ ] Buttons use `.btn` with appropriate variant (primary, outline, ghost)
- [ ] Form inputs follow the standardized input pattern
- [ ] Text colors use ivory, slate-300, or slate-400
- [ ] All interactive elements have hover states
- [ ] Responsive breakpoints are used (md:, lg:, etc.)
- [ ] No hardcoded colors - all Tailwind classes
- [ ] Proper accessibility attributes (labels, alt text, etc.)

---

## Summary

All Career Lounge pages follow a consistent structure using:
- **Hero/intro sections** with accent lines and titles
- **Content grids** with card-elevated components
- **Sidebar navigation** for dashboard-style pages
- **Multi-column layouts** for information presentation
- **Standardized form fields** with focus states
- **Professional color scheme** (navy, gold, slate, ivory)
- **Responsive design** that works on all devices

This ensures a cohesive, professional appearance across the entire application.
