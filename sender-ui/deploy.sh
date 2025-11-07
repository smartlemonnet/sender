#!/bin/bash

# Deploy script for sender-ui to VPS
# Usage: ./deploy.sh

set -e  # Exit on error

# Configuration
VPS_HOST="147.93.56.240"
VPS_USER="root"
VPS_PATH="/opt/sender-ui"
IMAGE_NAME="sender-ui"
CONTAINER_NAME="sender-ui"

echo "🚀 Starting deployment to bluelimeuniverse.com..."

# Step 1: Build Docker image locally
echo "📦 Building Docker image..."
docker build -t $IMAGE_NAME:latest .

# Step 2: Save image to tar
echo "💾 Saving Docker image..."
docker save $IMAGE_NAME:latest | gzip > sender-ui.tar.gz

# Step 3: Copy files to VPS
echo "📤 Transferring files to VPS..."
scp sender-ui.tar.gz $VPS_USER@$VPS_HOST:/tmp/
scp docker-compose.yml $VPS_USER@$VPS_HOST:/tmp/

# Step 4: Deploy on VPS
echo "🔧 Deploying on VPS..."
ssh $VPS_USER@$VPS_HOST << 'ENDSSH'
set -e

# Create app directory
mkdir -p /opt/sender-ui
cd /opt/sender-ui

# Load Docker image
echo "Loading Docker image..."
docker load < /tmp/sender-ui.tar.gz

# Copy docker-compose file
cp /tmp/docker-compose.yml .

# Stop and remove old container if exists
docker-compose down 2>/dev/null || true

# Start new container
docker-compose up -d

# Clean up
rm /tmp/sender-ui.tar.gz /tmp/docker-compose.yml

echo "✅ Container started successfully!"
docker-compose ps
ENDSSH

# Step 5: Cleanup local files
echo "🧹 Cleaning up..."
rm sender-ui.tar.gz

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at: http://bluelimeuniverse.com:3001"
echo "📝 Next step: Configure OpenLiteSpeed to proxy port 80/443 → 3001"
