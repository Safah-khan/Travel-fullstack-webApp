# Wanderlust Travel

A modern travel booking web application built with React, Vite, Tailwind CSS, and Firebase.

## Features

- **Landing Page** - Hero slideshow, features, destinations grid, testimonials
- **Authentication** - Email/password signup and login with Firebase Auth
- **Booking System** - Simple booking form for travel reservations
- **Protected Routes** - Booking pages require authentication
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Toast Notifications** - Success and error feedback

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Firebase** - Authentication and Firestore database
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## Project Structure

```
wanderlust-travel/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── DestinationsSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   └── CTASection.jsx
│   ├── pages/           # Page components
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Booking.jsx
│   │   └── BookingSuccess.jsx
│   ├── context/         # React context providers
│   │   └── AuthContext.jsx
│   ├── routes/           # Routing components
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── firebase/        # Firebase configuration
│   │   └── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── .env.example
```

## Getting Started

### 1. Install Dependencies

```bash
cd wanderlust-travel
npm install
```

### 2. Configure Firebase

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable **Authentication** (Email/Password provider)
3. Enable **Firestore Database**
4. Copy your Firebase config values to `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## Pages

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Landing page with all sections | No |
| `/login` | Sign in with email/password | No |
| `/signup` | Create new account | No |
| `/booking` | Create a new booking | Yes |
| `/booking-success` | Booking confirmation | Yes |

## Authentication Flow

1. Users can sign up with full name, email, phone, and password
2. User data is stored in Firestore `users` collection
3. After login, users are redirected to the booking page
4. Protected routes check authentication state
5. Users remain logged in after refresh (Firebase persists auth)

## Booking System

The booking form captures:
- Destination (dropdown of curated destinations)
- Travel type (Flight, Train, Cab)
- Travel date
- Passenger count

Bookings are saved to Firestore `bookings` collection with:
- `userId` - Reference to the authenticated user
- `destination` - Selected destination
- `travelType` - Type of travel
- `travelDate` - Selected date
- `passengerCount` - Number of travelers
- `createdAt` - Timestamp
- `status` - Booking status

## Design System

### Colors
- `navy` (#04080f) - Primary background
- `ocean` (#0e4d6e) - Secondary background
- `teal` (#1a7a8a) - Accent
- `aqua` (#2ab3c2) - Primary accent
- `mint` (#4dd9b0) - Success
- `amber` (#f0a500) - Highlights

### Typography
- **Playfair Display** - Headings (serif)
- **DM Sans** - Body text (sans-serif)

### Components
- `btn-primary` - Gradient button
- `btn-ghost` - Outlined button
- `btn-cta-main` - Large gradient CTA
- `btn-cta-outline` - Large outlined CTA
- `glass-card` - Frosted glass card
- `input-field` - Form inputs
- `section-tag` - Section labels

## License

MIT License - For educational/university demo purposes.
