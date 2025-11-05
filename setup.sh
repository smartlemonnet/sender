#!/bin/bash

# Quick start script for Sender application

echo "🚀 Starting Sender Application Setup..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null
then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   mongod"
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your configuration before running the app"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Check if client node_modules exists
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client && npm install && cd ..
fi

# Seed database with sample packages
echo "🌱 Seeding database with sample email packages..."
npm run seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "  Backend:  npm start"
echo "  Frontend: cd client && npm run dev"
echo "  Both:     npm run dev:full (requires concurrently)"
echo ""
echo "Access the application at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo ""
