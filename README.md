# 🚀 DikeX – Online Judge Platform

DikeX is a full-stack online judge platform where users can submit, compile, and run C++, Java, and Python code — powered by a Dockerized compiler backend. Additionally, it features AI-based problem explanations and code reviews using Gemini.

---

## 🧾 Features

- 👤 User Authentication
- 🧠 AI Code Reviewer & Genie Problem Explainer
- 🖥️ Dockerized Compiler Backend (C++, Java, Python)
- 🧪 Test Case Verdicts
- 📊 Realtime Code Output + Verdicts
- 🌐 Frontend + Backend + Compiler Setup

---

## 🛠 Tech Stack

- **Frontend**: React + Vite (HTTP)
- **Backend**: Node.js + Express (HTTP)
- **Compiler Backend**: Node.js + Docker
- **Database**: MongoDB (Atlas)
- **AI Services**: Gemini API

---

## 🔧 Prerequisites

1. **Node.js** (v18+)
2. **Docker Desktop** installed & running
3. **MongoDB Atlas URI**
4. **Google Gemini API key**
5. (Optional) Postman for testing

---


## ✅ Step 1: Clone the Repository

```bash
git clone https://github.com/SidrahAaishah/DikeX.git
cd DikeX
```
## :📁 Step 2: Project Structure

```bash
DikeX/
│
├── frontend/              # React + Vite app
├── backend/               # Express.js API server
└── compiler/              # Dockerized compiler backend
```
## 🔧 Step 3: Install Dependencies

Open **three terminals** (or tabs), one for each folder:

---

#### 🚀 3.1 Frontend

```bash
cd React/oj_reactJs
npm install
npm run dev
```
#### 🛡️ 3.2 Backend

```bash
cd Backend
npm install
node index.js
```
#### 🐳 3.3 Compiler Backend (Dockerized)

> Ensure Docker is installed and running on your machine.

```bash
cd Compiler
docker build -t oj-compiler-backend .
docker run -d -p 8000:8000 --env-file .env --name compiler-backend oj-compiler-backend
```
### 🔐 Step 4: Setup Environment Variables

Create the following `.env` files:

#### ✏️ Compiler/.env

```env
PORT=8000
FRONTEND_URL=http://localhost:5173
GOOGLE_GEMINI_API=your_google_gemini_api_key
```
#### ✏️ Backend/.env
```env
PORT=3000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

## 🙋‍♀️ FAQ

**Q: Do contributors need Docker?**  
✅ Yes, for running the compiler backend locally.

**Q: Can I skip AI features?**  
✅ Yes, just don't use the Genie button (or remove API calls).

**Q: How do I deploy this?**  
🚀 Use AWS EC2 or Render for backend & compiler. Vercel/Netlify for frontend.

---

## 🤝 Contribution

Feel free to fork, clone, and raise issues or pull requests! 🎯
