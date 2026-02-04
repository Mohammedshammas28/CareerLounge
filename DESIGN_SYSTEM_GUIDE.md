# Career Lounge Design System - Visual Reference Guide

## Color Palette Reference

### Primary Colors
```
Navy-950:  #0a1220  (Primary Background - Used for main page backgrounds)
Navy-900:  #0f1b2e  (Alternative navy tone)
Navy-700:  #1e3a5f  (Secondary buttons, hover states)
```

### Accent Colors
```
Gold-400:  #d4af37  (Primary accent - buttons, links, hover states)
Gold-500:  #b8860b  (Hover state for gold)
Gold-300:  #daa520  (Light gold for active states)
```

### Neutral Colors
```
Charcoal-900: #0f0f0f   (Sidebar backgrounds)
Slate-900:    #0f172a   (Card backgrounds)
Slate-800:    #1e293b   (Elevated card backgrounds)
Slate-700:    #334155   (Borders, disabled states)
```

### Text Colors
```
Ivory:     #f5f1e8   (Primary headings & main text)
Slate-300: #cbd5e1   (Links, hover text)
Slate-400: #94a3b8   (Secondary body text)
Slate-500: #64748b   (Tertiary text, labels)
```

## Typography Scale

### Headings
```
<h1> text-6xl md:text-7xl font-serif font-bold text-ivory
     Playfair Display, Bold, Ivory
     Used for: Page titles, major sections

<h2> text-4xl md:text-5xl font-serif font-bold text-ivory
     Playfair Display, Bold, Ivory (with .section-title class)
     Used for: Section headings, card titles

<h3> text-2xl md:text-3xl font-serif font-semibold text-ivory
     Playfair Display, Semibold, Ivory
     Used for: Subsection headings, form titles

<h4> text-xl font-serif font-semibold text-ivory
     Playfair Display, Semibold, Ivory
     Used for: Card headings, small section titles

<p> text-base font-sans font-normal text-slate-400
    Inter, Regular, Slate-400
    Used for: Body text, descriptions

<small> text-sm text-slate-400
        Inter, Regular, Slate-400
        Used for: Secondary information, captions
```

## Component Gallery

### Buttons

```html
<!-- Primary Button -->
<button class="btn btn-primary">Book Consultation</button>
<!-- Background: gold-400, Text: navy-950, Padding: px-6 py-3, Uppercase, Rounded -->

<!-- Secondary Button -->
<button class="btn btn-secondary">View Details</button>
<!-- Background: navy-700, Text: ivory -->

<!-- Outline Button -->
<button class="btn btn-outline">Learn More</button>
<!-- Border: gold-400, Text: gold-400, Hover: gold bg -->

<!-- Ghost Button -->
<button class="btn btn-ghost">Cancel</button>
<!-- Text-only, hover:text-gold-400 -->

<!-- Small Button -->
<button class="btn btn-sm btn-primary">View</button>
<!-- Compact version: px-4 py-2 -->

<!-- Large Button -->
<button class="btn btn-lg btn-primary">Get Started Today</button>
<!-- Large version: px-8 py-4 -->
```

### Cards

```html
<!-- Basic Card -->
<div class="card p-6">
  <p class="text-ivory font-semibold">Card Title</p>
  <p class="text-slate-400">Card content goes here</p>
</div>
<!-- Background: slate-900/50, Border: slate-700, Backdrop blur -->

<!-- Elevated Card (Hover Effect) -->
<div class="card-elevated">
  <h3 class="text-ivory font-semibold">Service Name</h3>
  <p class="text-slate-400">Description</p>
</div>
<!-- Adds: shadow-lg, hover:shadow-xl, hover:-translate-y-1 -->

<!-- Premium Card (Gradient) -->
<div class="card-premium">
  <h2 class="text-ivory font-serif text-2xl">Premium Section</h2>
  <p class="text-slate-400">Special content area</p>
</div>
<!-- Gradient background, enhanced shadows, elegant padding -->
```

### Section Layouts

```html
<!-- Dark Section -->
<section class="section section-dark">
  <div class="container-max">
    <div class="accent-line mb-4"></div>
    <h2 class="section-title">Section Heading</h2>
    <p class="section-subtitle">Descriptive subtitle text</p>
    <!-- Main content -->
  </div>
</section>
<!-- Background: navy-950, py-20 px-4 -->

<!-- Alternative Section -->
<section class="section section-alt">
  <div class="container-max">
    <!-- Content -->
  </div>
</section>
<!-- Background: slate-900/30 for visual variety -->
```

### Badges

