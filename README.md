<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://res.cloudinary.com/dwhejzrua/image/upload/v1729007541/ecc8eb02-058c-4fca-b62a-b2b319b48d6e-removebg-preview_vusplu.png" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">🌟 Welcome to EliteGoods API 🌟</h1>
<p align="center">A modern, secure, and scalable NestJS-based e-commerce API designed to deliver high performance and ease of use for managing product and user data.</p>

## 🚀 Overview

This project is a **NestJS**-powered backend API for **EliteGoods**, a scalable and secure e-commerce platform with features like user authentication, product management, and order processing. The API includes detailed **Swagger** documentation, making it easy for developers to explore and integrate with the endpoints.

## ✨ Key Features

- **RESTful API** with NestJS
- **User Authentication & Authorization** (JWT-based)
- **Product & Category Management**
- **Order Management**
- **Comprehensive Swagger Documentation** 📜

## 🛠 Prerequisites

- **Node.js** and **npm**
- **PostgreSQL** for database
- **Thunder Client / Postman** (recommended for API testing)

## 🏗 Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/nechodev/EliteGoods-Ecommerce
   ```
2. Navigate to the project directory:
   ```bash
   cd EliteGoods-Ecommerce
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

# 🌍 Environment Setup

## 🌱 Environment Variables

Before running the application, create a `.env` file in the root directory and populate it with the following variables:

| Variable                | Description                                           | Example Value           |
| ----------------------- | ----------------------------------------------------- | ----------------------- |
| `DB_HOST`               | Database host address.                                | `localhost`             |
| `DB_PORT`               | Database connection port.                             | `5432`                  |
| `DB_USERNAME`           | Database username.                                    | `postgres`              |
| `DB_PASSWORD`           | Database password.                                    | `your_password_here`    |
| `DB_NAME`               | Name of the database to connect to.                   | `your_database_name`    |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image storage.              | `your_cloud_name`       |
| `CLOUDINARY_API_KEY`    | Cloudinary API key for accessing Cloudinary services. | `your_api_key`          |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret for authentication.             | `your_api_secret`       |
| `JWT_SECRET`            | Secret key for signing JWT tokens.                    | `your_jwt_secret`       |
| `JWT_EXPIRES_IN`        | Duration for which the JWT token is valid.            | `1h`                    |
| `AUTH0_SECRET`          | Secret used for Auth0 integration.                    | `your_auth0_secret`     |
| `AUTH0_AUDIENCE`        | Audience for Auth0 token verification.                | `http://localhost:3000` |
| `AUTH0_CLIENT_ID`       | Client ID for your Auth0 application.                 | `your_auth0_client_id`  |
| `AUTH0_BASE_URL`        | Base URL for your Auth0 application.                  | `http://localhost:3000` |

> **Note:** Make sure to replace placeholder values with your actual configuration values.

## 🔥 Running the App

To start the application:

```
# development
$ npm run start

# watch mode
$ npm run start:dev

# production
$ npm run start:prod

```

## 🧪 Testing

The application includes tests to ensure reliability and performance.

```
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📚 API Documentation

Navigate to http://localhost:3000/docs for the full API documentation.

## 🔑 Usage

Sign Up / Log In to generate your authentication token.
Authenticate by including Authorization: Bearer <token> in the header of your requests.

## 💖 Support

Contributions are welcome! This project is licensed under the MIT License.

## 🌟 Stay Connected

NestJS Official Website
Twitter - @nestframework

## 📝 License

This project is MIT licensed.
