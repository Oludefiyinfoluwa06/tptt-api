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
| POST | `/api/auth/register` | Public | Not yet implemented |
| POST | `/api/auth/login` | Public | Not yet implemented |
| GET | `/api/auth/profile` | Authenticated | Not yet implemented |

### Packages
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| GET | `/api/packages` | Public | Not yet implemented |
| GET | `/api/packages/:id` | Public | Not yet implemented |
| POST | `/api/packages` | Admin | Not yet implemented |
| PUT | `/api/packages/:id` | Admin | Not yet implemented |
| DELETE | `/api/packages/:id` | Admin | Not yet implemented |

### Bookings
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| POST | `/api/bookings` | Customer | Not yet implemented |
| GET | `/api/bookings/my-bookings` | Customer | Not yet implemented |
| GET | `/api/bookings` | Admin | Not yet implemented |
| PATCH | `/api/bookings/:id/status` | Admin | Not yet implemented |

### Visa Requests
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| POST | `/api/visa` | Customer | Not yet implemented |
| GET | `/api/visa/my-requests` | Customer | Not yet implemented |
| GET | `/api/visa` | Admin | Not yet implemented |
| PATCH | `/api/visa/:id/status` | Admin | Not yet implemented |

### Documents
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| POST | `/api/documents/upload` | Customer | Not yet implemented |
| GET | `/api/documents/:visaRequestId` | Customer/Admin | Not yet implemented |

### Notifications
| Method | Endpoint | Access | Status |
| --- | --- | --- | --- |
| GET | `/api/notifications` | Authenticated | Not yet implemented |
| PATCH | `/api/notifications/:id/read` | Authenticated | Not yet implemented |

## Branch Workflow

Each feature is built on its own `feature/<name>` branch, pushed for review/merge before the next one starts. This README's endpoint statuses are updated as each feature ships.

## Roadmap

1. Auth (register/login/profile) + JWT
2. Travel Packages (CRUD)
3. Bookings
4. Visa Requests
5. Documents (Cloudinary upload)
6. Notifications
