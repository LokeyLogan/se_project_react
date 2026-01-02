# WTWR (What to Wear)

A responsive full-stack web application that suggests clothing items based on the current weather conditions in your location. Users can register, log in, manage their profile, add and like clothing items, and view recommendations for hot, warm, or cold days.

---

## ✨ Features

- **User authentication**
  Users can sign up, sign in, and sign out using JWT-based authorization.

- **Weather-based recommendations**
  Fetches real-time weather data from the [OpenWeather API](https://openweathermap.org/api) and recommends clothing items accordingly.

- **Clothing item management**
  Authorized users can add, delete, and like clothing items. Items are associated with their owner.

- **Profile management**
  Users can edit their profile information, including name and avatar.

- **Protected routes**
  The profile page and item interactions are protected and only available to authorized users.

- **Interactive modals**
  Custom modal forms for authentication, profile editing, and item management.

- **Responsive design**
  Works across desktop and mobile devices.

- **Context & state management**
  Uses React context and hooks to manage the current user, authentication state, weather units (°C/°F), and application UI state.

---

## 🛠️ Technologies

### Frontend

- **Framework**: React (with Vite)
- **Styling**: CSS, BEM methodology
- **State Management**: React Context & Hooks
- **Routing**: React Router
- **Language**: JavaScript (ES6+)

### Backend

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

### APIs

- **Weather API**: OpenWeather API

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18)
- npm
- MongoDB (running locally)

### Installation

```bash
# Clone the frontend repository
git clone https://github.com/LokeyLogan/se_project_react.git
cd se_project_react

# Install dependencies
npm install
```
