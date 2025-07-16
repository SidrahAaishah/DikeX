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

## 📁 Project Structure

```bash
DikeX/
│
├── frontend/              # React + Vite app
├── backend/               # Express.js API server
└── compiler/              # Dockerized compiler backend
