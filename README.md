# TPTT API

Backend API for the **Travel & Tours Management Mobile Application**. Provides authentication, travel package management, booking requests, visa assistance, document uploads, and notifications for the [tptt-mobile](../tptt-mobile) Expo app (and, later, an Admin Web Dashboard).

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication (`jsonwebtoken`, `bcryptjs`)
- Cloudinary (file storage) + Multer (upload handling)
- `express-validator` for request validation

## Project Structure

```
src/
├── config/
│   ├── db.js            # MongoDB connection
│   └── cloudinary.js    # Cloudinary SDK config
├── models/               # Mongoose schemas
├── controllers/          # Route handler logic
├── routes/                # Express routers
├── middleware/
│   ├── auth.js           # JWT verification + role-based authorization
│   ├── upload.js         # Multer upload config
│   └── errorHandler.js   # 404 + centralized error handling
├── utils/
├── app.js                 # Express app setup
└── server.js               # Entry point (DB connect + listen)
```

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy the environment template and fill in your values
   ```bash
   cp .env.example .env
   ```
3. Run the dev server (auto-restarts on changes)
   ```bash
   npm run dev
   ```
4. Confirm it's running
   ```bash
   curl http://localhost:5000/api/health
   ```

## Environment Variables

| Variable | Description |
| --- | --- |
| `PORT` | Port the API listens on (default `5000`) |
| `NODE_ENV` | `development` \| `production` \| `test` |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | JWT expiry (e.g. `7d`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

## User Roles

- **customer** — register/login, browse packages, submit bookings, request visa assistance, upload documents, track status, receive notifications.
- **admin** — manage packages, view customers, review requests, update request status, send notifications.

## API Endpoints

### Authentication
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | ✅ Implemented |
| POST | `/api/auth/login` | Public | ✅ Implemented |
| GET | `/api/auth/profile` | Authenticated | ✅ Implemented |

### Packages
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| GET | `/api/packages` | Public | ✅ Implemented |
| GET | `/api/packages/:id` | Public | ✅ Implemented |
| POST | `/api/packages` | Admin | ✅ Implemented |
| PUT | `/api/packages/:id` | Admin | ✅ Implemented |
| DELETE | `/api/packages/:id` | Admin | ✅ Implemented |

### Bookings
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| POST | `/api/bookings` | Customer | ✅ Implemented |
| GET | `/api/bookings/my-bookings` | Customer | ✅ Implemented |
| GET | `/api/bookings` | Admin | ✅ Implemented |
| PATCH | `/api/bookings/:id/status` | Admin | ✅ Implemented |

### Visa Requests
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| POST | `/api/visa` | Customer | ✅ Implemented |
| GET | `/api/visa/my-requests` | Customer | ✅ Implemented |
| GET | `/api/visa` | Admin | ✅ Implemented |
| PATCH | `/api/visa/:id/status` | Admin | ✅ Implemented |

### Documents
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| POST | `/api/documents/upload` | Customer | ✅ Implemented |
| GET | `/api/documents/:visaRequestId` | Customer/Admin | ✅ Implemented |

### Notifications
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| GET | `/api/notifications` | Authenticated | Not yet implemented |
| PATCH | `/api/notifications/:id/read` | Authenticated | Not yet implemented |

## Branch Workflow

Each feature is built on its own `feature/<name>` branch, pushed for review/merge before the next one starts. This README's endpoint statuses are updated as each feature ships.

## Roadmap

1. ✅ Auth (register/login/profile) + JWT
2. ✅ Travel Packages (CRUD)
3. ✅ Bookings
4. ✅ Visa Requests
5. ✅ Documents (Cloudinary upload)
6. Notifications
