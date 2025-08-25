# WTWR (What to Wear)

A responsive web application that suggests clothing items based on the current weather conditions in your location. Users can add their own clothing items, manage them through modals, and view recommended outfits for hot, warm, or cold days.

---

## ✨ Features

- **Weather-based recommendations**  
  Fetches real-time weather data from the [OpenWeather API](https://openweathermap.org/api) and recommends clothing items accordingly.

- **Clothing item management**  
  Users can add new clothing items with an image, name, and weather type (hot, warm, cold).

- **Interactive modals**  
  Add and manage clothing through custom modal forms.

- **Responsive design**  
  Works across desktop and mobile devices.

- **Context & state management**  
  Handles weather units (°C/°F), modal visibility, and clothing items consistently with React context and hooks.

---

## 🛠️ Technologies

- **Frontend Framework**: React (with Vite)
- **Styling**: CSS, BEM methodology
- **Build Tools**: Vite, Babel, Webpack plugins (`html-webpack-plugin`, `clean-webpack-plugin`)
- **API**: OpenWeather API for real-time weather data
- **Mock Server**: `json-server` for local database (items)
- **Language**: JavaScript (ES6+)

---

## 📸 Screenshots / Demo

> _Replace these with your own screenshots or a Loom video demo link._

- **Home page with weather card**  
  ![Weather card screenshot](./screenshots/weather-card.png)

- **Add Item Modal**  
  ![Add item modal screenshot](./screenshots/add-item-modal.png)

- **Recommended clothing list**  
  ![Cards list screenshot](./screenshots/cards-list.png)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18)
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/<your-username>/wtwr.git
cd wtwr

# Install dependencies
npm install
```
