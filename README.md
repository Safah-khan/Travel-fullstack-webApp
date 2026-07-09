# Wanderlust Travel

A modern travel booking app built with React, Vite, Tailwind CSS, and Firebase.

## Features

- Landing page with hero, features, destinations, testimonials, and CTA
- Firebase authentication for signup/login/logout
- Protected booking and success pages
- Responsive UI with Tailwind CSS and toast notifications

## Tech Stack

- React
- Vite
- Tailwind CSS
- Firebase Auth + Firestore
- React Router DOM
- Lucide Icons
- React Hot Toast

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a .env file with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Firebase Setup

- Enable Authentication with the Email/Password provider
- Enable Firestore Database

## Routes

- / → Landing page
- /login → Sign in
- /signup → Create account
- /booking → Booking form (protected)
- /booking-success → Confirmation page (protected)

Created by Safah and Mustafa with love
