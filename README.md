# CRM Lead Management Frontend

## Live Demo Login

The application is deployed on AWS EC2.

Deployed Frontend:

```txt
https://crm.pasindujayarathna.me
```

Use the following test credentials to login:

```txt
Email: admin@gmail.com
Password: admin123
```

Note: The AWS EC2 server may be stopped when not being reviewed due to limited AWS credits. If the deployed link is not accessible, the server can be started again for a live demonstration.

## Project Overview

This is the frontend application for the CRM Lead Management System. It provides a user interface for managing leads, tracking lead status, adding notes, and viewing dashboard statistics.

The application is designed for a small sales team to manage customer leads and follow up with potential customers more efficiently.

## Tech Stack Used

- React.js
- Vite
- React Router DOM
- Material UI
- Tailwind CSS
- Axios
- SweetAlert2
- Recharts
- GitHub Actions CI/CD
- Nginx
- AWS EC2

## Features Implemented

- Login page
- JWT token storage in localStorage
- Protected frontend routes
- Dashboard page
- Dashboard statistics cards
- Responsive pie chart using Recharts
- Lead list page
- Lead pagination
- Search leads
- Filter leads by status
- Filter leads by lead source
- Add lead page
- Edit lead page
- Delete lead
- Update lead status
- Add notes to a selected lead
- Delete notes
- Responsive UI for desktop and mobile
- SweetAlert2 success, error, and confirmation messages
- Password show/hide feature in login page
- Form validation with inline field errors
- Deployed frontend using Nginx
- CI/CD deployment using GitHub Actions

## Folder Structure

```txt
CRM-Application-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   └── Login.jsx
│   │   └── admin/
│   │       ├── Dashboard.jsx
│   │       ├── leads/
│   │       │   ├── AddLead.jsx
│   │       │   ├── EditLead.jsx
│   │       │   └── LeadList.jsx
│   │       └── notes/
│   │           └── Notes.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Git Ignore

The following files and folders are not pushed to GitHub:

```txt
node_modules
dist
.env
```

- `node_modules` is generated after running `npm install`.
- `dist` is generated after running `npm run build`.
- `.env` is excluded because it may contain environment-specific values.

## Backend API Configuration

The frontend connects to the backend API using Axios.

The API configuration file is located at:

```txt
src/services/api.js
```

For deployed backend, the base URL is:

```js
baseURL: "https://crmbackend.pasindujayarathna.me/api"
```

For local backend development, change it to:

```js
baseURL: "http://localhost:3000/api"
```

## Test Login Credentials

```txt
Email: admin@gmail.com
Password: admin123
```

## How to Run Locally

### 1. Clone the repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_LINK
cd CRM-Application-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure backend API URL

Open:

```txt
src/services/api.js
```

For local backend, use:

```js
baseURL: "http://localhost:3000/api"
```

For deployed backend, use:

```js
baseURL: "https://crmbackend.pasindujayarathna.me/api"
```

### 4. Start development server

```bash
npm run dev
```

The frontend will run on:

```txt
http://localhost:5173
```

## Backend Requirement

Before running the frontend locally, make sure the backend server is running.

Backend local URL:

```txt
http://localhost:3000
```

Backend API URL:

```txt
http://localhost:3000/api
```

## Build for Production

To create a production build:

```bash
npm run build
```

The build files will be generated inside:

```txt
dist/
```

## Deployment

The frontend was deployed on an AWS EC2 Ubuntu server using Nginx.

Deployment tools used:

- AWS EC2
- Nginx
- Cloudflare DNS
- GitHub Actions CI/CD

Frontend deployed URL:

```txt
https://crm.pasindujayarathna.me
```

Backend deployed URL:

```txt
https://crmbackend.pasindujayarathna.me
```

## CI/CD

GitHub Actions is used to automatically deploy the frontend when changes are pushed to the `main` branch.

Deployment process:

```txt
1. Checkout latest code
2. Install dependencies
3. Build React frontend
4. Upload dist files to EC2
5. Reload Nginx
```

## Deployment Availability Note

This project was deployed on AWS EC2. However, because AWS credits are limited, the EC2 server may be stopped when not being reviewed.

If the deployed frontend link is not accessible, the application can be shown by starting the EC2 server again. The full source code, setup instructions, backend setup, database setup, and demo video are included in the submission.

## Known Limitations

- The system currently supports one main admin user.
- Role-based frontend UI control is basic.
- Notes can be added and deleted, but note editing is not implemented.
- Email notifications are not implemented.
- Advanced reporting pages are not implemented.
- The API base URL is currently configured in `src/services/api.js`.

## Reflection

While building this frontend, I learned how to create a complete React user interface for a CRM system and connect it with an Express backend API. I implemented protected routes, login, dashboard statistics, lead management, search, filtering, pagination, status updates, and notes.

The most challenging part was connecting the frontend with the deployed backend and handling deployment using Nginx, Cloudflare DNS, and GitHub Actions CI/CD. This project helped me improve my understanding of frontend structure, API integration, responsive UI design, authentication flow, and deployment.

If I had more time, I would improve the frontend by adding user role-based UI permissions, note editing, advanced charts, activity timeline, better loading skeletons, and email reminder features.

## Related Links

Backend Repository:

```txt
https://github.com/HVPasindu/CRM-Application-backend.git
```

Demo Video:

```txt
https://drive.google.com/file/d/1hjZKpjI1R9dPEW1wyw46TxfpeGDykNkX/view?usp=sharing
```

Deployed Frontend:

```txt
https://crm.pasindujayarathna.me
```

Deployed Backend:

```txt
https://crmbackend.pasindujayarathna.me
```