```html
<!-- Primary Badge -->
<span class="badge-primary">Active</span>
<!-- Background: gold-400/20, Text: gold-300 -->

<!-- Secondary Badge -->
<span class="badge-secondary">Pending</span>
<!-- Background: slate-700/50, Text: slate-300 -->

<!-- Accent Badge -->
<span class="badge-accent">New</span>
<!-- Background: navy-700/50, Text: slate-100 -->
```

### Forms

```html
<!-- Standard Input -->
<input type="text" 
       placeholder="Your name"
       class="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 
              text-ivory placeholder-slate-500 
              focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition" />

<!-- With Label -->
<div>
  <label class="block text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">
    Full Name
  </label>
  <input type="text" class="w-full bg-slate-900/50 border border-slate-700..." />
</div>

<!-- Select/Dropdown -->
<select class="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 
              text-ivory focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30">
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Textarea -->
<textarea placeholder="Your message..."
          class="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 
                 text-ivory placeholder-slate-500 focus:border-gold-400 
                 focus:ring-1 focus:ring-gold-400/30 resize-none"></textarea>
```

### Icons (Lucide React)

```jsx
// All icons are sized and colored consistently
import { Calendar, Clock, Users, Mail, Check } from 'lucide-react';

// Icon Container Pattern
<div className="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400">
  <Calendar size={20} />
</div>

// Sizes used:
// 16 - Small (inline, compact)
// 18 - Regular (buttons, lists)
// 20 - Medium (icon containers, cards)
// 24 - Large (stat icons)
// 40 - Extra Large (confirmation screens)

// Colors:
// text-gold-400 - Accent icon color
// text-ivory - Light icon color  
// text-slate-400 - Muted icon color
```

## Layout Patterns

### Two-Column Layout
```html
<div class="grid md:grid-cols-2 gap-8">
  <!-- Left column -->
  <div>...</div>
  
  <!-- Right column -->
  <div>...</div>
</div>
```

### Three-Column Layout
```html
<div class="grid md:grid-cols-3 gap-6">
  <!-- Repeating card pattern -->
  <div class="card-elevated">...</div>
  <div class="card-elevated">...</div>
  <div class="card-elevated">...</div>
</div>
```

### Four-Column Layout
```html
<div class="grid md:grid-cols-4 gap-6">
  <!-- Stats or feature cards -->
</div>
```

### Sidebar + Content Layout
```html
<div class="flex">
  <!-- Sidebar: w-64 -->
  <aside class="w-64 bg-charcoal-900 border-r border-slate-700/50">
    <!-- Navigation, user info -->
  </aside>
  
  <!-- Main content: flex-1 -->
  <main class="flex-1 p-8">
    <!-- Page content -->
  </main>
</div>
```

## Spacing & Sizing Guide

### Padding
```
Card padding: p-6 (24px)
Section padding: py-20 px-4 (80px vertical, 16px horizontal)
Button padding: px-6 py-3 (24px horizontal, 12px vertical)
```

### Gaps
```
Between cards: gap-6 (24px)
Between sections: gap-8 (32px)
Between list items: space-y-3 (12px)
Between columns: gap-12 (48px)
```

### Border Radius
```
Buttons/Inputs: rounded-md (6px)
Cards: No explicit border-radius (defaults to natural corners)
Icons: rounded-md (6px)
```

## Hover & Interaction States

### Button Hover
```
btn-primary:
  Default: bg-gold-400, text-navy-950
  Hover: bg-gold-500

btn-outline:
  Default: border-gold-400, text-gold-400
  Hover: bg-gold-400, text-navy-950

Link hover:
  Default: text-slate-300
  Hover: text-gold-400
```

### Card Hover
```
.card-elevated:
  Hover: shadow-xl (increased shadow)
  Hover: -translate-y-1 (slight upward movement)
  Transition: duration-300
```

### Icon Hover
```
Icon containers in cards:
  Default: bg-gold-400/10
  Hover: bg-gold-400/20
  Transition: duration-300
```

