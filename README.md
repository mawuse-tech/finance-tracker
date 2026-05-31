# Finance Tracker

A full-stack Nuxt 3 personal finance dashboard using MongoDB Atlas, Mongoose, Pinia, and Tailwind CSS.

## Tech Stack

- Nuxt 3
- Vue 3 Composition API
- Pinia
- MongoDB Atlas
- Mongoose
- Tailwind CSS
- Chart.js

## Project Setup

Install dependencies:

```sh
npm install
```

Create a local environment file:

```sh
Copy-Item .env.example .env
```

Update `.env` with your MongoDB Atlas connection string:

```sh
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/finance_tracker?retryWrites=true&w=majority
MONGODB_DATABASE=finance_tracker
```

Run the app:

```sh
npm run dev
```

The Nuxt app and API routes run together. Transaction data is persisted through MongoDB instead of localStorage or json-server.

## API Routes

- `GET /api/transactions`
- `POST /api/transactions`
- `GET /api/transactions/:id`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`

## Quality Checks

```sh
npm run type-check
npm run build
```

## Deploying to Render

Deploy this project as a Render Web Service, not a Static Site, because the Nuxt
server also hosts the `/api/transactions` routes.

Use these settings if configuring the service manually:

```sh
Build Command: npm ci && npm run build
Start Command: npm run start
```

Set these environment variables in Render:

```sh
HOST=0.0.0.0
MONGODB_URI=<your MongoDB Atlas connection string>
MONGODB_DATABASE=finance_tracker
```

The included `render.yaml` contains the same build and start commands for Render
Blueprint deployments.
