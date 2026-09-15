# Short URL Service

A small URL shortening service built with Node.js, Express, MongoDB, Mongoose, and EJS. Users can create accounts, sign in, generate short URLs, and view click analytics for URLs they create.

## Features

- User signup and login
- Cookie-based JWT authentication
- Short URL generation with six-character IDs
- Redirect tracking with visit timestamps
- Per-URL click analytics
- Admin view for all shortened URLs
- EJS server-rendered pages

## Requirements

- Node.js 18 or later
- MongoDB running locally on `127.0.0.1:27017`

The application uses the `short-url` MongoDB database by default.

## Installation

```bash
git clone https://github.com/Prashant-Dayal/short-url-service.git
cd short-url-service
npm install
```

Start MongoDB, then start the application:

```bash
npm start
```

The server runs at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open `http://localhost:3000/signup` and create an account.
2. Sign in at `http://localhost:3000/login`.
3. Submit a destination URL from the home page.
4. Open the generated short URL at `http://localhost:3000/<shortId>`.

Each visit is recorded and the visitor is redirected to the original destination.

## API Endpoints

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `GET` | `/signup` | No | Signup page |
| `POST` | `/user` | No | Create a user account |
| `GET` | `/login` | No | Login page |
| `POST` | `/user/login` | No | Log in and set an auth cookie |
| `GET` | `/` | User | Show the current user's URLs |
| `POST` | `/url` | User | Create a short URL; send `url` in the request body |
| `GET` | `/url/analytics/:shortID` | User | Return click count and visit timestamps |
| `GET` | `/:shortId` | No | Redirect to the original URL and record a visit |
| `GET` | `/admin/urls` | Admin | Show all shortened URLs |

Example request:

```bash
curl -X POST http://localhost:3000/url \
  -H "Content-Type: application/json" \
  -H "Cookie: token=<your-auth-token>" \
  -d '{"url":"https://example.com"}'
```

## Project Structure

```text
connection/   MongoDB connection helper
controllers/  URL and user request handlers
middleware/   Authentication and role checks
model/        Mongoose schemas
routes/       Express route definitions
service/      JWT authentication service
view/         EJS templates
index.js      Application entry point
```

## Notes

- The current application expects MongoDB at `mongodb://127.0.0.1:27017/short-url`.
- The `npm start` script uses Nodemon for development.
- Authentication and password handling are intended for development use and should be hardened before production deployment. In particular, move secrets to environment variables and hash passwords before deploying.

## License

This project is currently published without a specified open-source license.