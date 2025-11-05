# API Documentation

Base URL: `http://localhost:5000/api` (development) or `https://your-domain.com/api` (production)

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Tokens are obtained from the login or register endpoints and expire after 7 days.

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### Get Current User
```
GET /auth/me
```
*Requires authentication*

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "name": "John Doe",
  "emailConfig": {
    "smtp": {
      "host": "smtp.gmail.com",
      "port": 587,
      "secure": false,
      "user": "john@example.com"
    },
    "imap": {
      "host": "imap.gmail.com",
      "port": 993,
      "tls": true,
      "user": "john@example.com"
    }
  },
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update Email Configuration
```
PUT /auth/email-config
```
*Requires authentication*

**Request Body:**
```json
{
  "smtp": {
    "host": "smtp.gmail.com",
    "port": 587,
    "secure": false,
    "user": "john@example.com",
    "password": "app_password"
  },
  "imap": {
    "host": "imap.gmail.com",
    "port": 993,
    "tls": true,
    "user": "john@example.com",
    "password": "app_password"
  }
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "name": "John Doe",
  "emailConfig": { ... }
}
```

### Email Management

#### Send Email
```
POST /email/send
```
*Requires authentication*

**Request Body:**
```json
{
  "to": ["recipient@example.com", "another@example.com"],
  "subject": "Test Email",
  "text": "This is a plain text message",
  "html": "<p>This is an <strong>HTML</strong> message</p>"
}
```

**Response (200):**
```json
{
  "message": "Email sent successfully",
  "email": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "from": "john@example.com",
    "to": ["recipient@example.com", "another@example.com"],
    "subject": "Test Email",
    "text": "This is a plain text message",
    "html": "<p>This is an <strong>HTML</strong> message</p>",
    "status": "sent",
    "sentAt": "2024-01-01T12:00:00.000Z",
    "createdAt": "2024-01-01T12:00:00.000Z"
  },
  "messageId": "<message-id@smtp.gmail.com>"
}
```

#### Fetch Emails from IMAP
```
GET /email/fetch
```
*Requires authentication*

**Response (200):**
```json
{
  "message": "Emails fetched successfully",
  "count": 5,
  "emails": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439011",
      "from": "sender@example.com",
      "to": ["john@example.com"],
      "subject": "Welcome",
      "text": "Welcome to our service",
      "status": "received",
      "receivedAt": "2024-01-01T10:00:00.000Z",
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

#### List Emails
```
GET /email/list?status=sent&limit=50&skip=0
```
*Requires authentication*

**Query Parameters:**
- `status` (optional): Filter by status (`sent`, `received`, `draft`, `failed`)
- `limit` (optional): Number of results (default: 50)
- `skip` (optional): Number of results to skip (default: 0)

**Response (200):**
```json
{
  "emails": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "from": "john@example.com",
      "to": ["recipient@example.com"],
      "subject": "Test Email",
      "status": "sent",
      "sentAt": "2024-01-01T12:00:00.000Z",
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ],
  "total": 42
}
```

#### Get Single Email
```
GET /email/:id
```
*Requires authentication*

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "from": "john@example.com",
  "to": ["recipient@example.com"],
  "subject": "Test Email",
  "text": "This is a plain text message",
  "html": "<p>This is an <strong>HTML</strong> message</p>",
  "status": "sent",
  "sentAt": "2024-01-01T12:00:00.000Z",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

#### Delete Email
```
DELETE /email/:id
```
*Requires authentication*

**Response (200):**
```json
{
  "message": "Email deleted successfully"
}
```

### Shop / E-commerce

#### Get All Packages
```
GET /shop/packages
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Basic",
    "description": "Perfect for personal use",
    "price": 29.99,
    "features": [
      "Web-based email client",
      "Mobile app access",
      "Basic spam protection"
    ],
    "storageGB": 5,
    "emailsPerDay": 100,
    "customDomain": false,
    "active": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Single Package
```
GET /shop/packages/:id
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Basic",
  "description": "Perfect for personal use",
  "price": 29.99,
  "features": ["Feature 1", "Feature 2"],
  "storageGB": 5,
  "emailsPerDay": 100,
  "customDomain": false,
  "active": true
}
```

#### Create Payment Intent
```
POST /shop/create-payment-intent
```
*Requires authentication*

**Request Body:**
```json
{
  "packageId": "507f1f77bcf86cd799439014"
}
```

**Response (200):**
```json
{
  "clientSecret": "pi_1234_secret_5678",
  "amount": 29.99
}
```

#### Complete Purchase
```
POST /shop/purchase
```
*Requires authentication*

**Request Body:**
```json
{
  "packageId": "507f1f77bcf86cd799439014",
  "paymentIntentId": "pi_1234567890"
}
```

**Response (200):**
```json
{
  "message": "Purchase completed successfully",
  "purchase": {
    "_id": "507f1f77bcf86cd799439015",
    "userId": "507f1f77bcf86cd799439011",
    "packageId": "507f1f77bcf86cd799439014",
    "stripePaymentId": "pi_1234567890",
    "amount": 29.99,
    "status": "completed",
    "expiresAt": "2025-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Get My Purchases
```
GET /shop/my-purchases
```
*Requires authentication*

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "userId": "507f1f77bcf86cd799439011",
    "packageId": {
      "_id": "507f1f77bcf86cd799439014",
      "name": "Basic",
      "price": 29.99
    },
    "stripePaymentId": "pi_1234567890",
    "amount": 29.99,
    "status": "completed",
    "expiresAt": "2025-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
]
```

#### Create Package (Admin)
```
POST /shop/packages
```
*Requires authentication*

**Request Body:**
```json
{
  "name": "Premium",
  "description": "For power users",
  "price": 99.99,
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "storageGB": 50,
  "emailsPerDay": 1000,
  "customDomain": true
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439016",
  "name": "Premium",
  "description": "For power users",
  "price": 99.99,
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "storageGB": 50,
  "emailsPerDay": 1000,
  "customDomain": true,
  "active": true,
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Invalid credentials"
}
```

### 401 Unauthorized
```json
{
  "message": "No authentication token, access denied"
}
```

### 404 Not Found
```json
{
  "message": "Email not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Detailed error message"
}
```

## Rate Limiting

Currently, there's no rate limiting implemented. For production use, consider implementing rate limiting to prevent abuse.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Send Email
```bash
curl -X POST http://localhost:5000/api/email/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"to":["recipient@example.com"],"subject":"Test","text":"Hello"}'
```

## Postman Collection

A Postman collection is available for easier testing: [Link to be added]
