# SmartStore AI 🚀 (AI-Powered E-Commerce Admin Assistant)
SmartStore AI is a premium, high-performance Full-Stack MERN (MongoDB, Express, React, Node) administrative dashboard. It empowers e-commerce shop owners to manage inventory assets seamlessly and utilize next-generation open-source LLMs (**Llama 3.1** via the **Groq LPU network**) to automatically generate high-converting product descriptions, search tags, marketing captions, and strategic sales recommendations.
---
## 🎨 Core Features
### 🔑 User Authentication
* **Role-Based Access Control (RBAC)**: Secure database-level roles supporting `admin` (full write/AI access) and `viewer` (read-only monitoring).
* **Cryptographic Security**: Passwords are securely salted and hashed using `bcryptjs` (10 rounds). Sessions are maintained via `JWT (JSON Web Tokens)` with a 7-day expiration.
### 📦 Inventory CRUD & Modular Drawer
* **Premium Slide-Out Sheet**: Replaced generic center modals with a sliding administrative command drawer.
* **Unified State Controller**: Form handles general specs validation, AI tone mapping, and circular tag pills dynamically.
### 🤖 AI Copywriter & Marketing Suite
* **Lightning-Fast Generation**: Powered by the **Groq LPU SDK** and **Llama 3.1-8B-Instant** for sub-100ms completions.
* **Tone of Voice Control**: Drafts descriptions custom-mapped to *Luxury*, *Casual*, *Professional*, *Bold*, or *Minimalist* styles.
* **Instagram Feeds Mockup**: Renders live social card previews for generated captions.
* **Smart JSON Sanitizer**: Integrates regex-based sanitization (`safeJSONParse`) to cleanly map raw tag arrays without crashes.
### 📊 Real-Time Analytics Dashboard
* **Dynamic Sales Graphs**: Maps chronological revenue trends (Line Chart) and top-performing products (Bar Chart) using **Chart.js**.
* **Automatic Offline Caching**: If MongoDB is offline, the client automatically synchronizes to `localStorage` and dynamically simulates sales calculations for your actual custom products, keeping graphs 100% active.
* **Inventory Depletion Alert**: Flashes a global glowing red warning banner if any custom product falls below `5` stock units.
---
## 🧰 Technology Stack
* **Frontend**: React 18, Vite 5, Tailwind CSS v4, Chart.js, React Router v6, Axios
* **Backend**: Node.js, Express.js, MongoDB, Mongoose ODM, JWT, Bcryptjs, Groq SDK
* **Hosting & CDN**: Vercel (Frontend Client) & Render (Backend Service)
---
## 📂 Project Structure
```text
smartstore-ai/
│
├── backend/                       # Express.js REST API
│   ├── config/                    # Mongoose database connections
│   ├── controllers/               # Business logic handlers (auth, product, dashboard, ai)
│   ├── middleware/                # JWT verification guards (authMiddleware)
│   ├── models/                    # MongoDB schemas (User, Product)
│   ├── routes/                    # API route registers (auth, product, dashboard, ai)
│   ├── services/                  # Groq API prompts (openaiService)
│   ├── server.js                  # App bootstrap entry
│   └── package.json
│
└── frontend/                      # React SPA (Vite)
    ├── src/
    │   ├── api/                   # Axios interceptors configuration
    │   ├── components/            # Reusable UI widgets & ChartJS wrappers
    │   ├── context/               # Global JWT AuthContext
    │   ├── pages/                 # Full layouts (Dashboard, Products, Login, Signup)
    │   ├── App.jsx                # Lazy-routed React router
    │   ├── index.css              # Custom neon gradients and scrollbars
    │   └── main.jsx
    ├── vercel.json                # Single-page-app rewrite rules
    ├── vite.config.js             # Vite compilers configuration
    └── package.json
```
---
## 🛠️ Local Installation & Setup
### Prerequisites
* **Node.js** installed locally (v18+ recommended)
* **MongoDB** server running locally (or a MongoDB Atlas URI)
* **Groq API Key** (obtainable for free from [console.groq.com](https://console.groq.com))
### 1. Clone & Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `/backend` folder:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/smartstore-ai
   JWT_SECRET=your_jwt_signing_key_here
   CLIENT_URL=http://localhost:5173
   GROQ_API_KEY=gsk_your_groq_api_token_here
   ```
4. Fire up the backend server:
   ```bash
   npm start
   ```
### 2. Setup Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Launch the Vite development compiler:
   ```bash
   npm run dev
   ```
4. Open the displayed local address (defaulting to `http://localhost:5173`) in your browser.
---
## 🌐 Production Deployment
### Backend (Render)
1. Push your backend code as a separate repository to GitHub.
2. Deploy on Render as a **Web Service** using:
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
3. Configure your Environment Variables in the Render dashboard:
   * Set `CLIENT_URL` to your live Vercel URL.
### Frontend (Vercel)
1. Push your frontend code as a separate repository to GitHub.
2. Import the project to Vercel.
3. Configure the environment variables inside Vercel:
   * Set `VITE_API_URL` to your live Render Web Service URL (e.g. `https://smartstore-ai.onrender.com/api`).
4. Click deploy. Single-page routing is handled cleanly by Vercel using the pre-configured [vercel.json](file:///C:/Users/Asus/.gemini/antigravity/scratch/smartstore-ai/frontend/vercel.json) rewrite rule!
---
