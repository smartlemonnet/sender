# Project Overview - Sender Email Web Application

## Project Summary

**Sender** is a complete web application for sending and receiving emails with an integrated e-commerce platform for selling email service packages. Built with modern web technologies, it provides a full-stack solution for email management and monetization.

**Original Requirement (Italian):** "una web-app completa per inviare e ricevere mail e vendere caselle di posta"

**Translation:** A complete web-app to send and receive emails and sell email boxes/accounts

## Technology Stack

### Backend
- **Runtime:** Node.js (v14+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Email Sending:** Nodemailer (SMTP)
- **Email Receiving:** imap-simple (IMAP)
- **Payments:** Stripe
- **Validation:** express-validator
- **Security:** bcryptjs for password hashing

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Payments UI:** Stripe Elements
- **Security:** DOMPurify for XSS protection
- **Styling:** Custom CSS

## Project Structure

```
sender/
├── server/                      # Backend application
│   ├── models/                  # Mongoose models
│   │   ├── User.js             # User model with auth
│   │   ├── Email.js            # Email message model
│   │   ├── EmailPackage.js     # Shop product model
│   │   └── Purchase.js         # Transaction model
│   ├── routes/                 # API routes
│   │   ├── auth.js             # Authentication endpoints
│   │   ├── email.js            # Email CRUD operations
│   │   └── shop.js             # E-commerce endpoints
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js             # JWT verification
│   │   └── adminCheck.js       # Admin authorization
│   └── index.js                # Express server setup
│
├── client/                     # Frontend application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   └── Header.jsx      # Navigation header
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── Login.jsx       # Login form
│   │   │   ├── Register.jsx    # Registration form
│   │   │   ├── EmailList.jsx   # Inbox view
│   │   │   ├── SendEmail.jsx   # Compose email
│   │   │   ├── EmailConfig.jsx # SMTP/IMAP settings
│   │   │   └── Shop.jsx        # Package marketplace
│   │   ├── context/            # React Context
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── services/           # API services
│   │   │   └── api.js          # Axios configuration
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   └── package.json            # Frontend dependencies
│
├── Documentation Files
│   ├── README.md               # Main documentation
│   ├── API.md                  # API reference
│   ├── DEPLOYMENT.md           # Deployment guide
│   ├── SECURITY.md             # Security policy
│   ├── SECURITY_SUMMARY.md     # CodeQL analysis
│   └── CONTRIBUTING.md         # Contribution guide
│
├── Configuration Files
│   ├── .env.example            # Environment template
│   ├── .gitignore              # Git ignore rules
│   ├── package.json            # Backend dependencies
│   └── seed.js                 # Database seeding
│
└── Scripts
    └── setup.sh                # Quick setup script

```

## Key Features

### 1. User Management
- User registration with email/password
- Secure login with JWT tokens
- Profile management
- Password hashing with bcrypt

### 2. Email Operations
- **Send Emails**
  - SMTP integration with any email provider
  - Support for plain text and HTML emails
  - Multiple recipients
  - Email tracking (sent status)

- **Receive Emails**
  - IMAP integration for fetching emails
  - Inbox view with list/detail
  - Mark emails as read
  - Email deletion

- **Email Configuration**
  - Custom SMTP server settings
  - Custom IMAP server settings
  - Support for Gmail (with App Passwords)
  - Secure credential storage

### 3. E-commerce (Shop)
- Browse email service packages
- Multiple pricing tiers
- Stripe payment integration
- Purchase history tracking
- Package features display
- Admin package management

### 4. Security Features
- JWT authentication with expiration
- Password hashing (bcrypt)
- Input validation (express-validator)
- XSS protection (DOMPurify + server-side sanitization)
- HTML email sanitization
- MongoDB injection prevention
- Admin authorization middleware
- Secure environment variable handling

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/email-config` - Update email settings

### Email
- `POST /api/email/send` - Send email
- `GET /api/email/fetch` - Fetch from IMAP
- `GET /api/email/list` - List user emails
- `GET /api/email/:id` - Get single email
- `DELETE /api/email/:id` - Delete email

### Shop
- `GET /api/shop/packages` - List packages
- `GET /api/shop/packages/:id` - Get package
- `POST /api/shop/create-payment-intent` - Create payment
- `POST /api/shop/purchase` - Complete purchase
- `GET /api/shop/my-purchases` - User purchases
- `POST /api/shop/packages` - Create package (admin)

## Database Models

### User
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  emailConfig: {
    smtp: { host, port, secure, user, password },
    imap: { host, port, tls, user, password }
  },
  createdAt: Date
}
```

### Email
```javascript
{
  userId: ObjectId,
  from: String,
  to: [String],
  subject: String,
  text: String,
  html: String,
  status: Enum ['sent', 'received', 'draft', 'failed'],
  sentAt/receivedAt: Date,
  createdAt: Date
}
```

### EmailPackage
```javascript
{
  name: String,
  description: String,
  price: Number,
  features: [String],
  storageGB: Number,
  emailsPerDay: Number,
  customDomain: Boolean,
  active: Boolean,
  createdAt: Date
}
```

### Purchase
```javascript
{
  userId: ObjectId,
  packageId: ObjectId,
  stripePaymentId: String,
  amount: Number,
  status: Enum ['pending', 'completed', 'failed', 'refunded'],
  expiresAt: Date,
  createdAt: Date
}
```

## Setup & Installation

### Quick Start
```bash
# Clone repository
git clone https://github.com/smartlemonnet/sender.git
cd sender

# Run setup script
chmod +x setup.sh
./setup.sh

# Start backend
npm start

# Start frontend (new terminal)
cd client && npm run dev
```

### Manual Setup
```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Seed database
npm run seed

# Start servers
npm start                    # Backend
cd client && npm run dev     # Frontend
```

## Configuration

### Environment Variables
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sender
JWT_SECRET=your-secure-secret-key
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_xxx
```

### Email Providers
Supports any SMTP/IMAP provider:
- Gmail (requires App Password)
- Outlook/Hotmail
- Yahoo Mail
- Custom mail servers

## Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server (with nodemon)
- `npm run seed` - Seed database with sample packages

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Testing

Currently, the project doesn't include a test suite. Contributions for testing are welcome!

Recommended testing approach:
- Backend: Jest + Supertest
- Frontend: Jest + React Testing Library
- E2E: Cypress or Playwright

## Security

### Implemented
- ✅ JWT authentication
- ✅ Password hashing
- ✅ Input validation
- ✅ XSS protection
- ✅ HTML sanitization
- ✅ Admin authorization
- ✅ Secure environment variables

### Production Recommendations
- ⚠️ Implement rate limiting
- ⚠️ Add RBAC system
- ⚠️ Enable HTTPS
- ⚠️ Set up monitoring
- ⚠️ Implement 2FA
- ⚠️ Add email verification

See SECURITY_SUMMARY.md for detailed security analysis.

## Deployment

The application can be deployed to:
- Heroku
- DigitalOcean
- AWS
- Google Cloud Platform
- Any VPS with Node.js support

See DEPLOYMENT.md for detailed deployment instructions.

## Future Enhancements

### High Priority
- Rate limiting implementation
- Comprehensive test coverage
- Email search and filtering
- Email attachments support
- Draft email saving

### Medium Priority
- Email templates
- Contact management
- Email scheduling
- Bulk email sending
- Email signatures
- Mobile responsiveness improvements

### Low Priority
- Email forwarding rules
- Spam filtering
- Email labels/folders
- Calendar integration
- Team collaboration features

## Contributing

We welcome contributions! See CONTRIBUTING.md for guidelines.

## License

ISC

## Support

- GitHub Issues: https://github.com/smartlemonnet/sender/issues
- Email: support@sender.example.com
- Documentation: See docs in repository

## Credits

Developed as part of the bluelime universe project.

## Version History

- **v1.0.0** (2024-11-05)
  - Initial release
  - Complete email management
  - E-commerce integration
  - Security hardening
  - Comprehensive documentation

---

**Note:** This is an MVP (Minimum Viable Product). While functional and secure for development/testing, additional hardening is recommended for production use. See SECURITY_SUMMARY.md for details.
