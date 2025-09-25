# MindBalance App - Assignment 2

A mental wellness application built with Ionic React and Firebase that demonstrates CRUD operations with client-side caching.

Features:
Mental health tracking

Wellness resources

Firebase integration

## 📋 Assignment Requirements Implemented

### ✅ Task 1: Project Setup & Firebase Integration
-Ionic React project created with tabs template for ex..(ionic start mindbalance-app tabs --type=react), then cd mindbalance-app
-Firebase SDK installed and configured (npm install firebase)
-Firestore database setup
-Create .env using modern best practices (e.g., environment variables and Create to firebaseConfig.ts)


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
3. Run `ionic serve` → after type cd mindbalance-app to direct the folder and type ionic serve confirm everything runs clean  
The application will open in your browser at http://localhost:8100



