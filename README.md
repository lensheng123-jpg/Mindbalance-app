MindBalance App - Project Structure & Architecture
📁 Project Overview
MindBalance-app - A mental health tracking application built with Ionic React, TypeScript, and Firebase featuring offline-first architecture and comprehensive mood analytics.

🏗️ Project Structure
Root Level Files
-package.json - Dependencies & npm scripts
-tsconfig.json - TypeScript configuration
-vite.config.ts - Vite build tool configuration
-ionic.config.json - Ionic framework configuration
-README.md - Project setup & development guide
-.env - Environment variables (Firebase API keys)

Source Code ( /src )
Core Configuration
-firebaseConfig.ts - Firebase initialization (exports app + db with offline cache)
-storage.ts - Ionic Storage setup (offline persistence layer)

Components (/components):
AddMood.tsx - Mood entry form with offline-first strategy
-Handles user input, local cache, and Firestore sync
-Features mood selection, note input, and stress tracking

MoodTrendChart.tsx - Line chart showing mood trends over 7 days
-Real-time data with mood scoring system (Happy=5, Angry=1)

MoodList.tsx - Displays mood cards with full CRUD operations
-Search, filtering, real-time updates, offline sync detection

MoodPie.tsx - Pie chart showing mood distribution
-Visual proportion display with color-coded moods

StressTrendChart.tsx - Line chart for stress trends
-Daily/weekly/monthly views with aggregation logic

Pages (/pages)
Home.tsx - Main dashboard page
-Renders all mood components and navigation
-Central hub for mood tracking and analytics

Mindfulness.tsx - Breathing exercises & meditation
-Timer functionality for mindfulness practices

App Configuration
App.tsx - Root component with routing setup
-Manages navigation between Home and Mindfulness pages
main.tsx - Application entry point

\Data Flow Architecture...
User Input → AddMood Component → Local Cache → Firestore Sync → Real-time Updates → Analytics Charts

Key Data Flow Steps:
- User inputs mood data via AddMood form
- Local cache saves for offline use
- Online check and Firestore sync
- Real-time listeners update components
- Charts visualize aggregated data



## 📋 Assignment Requirements Implemented

### ✅ Task 1: Project Setup & Firebase Integration
-Ionic React project created with tabs template for ex..(ionic start mindbalance-app tabs --type=react), then cd mindbalance-app, then type(npm install firebase)
- Fulfilled Firestore database setup
-Create .env file using modern best practices (e.g., environment variables and Create to firebaseConfig.ts)


### ✅ Task 2: CRUD Functionality (Mood Entries)
- **Create**: Add new mood entries with notes from (AddMood.tsx) file
- **Read**: Real-time mood list with chronological sorting from (MoodList.tsx)file
- **Update**: Edit existing mood entries from (MoodList.tsx)file
- **Delete**: Remove mood entries from (MoodList.tsx)file

### ✅ Task 3: Client-Side Caching
- Ionic Storage implementation ( npm install @ionic/storage), then Create Storage.ts)
- To Offline data persistence
- To Cache synchronization with live data ( Then pls Modify MoodList to cache)-> import storage from".../storage then add Load cacahe data first and fetch live data) -Their flow Cache → Refresh app → Cached data loads instantly before Firebase sync
- Last create Home.tsx and create the App.tsx file

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Ionic CLI (`npm install -g @ionic/cli`)

How to run it .
Test Your Repo
1. Delete my local `node_modules/` folder  
2. Run `npm install` again → make sure project still works  
3. Run `ionic serve` → after typing cd mindbalance-app to direct the folder and then to type ionic serve confirm everything runs clean  
The application will open in your browser at http://localhost:8100

Platform Targets
Web - Progressive Web App (PWA)
iOS - Native iOS app
Android - Native Android app



