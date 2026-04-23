# Authentication with n8n Email Automation

A **Next.js (App Router)** demo that uses **Firebase Authentication + Firestore** for user signup/login, then triggers an **n8n webhook** on successful registration so you can automate **welcome emails / CRM sync / Slack alerts / etc.**

## What it does

- **Register** a user with Firebase Auth (email/password)
- Store a user profile in **Firestore**
- Call `POST /api/signup` which forwards the signup payload to an **n8n Cloud webhook**
- **Login** with Firebase Auth
- Simple **Dashboard** for logged-in users + Logout

## Tech Stack

- **Next.js** 16 (App Router)
- **Firebase**: Auth + Firestore
- **n8n**: webhook-triggered automation
- **Tailwind CSS** (configured in the project)

## Project Structure (key files)

- `src/firebase.js` — Firebase initialization (Auth + Firestore)
- `src/app/Register/page.jsx` — signup flow + calls `/api/signup`
- `src/app/Login/page.jsx` — login flow
- `src/app/Home/page.jsx` — dashboard + logout
- `src/app/api/signup/route.js` — forwards signup data to n8n webhook

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure Firebase

This repo currently contains Firebase config inline in `src/firebase.js`.

Recommended setup:
- Create a Firebase project
- Enable **Authentication → Email/Password**
- Create a **Firestore** database

### 3) Configure n8n webhook

The Next.js API route forwards signup data to this webhook URL:

- `src/app/api/signup/route.js` → `https://aric.app.n8n.cloud/webhook/new-signup`

Update that URL to your own n8n webhook.

**Payload sent to n8n** (example):

```json
{
  "email": "user@example.com",
  "displayName": "Ada Lovelace",
  "uid": "firebase-uid",
  "createdAt": "2026-04-23T12:34:56.000Z"
}
```

### 4) Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## How the automation works (flow)

1. User registers on `/Register`
2. Firebase creates the account (Auth)
3. App writes a `users/{uid}` document (Firestore)
4. App calls `POST /api/signup`
5. `POST /api/signup` forwards the data to the configured n8n webhook
6. n8n workflow sends email / logs / integrates with other tools

## Notes / Security

- **Do not commit secrets** (API keys, webhook secrets). Prefer environment variables for:
  - Firebase config
  - n8n webhook URL
- Consider adding webhook verification (shared secret / signature) so only your app can trigger automations.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm start` — run production server
- `npm run lint` — lint