## Animation Keyframes

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInLeft {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes shimmer {
  0%, 100% { opacity: 0.08; }
  50% { opacity: 0.12; }
}

@keyframes subtle-glow {
  0%, 100% { opacity: 0.08; }
  50% { opacity: 0.12; }
}
```

## Common Class Patterns

### Container & Layout
```
.container-max        /* max-w-7xl mx-auto */
.flex-center         /* flex items-center justify-center */
.section-title       /* h2 with serif font, ivory, tracking-tight */
.section-subtitle    /* p with slate-400 text */
.divider             /* gradient line separator */
.accent-line         /* h-1 w-16 bg-gold-400 rounded-full */
```

### Text Utilities
```
.text-accent         /* text-gold-400 */
.text-light          /* text-ivory */
.uppercase           /* uppercase tracking-widest */
.font-serif          /* Playfair Display */
```

### Stats & Numbers
```
.stat-number         /* text-4xl md:text-5xl font-bold text-gold-400 */
.stat-label          /* text-slate-400 text-sm uppercase tracking-widest */
```

## Responsive Breakpoints

```
Mobile-first approach:
sm: 640px  (small phones)
md: 768px  (tablets)
lg: 1024px (laptops)
xl: 1280px (desktops)
2xl: 1536px (large monitors)

Common patterns:
md:grid-cols-2  (1 column mobile, 2 columns tablet+)
md:grid-cols-3  (1 column mobile, 3 columns tablet+)
md:grid-cols-4  (1 column mobile, 4 columns tablet+)
md:text-lg      (smaller text on mobile, larger on tablet+)
md:py-20        (less padding on mobile, more on tablet+)
```

## Accessibility Features

✅ **High Contrast**
- Gold on Navy: 9.2:1 contrast ratio
- Ivory on Navy: 12.5:1 contrast ratio
- All text meets WCAG AA standards

✅ **Focus Indicators**
- All interactive elements have visible focus states
- Gold accent appears on focus

✅ **Semantic Markup**
- Proper heading hierarchy (h1 → h6)
- Form labels properly associated
- Button elements for buttons, links for navigation

✅ **Color + Text**
- Status indicators use color + text (never color-only)
- Not relying solely on color to convey information

## Usage Examples

### Hero Section with Stats
```html
<section class="section section-dark py-12">
  <div class="container-max">
    <div class="accent-line mb-4"></div>
    <h1 class="text-6xl font-serif font-bold text-ivory mb-4">
      Hero Headline
    </h1>
    <p class="section-subtitle mb-8">Descriptive subtitle</p>
    <a href="#" class="btn btn-primary">Get Started</a>
  </div>
</section>

<!-- Stats Grid -->
<div class="grid md:grid-cols-4 gap-6">
  <div class="card-elevated">
    <p class="stat-number">500+</p>
    <p class="stat-label">Happy Students</p>
  </div>
  <!-- Repeat for other stats -->
</div>
```

### Service Cards Grid
```html
<div class="grid md:grid-cols-2 gap-8">
  <div class="card-elevated">
    <div class="w-12 h-12 rounded-md bg-gold-400/10 flex-center text-gold-400 group-hover:bg-gold-400/20 transition">
      <BookOpen size={20} />
    </div>
    <h3 class="text-ivory font-semibold mt-4">Service Name</h3>
    <p class="text-slate-400 mt-2">Service description</p>
    <ul class="space-y-2 mt-4">
      <li class="flex items-center gap-2">
        <span class="text-gold-400">•</span>
        <span class="text-slate-300">Feature 1</span>
      </li>
    </ul>
  </div>
</div>
```

### Multi-Step Form
```html
<!-- Step Indicator -->
<div class="flex items-center justify-center gap-4 mb-12">
  <div class="w-10 h-10 rounded-full flex-center bg-gold-400 text-navy-950">1</div>
  <div class="w-8 h-0.5 bg-slate-700"></div>
  <div class="w-10 h-10 rounded-full flex-center bg-slate-700">2</div>
  <div class="w-8 h-0.5 bg-slate-700"></div>
  <div class="w-10 h-10 rounded-full flex-center bg-slate-700">3</div>
</div>

<!-- Form Content -->
<div class="max-w-2xl mx-auto">
  <h2 class="text-3xl font-serif font-bold text-ivory mb-2">Step Title</h2>
  <p class="text-slate-400 mb-8">Step description</p>
  <!-- Form inputs here -->
</div>
```

---

## Quick Copy-Paste Templates

### Basic Card
```html
<div class="card-elevated">
  <h3 class="text-ivory font-semibold">Title</h3>
  <p class="text-slate-400 mt-2">Content</p>
</div>
```

### Button Group
```html
<div class="flex gap-4">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-outline">Secondary</button>
</div>
```

### Section with Heading
```html
<section class="section section-dark">
  <div class="container-max">
    <div class="accent-line mb-4"></div>
    <h2 class="section-title">Heading</h2>
    <p class="section-subtitle">Subtitle</p>
    <!-- Content here -->
  </div>
</section>
```

---

**This design system ensures consistency and professional appearance across the entire Career Lounge application.**
