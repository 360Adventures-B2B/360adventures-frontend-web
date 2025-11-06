# 🧭 360Adventures Frontend Web

A modern frontend web application for **360 Adventures**, built using **Next.js**, **React**, and **TypeScript**.  
This app provides a dynamic user interface for browsing adventures, managing bookings, and interacting with the **360Adventures API**.

---

## 🚀 Features

- ⚡ Built with **Next.js 14+** and **React 18**
- 🧩 State management with **Redux Toolkit** or **React Query** (depending on setup)
- 🎨 Styled with **Tailwind CSS**
- 🔒 Secure API integration with **JWT Authentication**
- 🌐 Server-side rendering (SSR) and static site generation (SSG)
- 📱 Fully responsive UI design
- 🧱 Environment-based configuration
- 🐳 Ready for Docker deployment
- 🚀 Compatible with **Vercel**, **PM2**, or **Nginx** for production hosting

---

## 🧰 Requirements

Before starting, make sure the following are installed:

- [Node.js](https://nodejs.org/) — **v20 or higher**
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Backend API](https://github.com/360Adventures-B2B/360adventures-api) (running locally or hosted)

---

## 📥 Installation

### 1. Clone the repository
```bash
git clone https://github.com/360Adventures-B2B/360adventures-frontend-web.git
cd 360adventures-frontend-web
```
### 2. Install dependencies
```bash
npm install
cp .env.example .env.local
```

### 3. Setup environment variables

```bash
NEXT_PUBLIC_APP_NAME="360 Adventures B2B"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="e94eb5a871a2f5d3040ee71c1ac5caff7e602337fd8cc090ce9ba86077864567cdb727e67839e3c4829e6a0a5fb1e0a2911d57ec35bac293bfbeb51cf5c22da4"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3010"
NEXT_PUBLIC_API_KEY="nodejs@2025"
NODE_ENV="local"
JSON_PATH='/Applications/test/json'
ENABLE_APPROVAL_CHECK=true
```

### 4. Run the Application
```bash
npm run dev
```