# Sender - Complete Email Management & Shop Web Application

Una web-app completa per inviare e ricevere email e vendere caselle di posta elettronica.

## Features

- 📧 **Email Management**: Send and receive emails with your own SMTP/IMAP configuration
- 📬 **Inbox Management**: View, organize, and manage your emails
- 🛒 **E-commerce**: Browse and purchase email packages
- 🔐 **Secure Authentication**: User registration and login with JWT
- ⚙️ **Flexible Configuration**: Configure your own email servers
- 💳 **Payment Integration**: Stripe integration for purchasing email packages

## Tech Stack

### Backend
- **Node.js** with Express
- **MongoDB** for database
- **Nodemailer** for SMTP (sending emails)
- **imap-simple** for IMAP (receiving emails)
- **Stripe** for payment processing
- **JWT** for authentication

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Stripe Elements** for payment processing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- Stripe account (for payment processing)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/smartlemonnet/sender.git
cd sender
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sender
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

5. **Start MongoDB** (if running locally)
```bash
mongod
```

6. **Start the backend server**
```bash
npm start
```

7. **Start the frontend development server** (in a new terminal)
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage

### User Registration
1. Navigate to the Register page
2. Create an account with email and password
3. You'll be automatically logged in

### Email Configuration
1. Go to Settings after logging in
2. Configure your SMTP server (for sending emails)
3. Configure your IMAP server (for receiving emails)

**Note for Gmail users**: Use an App Password instead of your regular password. Enable 2-Step Verification and generate an App Password at https://myaccount.google.com/apppasswords

### Sending Emails
1. Click "Send Email" in the navigation
2. Enter recipient(s), subject, and message
3. Optionally add HTML content
4. Click "Send Email"

### Receiving Emails
1. Go to "My Emails"
2. Click "Fetch New Emails" to retrieve emails from your IMAP server
3. Click on any email to view its full content

### Purchasing Email Packages
1. Navigate to the Shop
2. Browse available email packages
3. Click "Purchase Now" on your desired package
4. Complete the payment through Stripe

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/email-config` - Update email configuration

### Email
- `POST /api/email/send` - Send an email
- `GET /api/email/fetch` - Fetch emails from IMAP server
- `GET /api/email/list` - Get user's emails
- `GET /api/email/:id` - Get single email
- `DELETE /api/email/:id` - Delete email

### Shop
- `GET /api/shop/packages` - Get all email packages
- `GET /api/shop/packages/:id` - Get single package
- `POST /api/shop/create-payment-intent` - Create Stripe payment intent
- `POST /api/shop/purchase` - Complete purchase
- `GET /api/shop/my-purchases` - Get user's purchases
- `POST /api/shop/packages` - Create new package (admin)

## Project Structure

```
sender/
├── server/
│   ├── index.js           # Express server setup
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   ├── Email.js
│   │   ├── EmailPackage.js
│   │   └── Purchase.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── email.js
│   │   └── shop.js
│   └── middleware/        # Custom middleware
│       └── auth.js
├── client/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── Header.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── EmailList.jsx
│   │   │   ├── SendEmail.jsx
│   │   │   ├── EmailConfig.jsx
│   │   │   └── Shop.jsx
│   │   ├── context/       # React context
│   │   │   └── AuthContext.jsx
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Development

### Backend Development
```bash
npm run dev
```

### Frontend Development
```bash
cd client
npm run dev
```

### Run Both Simultaneously
```bash
npm run dev:full
```

## Security Notes

- Never commit `.env` file with real credentials
- Use environment variables for sensitive data
- For production, use proper secret management
- Enable HTTPS in production
- Validate and sanitize all user inputs
- Use strong JWT secrets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Support

For support, email support@sender.example.com or open an issue on GitHub.
