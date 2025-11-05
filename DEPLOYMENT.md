# Deployment Guide for Sender Application

## Prerequisites

- Node.js 14+ installed
- MongoDB database (local or cloud like MongoDB Atlas)
- Stripe account for payment processing
- Domain name (optional, for production)

## Environment Setup

### 1. Clone and Install

```bash
git clone https://github.com/smartlemonnet/sender.git
cd sender
npm install
cd client && npm install && cd ..
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sender

# Security
JWT_SECRET=your-secure-random-jwt-secret-at-least-32-characters-long

# Stripe
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
```

### 3. Seed Database

```bash
npm run seed
```

## Production Deployment

### Option 1: Deploy to Heroku

1. Install Heroku CLI
2. Login to Heroku: `heroku login`
3. Create app: `heroku create sender-app`
4. Add MongoDB: `heroku addons:create mongolab:sandbox`
5. Set environment variables:
```bash
heroku config:set JWT_SECRET=your-secret
heroku config:set STRIPE_SECRET_KEY=sk_live_xxx
heroku config:set STRIPE_PUBLIC_KEY=pk_live_xxx
```
6. Deploy: `git push heroku main`

### Option 2: Deploy to DigitalOcean/AWS/VPS

1. **Server Setup**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install MongoDB
   # Follow: https://docs.mongodb.com/manual/installation/
   
   # Install PM2
   sudo npm install -g pm2
   ```

2. **Clone and Configure**
   ```bash
   git clone https://github.com/smartlemonnet/sender.git
   cd sender
   npm install
   cd client && npm install && npm run build && cd ..
   cp .env.example .env
   # Edit .env with production values
   ```

3. **Start with PM2**
   ```bash
   pm2 start server/index.js --name sender
   pm2 startup
   pm2 save
   ```

4. **Setup Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

### Option 3: Deploy Frontend to Vercel/Netlify

1. **Build Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Update API URL**
   In `client/src/services/api.js`, update the API URL to your backend URL.

## Post-Deployment

### 1. Create Admin User

Use the API or MongoDB directly to create an admin user if needed.

### 2. Add Email Packages

Either use the seed script or create packages via the API:

```bash
curl -X POST https://your-domain.com/api/shop/packages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Basic",
    "description": "Perfect for personal use",
    "price": 29.99,
    "features": ["Feature 1", "Feature 2"],
    "storageGB": 5,
    "emailsPerDay": 100,
    "customDomain": false
  }'
```

### 3. Configure Stripe Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.failed`

### 4. Monitor Application

```bash
# View logs with PM2
pm2 logs sender

# Monitor resources
pm2 monit
```

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong JWT_SECRET
- [ ] Enable MongoDB authentication
- [ ] Set up firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up backup strategy
- [ ] Configure CORS properly
- [ ] Keep dependencies updated
- [ ] Enable security headers

## Backup Strategy

### Database Backup

```bash
# Backup
mongodump --uri="mongodb://localhost:27017/sender" --out=/backup/sender

# Restore
mongorestore --uri="mongodb://localhost:27017/sender" /backup/sender
```

### Automated Daily Backups

Add to crontab:
```bash
0 2 * * * mongodump --uri="mongodb://localhost:27017/sender" --out=/backup/sender-$(date +\%Y\%m\%d)
```

## Troubleshooting

### MongoDB Connection Issues
- Check MONGODB_URI format
- Verify MongoDB is running
- Check firewall rules

### Email Not Sending
- Verify SMTP configuration
- Check email credentials
- Ensure app passwords for Gmail

### Payment Issues
- Verify Stripe keys (test vs live)
- Check webhook configuration
- Review Stripe logs

## Monitoring & Maintenance

### Set Up Health Checks

Create a health endpoint and monitor with services like:
- UptimeRobot
- Pingdom
- StatusCake

### Log Management

Consider using:
- Winston for logging
- LogRocket for frontend errors
- Sentry for error tracking

### Performance Monitoring

- New Relic
- DataDog
- PM2 Plus

## Scaling

### Horizontal Scaling

1. Use load balancer (Nginx/HAProxy)
2. Multiple server instances with PM2 cluster mode
3. Shared session storage (Redis)

### Database Scaling

1. MongoDB replica sets
2. Sharding for large datasets
3. Read replicas

## Updates & Maintenance

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm update
cd client && npm update && cd ..

# Rebuild frontend
cd client && npm run build && cd ..

# Restart application
pm2 restart sender
```

## Support

For issues and questions:
- GitHub Issues: https://github.com/smartlemonnet/sender/issues
- Email: support@sender.example.com
