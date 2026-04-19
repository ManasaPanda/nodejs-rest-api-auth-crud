# 🔐 Node.js Auth System (JWT + Refresh Token)

A backend authentication system built using **Node.js, Express, Sequelize, and MySQL** implementing:

* User Registration & Login
* JWT Authentication
* Access Token & Refresh Token Flow
* Protected Routes (Auth Middleware)
* Role-Based Authorization (RBAC)
* CRUD operations with search functionality

---

## 🚀 Features

### ✅ Authentication

* Register new users
* Login with email & password
* Password hashing using bcrypt

### 🔐 JWT Security

* Access Token (short expiry)
* Refresh Token (long expiry)
* Token verification middleware

### 🔁 Refresh Token Flow

* Generate new access token using refresh token
* Prevents frequent login

### 👮 Authorization

* Role-based access (user/admin)
* Protected routes using middleware

###📦 Product Module
* Create Product
* Get All Products
* Get Single Product
* Update Product
* Delete Product
  
###🔍 Search & Filtering
* Search products by name
* Filter using query parameters
---

## 🛠 Tech Stack

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT (jsonwebtoken)
* bcrypt

---
## 🔐 API Endpoints

### 📝 Auth Routes

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

---

### 📦 Product Routes (Protected)

```
POST   /api/products        → Create product
GET    /api/products        → Get all products
GET    /api/products/:id    → Get single product
PUT    /api/products/:id    → Update product
DELETE /api/products/:id    → Delete product
```

---

## 🔍 Search Example

```
GET /api/products?name=phone
```

👉 Filters products by name using query params

---

## 🔁 Token Flow

```
Login →
  Access Token (15m)
  Refresh Token (7d)

Request →
  Send Access Token

Expired →
  Call /refresh using Refresh Token

Server →
  Returns new Access Token
```

---

## ⚠️ Notes

* Access token is used for API calls
* Refresh token is used only to generate new access tokens
* Never expose refresh token in frontend (use HttpOnly cookies in production)

---

## 👨‍💻 Author

Manasa Panda
