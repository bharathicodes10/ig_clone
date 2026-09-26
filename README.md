# 📸 Devgram

> A modern, responsive developer photo-sharing platform inspired by Instagram, engineered with Next.js, Firebase Firestore, and Cloudinary.

🔗 **Live Application:** [devgram-mu.vercel.app](https://devgram-mu.vercel.app)

🌟 Overview

Devgram is a full-stack social media web application designed for sharing content and community engagement. Built with performance and reactive UI in mind, it provides seamless authentication, rapid media delivery, and real-time community interaction through likes and nested comments.

🛠️ Tech Stack & Architecture

Frontend & Framework: Next.js (App Router), React, TypeScript

Styling: Tailwind CSS, Lucide Icons

Authentication: NextAuth.js (Google OAuth 2.0 provider integration)

Database & Realtime Store: Firebase Firestore (NoSQL document store for posts, likes, and comment threads)

Asset Storage & CDN: Cloudinary (optimized cloud media uploads and responsive image delivery)

Deployment: Vercel

✨ Key Features:

🔐 Secure Authentication: Frictionless Google sign-in and session management powered by NextAuth.js.

🖼️ Media Publishing: Direct image upload workflow integrated with Cloudinary for fast processing, optimization, and CDN delivery.

❤️ Interactive Social Feed: Real-time like counts, instant state toggling, and interactive post cards.

💬 Community Discussion: Structured comment threads beneath posts allowing instant discussions.

📱 Fully Responsive Layout: Clean, mobile-first UI with modern navigation patterns mirroring native mobile social apps.

🚀 Getting Started
Clone the repository:

```bash
git clone [https://github.com/bharathicodes10/Devgram.git](https://github.com/bharathicodes10/Devgram.git)
cd Devgram
```

Install dependencies:

```bash
npm install
Set up environment variables in a .env.local file:
```

Code snippet
# NextAuth
NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com

NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_key

CLOUDINARY_API_SECRET=your_cloudinary_secret

Run the development server:

```bash
npm run dev
```
Open http://localhost:3000 to view the application.
