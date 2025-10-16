# 🧠 Second Brain - MERN Stack with TypeScript

![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-22.x-brightgreen)
![Express](https://img.shields.io/badge/Express.js-Backend-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Vite](https://img.shields.io/badge/Vite-Build-lightyellow)

## 📝 Overview
Second Brain is a full-stack productivity application that helps users organize digital resources like links, tweets, and messages. Built with the MERN stack (MongoDB, Express, React, Node.js) using TypeScript for type safety.

[![Demo Thumbnail](images/demo-thumbnail.png)](https://drive.google.com/file/d/1FJ4kcf7dlkoeM_-8ynNrsf807dFoojxd/view?usp=drive_link)
Watch the full demo here: [Google Drive Video](https://drive.google.com/file/d/1mlITm7Lf_kdK-BQdmlTfOLheBr-usBTk/view?usp=sharing)

## 🚀 Key Features
- 🔗 Save and categorize web links with previews
- 🐦 Embed and store tweets using `react-tweet`
- 📺 Save YouTube videos with `react-lite-youtube-embed`
- 🔐 User authentication with JWT and bcrypt
- 🏷️ Tagging and organization system
- ⚡ Blazing fast performance with Vite
- 🛡️ Input validation with Zod

## 🛠️ Tech Stack

### Frontend (Client)
| Technology | Purpose |
|------------|---------|
| React 19 (TypeScript) | UI Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP requests |
| Vite | Build tool |

### Backend (Server)
| Technology | Purpose |
|------------|---------|
| Express.js v5 | Server framework |
| MongoDB + Mongoose | Database |
| JWT + bcrypt | Authentication |
| Zod | Input validation |
| CORS | Security middleware |

## 📁 Project Structure

```text
wscode/
├── client/                   # React Vite Frontend
│   ├── src/                  # React components
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration
│
└── server/                   # Express Backend
    ├── src/                  # Server source code
    ├── package.json          # Backend dependencies
    └── tsconfig.json         # TypeScript config
```
## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (Atlas)
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/Bhumesh01/SecondBrain.git
cd SecondBrain
```
## Install client dependencies
``` bash
cd client
npm install
```
## Install server dependencies
```bash
cd ../server
npm install
```
## ⚙️ Environment Variables
-  client/.env
```env
VITE_REACT_APP_BACKEND_URL=http://localhost:3000
VITE_REACT_APP_FRONTEND_URL=http://localhost:5173
```
- server/.env
```env
PORT = 3000
DBurl = your_mongodb_connection_string
JWT_PASSWORD = your_jwt_password
```
## 🔄 Running Development Servers
### Start Backend:
```bash
cd server
npm run dev
```
### Start Frontend (in a new terminal):
```bash
cd client
npm run dev
```
## 📜 Available Scripts
### Client
| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Build production bundle  |
| `npm run lint`    | Run ESLint               |
| `npm run preview` | Preview production build |
### Server
| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Build and start dev server |
| `npm run build` | Compile TypeScript         |
| `npm start`     | Run production server      |

## Credits
- Designed and developed by Bhumesh Mahajan.

## License
- This project is licensed under the MIT License.