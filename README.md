MindBalance aid app - Project Structure & Architecture

📁 Project Overview
MindBalance aid app - A mental health tracking application built with Ionic React, TypeScript, and Firebase featuring offline-first architecture and comprehensive mood analytics.

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

=AddMood.tsx - Mood entry form with offline-first strategy
-Handles user input, local cache, and Firestore sync
-Features mood selection, note input, and stress tracking

=MoodTrendChart.tsx - Line chart showing mood trends over 7 days
-Real-time data with mood scoring system (Happy=5, Angry=1)

=MoodList.tsx - Displays mood cards with full CRUD operations
-Search, filtering, real-time updates, offline sync detection

=MoodPie.tsx - Pie chart showing mood distribution
-Visual proportion display with color-coded moods

=StressTrendChart.tsx - Line chart for stress trends
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



## 📋 Assignment 2 Requirements Implemented

### ✅ Task 1: Project Setup & Firebase Integration
Project Initialization:
Created an Ionic React project using the tabs template:
ionic start mindbalance-app tabs --type=react
Then navigated to the project directory and installed Firebase.
cd mindbalance-app->
npm install firebase

Firebase Setup:
Configured Firestore for cloud-based data storage.
Added a .env file to securely manage Firebase credentials using environment variables.
Created a firebaseConfig.ts file for modular and reusable Firebase initialization.


### ✅ Task 2: CRUD Functionality (Mood Entries)
Implemented complete Create, Read, Update, Delete (CRUD) functionality for mood tracking:
Create:
Users can add new mood entries with notes via AddMood.tsx.

Read:
Displayed a real-time, chronologically sorted mood list in MoodList.tsx, synced with Firestore.

Update:
Enabled editing of existing mood entries directly from the mood list (MoodList.tsx).

Delete:
Provided functionality to remove mood entries from the mood list (MoodList.tsx).

### ✅ Task 3: Client-Side Caching
Implemented offline data persistence and synchronization:

Storage Setup:
Installed and configured Ionic Storage:
npm install @ionic/storage
Then created a reusable Storage.ts utility module.

Caching Logic:
Goal: Ensure fast load times and offline access to previously fetched data.
Updated MoodList.tsx included has these components:
Load cached mood data first (instant display).
Fetch live data from Firestore afterward and synchronize changes.
Maintain consistency between local cache and remote database.

Final App Structure:
Home.tsx: Acts as the main navigation hub.
App.tsx: Root component handling routing, initialization, and overall app structure.

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
Android - Native Android app



