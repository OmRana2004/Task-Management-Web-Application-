# TaskFlow — Task Management App

A full-stack task management app built with React, Tailwind CSS v4, Framer Motion, and Node.js.

---

## Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 | Node.js + Express |
| Tailwind CSS v4 | MongoDB + Mongoose |
| Framer Motion | JWT Auth |
| Zustand, Axios, React Router | REST API |

---

## Project Structure

```
taskflow/
├── frontend/
│   ├── src/
│   │   ├── components/    # Navbar, Sidebar, TaskCard, StatsCard, etc.
│   │   ├── pages/         # Dashboard.jsx
│   │   ├── services/      # api.js (Axios instance)
│   │   ├── store/         # themeStore.js (Zustand)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── models/            # Task.js
│   ├── routes/            # tasks.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

---

## Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

### Backend

```bash
cd backend
npm install
npm run dev
# Runs at http://localhost:5000
```

### Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_secret_key
```

### API base URL — `src/services/api.js`

```js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks/get` | Get all tasks |
| `POST` | `/api/tasks/create` | Create a task |
| `PUT` | `/api/tasks/update/:id` | Update a task |
| `PATCH` | `/api/tasks/status/:id` | Toggle status |
| `DELETE` | `/api/tasks/delete/:id` | Delete a task |

---

## Features

- JWT authentication with localStorage
- Task CRUD with priority levels (Low / Medium / High)
- Real-time search, filter, sort, and pagination
- Dark mode persisted via Zustand
- Collapsible sidebar (desktop) + drawer (mobile)
- Animated stats cards with sparklines
- Toast notifications and empty states
- Fully responsive with Framer Motion animations

---

## Tailwind v4 Notes

```css
/* index.css — correct order */
@import url('https://fonts.googleapis.com/...');
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: 'Inter', sans-serif;
}
```

VS Code may warn about `@variant` and `@theme`. Fix with `.vscode/settings.json`:

```json
{
  "css.validate": false
}
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `@import must precede all other statements` | Move Google Fonts `@import` to top of `index.css` |
| `ThemeProvider is not defined` | Import it in `main.jsx` |
| `@variant` warnings in VS Code | Add `"css.validate": false` to `.vscode/settings.json` |
| API requests failing | Check `baseURL` in `api.js` matches backend port |

---

## License

MIT
