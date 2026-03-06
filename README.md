# 👟 SneakPeak – Full-Stack E-commerce Experience

Built as a deep-dive into the **Next.js 15 ecosystem**, this project evolved from a simple Frontend Mentor challenge into a functional e-commerce platform. It integrates modern web standards for payments, database management, and interactive data visualization.

[🌐 Live Demo](https://sneakers-nextjs-2-0.vercel.app) | [📁 Repository](https://github.com/MistaKupa/sneakers-nextjs-2.0)

## 📸 Preview

| Home Page                       | Admin Dashboard                            |
| ------------------------------- | ------------------------------------------ |
| ![Home Page](./assets/home.png) | ![Admin Dashboard](./assets/dashboard.png) |

## 🎯 Project Purpose & Origin

Inspired by a Frontend Mentor challenge, I pushed the boundaries of the initial "Product Page" task by implementing a full checkout flow, user authentication, and a comprehensive Admin Dashboard. This project served as a rigorous training ground for React 19 features and server-side logic.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions)
- **Frontend:** React 19, Tailwind CSS, Lucide Icons
- **State & Data:** TanStack Query (v5), Context API
- **Backend-as-a-Service:** Supabase (PostgreSQL, Auth, SSR Support)
- **Payments:** Stripe (Payment Intents API)
- **Visualization & Motion:** ECharts (Sales Analytics), GSAP & Framer Motion (UI/UX)

## ✨ Key Technical Implementations

### 📊 Admin Dashboard (Analytics)

- Data-driven dashboard using **ECharts** to track sales by category.
- Implemented **Defensive Programming** patterns to handle asynchronous data states, preventing build-time errors and improving UX.

### 💳 Secure Payment Flow

- Integrated **Stripe Elements** for a secure, PCI-compliant checkout.
- Developed a custom order management system that syncs frontend cart state with Supabase records upon successful payment.

### 🔐 Modern Authentication

- Implemented **Supabase SSR** for persistent user sessions, ensuring protected routes (Admin/User) remain secure on both client and server.

## 📈 Developmental Roadmap (Learning Goals)

As a dedicated self-taught developer, I treat my projects as living organisms. My next steps for this application are:

- **Webhook Integration:** Moving payment confirmation to server-to-server Webhooks to ensure 100% data integrity.
- **Unit Testing:** Implementing Jest for critical utility functions.
- **Performance:** Fine-tuning Image optimization and Core Web Vitals for better SEO.

## 📍 About Me

Self-taught developer with a passion for building clean, performant web applications. Completed advanced certifications by **Jonas Schmedtmann**. Currently looking for opportunities to contribute to professional teams in **Slovakia (Remote/Hybrid)** or the **Austrian tech market (Linz/Vienna)**.
