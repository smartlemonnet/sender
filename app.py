"""
Sender - Email Marketing Platform
Main application module
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

from database import db
from models import Contact, Campaign, EmailTemplate

def create_app():
    """Application factory"""
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///sender.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    CORS(app)
    
    with app.app_context():
        db.create_all()
    
    # Register routes
    register_routes(app)
    
    return app

def register_routes(app):
    """Register application routes"""
    
    @app.route('/')
    def index():
        """Home endpoint"""
        return jsonify({
            'name': 'Sender - Email Marketing Platform',
            'version': '1.0.0',
            'description': 'Piattaforma di email marketing per Bluelime Universe'
        })

    # Contact Management Endpoints
    @app.route('/api/contacts', methods=['GET', 'POST'])
    def contacts():
        """Get all contacts or create a new contact"""
        if request.method == 'POST':
            data = request.json
            
            # Validate required fields
            if not data or 'email' not in data:
                return jsonify({'error': 'Email is required'}), 400
            
            contact = Contact(
                email=data['email'],
                name=data.get('name', ''),
                status=data.get('status', 'active')
            )
            db.session.add(contact)
            db.session.commit()
            return jsonify(contact.to_dict()), 201
        
        contacts = Contact.query.all()
        return jsonify([c.to_dict() for c in contacts])

    @app.route('/api/contacts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
    def contact_detail(id):
        """Get, update or delete a specific contact"""
        contact = Contact.query.get_or_404(id)
        
        if request.method == 'DELETE':
            db.session.delete(contact)
            db.session.commit()
            return '', 204
        
        if request.method == 'PUT':
            data = request.json
            contact.email = data.get('email', contact.email)
            contact.name = data.get('name', contact.name)
            contact.status = data.get('status', contact.status)
            db.session.commit()
            return jsonify(contact.to_dict())
        
        return jsonify(contact.to_dict())

    # Campaign Management Endpoints
    @app.route('/api/campaigns', methods=['GET', 'POST'])
    def campaigns():
        """Get all campaigns or create a new campaign"""
        if request.method == 'POST':
            data = request.json
            
            # Validate required fields
            if not data or 'name' not in data or 'subject' not in data:
                return jsonify({'error': 'Name and subject are required'}), 400
            
            campaign = Campaign(
                name=data['name'],
                subject=data['subject'],
                template_id=data.get('template_id'),
                status=data.get('status', 'draft')
            )
            db.session.add(campaign)
            db.session.commit()
            return jsonify(campaign.to_dict()), 201
        
        campaigns = Campaign.query.all()
        return jsonify([c.to_dict() for c in campaigns])

    @app.route('/api/campaigns/<int:id>', methods=['GET', 'PUT', 'DELETE'])
    def campaign_detail(id):
        """Get, update or delete a specific campaign"""
        campaign = Campaign.query.get_or_404(id)
        
        if request.method == 'DELETE':
            db.session.delete(campaign)
            db.session.commit()
            return '', 204
        
        if request.method == 'PUT':
            data = request.json
            campaign.name = data.get('name', campaign.name)
            campaign.subject = data.get('subject', campaign.subject)
            campaign.template_id = data.get('template_id', campaign.template_id)
            campaign.status = data.get('status', campaign.status)
            db.session.commit()
            return jsonify(campaign.to_dict())
        
        return jsonify(campaign.to_dict())

    @app.route('/api/campaigns/<int:id>/send', methods=['POST'])
    def send_campaign(id):
        """Send a campaign to all active contacts"""
        campaign = Campaign.query.get_or_404(id)
        
        if campaign.status == 'sent':
            return jsonify({'error': 'Campaign already sent'}), 400
        
        # Get all active contacts
        contacts = Contact.query.filter_by(status='active').all()
        
        if not contacts:
            return jsonify({'error': 'No active contacts found'}), 400
        
        # Get template if specified
        template = None
        if campaign.template_id:
            template = EmailTemplate.query.get(campaign.template_id)
        
        # Send emails (simulated for now)
        # TODO: In production, implement actual email sending using:
        # - SMTP server (e.g., Gmail, SendGrid, Mailgun)
        # - Email content from template if available
        # - Track delivery status and errors
        # - Implement rate limiting and queue management
        sent_count = 0
        for contact in contacts:
            # Production implementation would send actual emails here
            sent_count += 1
        
        # Update campaign status
        campaign.status = 'sent'
        campaign.sent_at = datetime.utcnow()
        campaign.sent_count = sent_count
        db.session.commit()
        
        return jsonify({
            'message': 'Campaign sent successfully',
            'sent_count': sent_count,
            'campaign': campaign.to_dict()
        })

    # Email Template Endpoints
    @app.route('/api/templates', methods=['GET', 'POST'])
    def templates():
        """Get all templates or create a new template"""
        if request.method == 'POST':
            data = request.json
            
            # Validate required fields
            if not data or 'name' not in data or 'content' not in data:
                return jsonify({'error': 'Name and content are required'}), 400
            
            template = EmailTemplate(
                name=data['name'],
                content=data['content'],
                description=data.get('description', '')
            )
            db.session.add(template)
            db.session.commit()
            return jsonify(template.to_dict()), 201
        
        templates = EmailTemplate.query.all()
        return jsonify([t.to_dict() for t in templates])

    @app.route('/api/templates/<int:id>', methods=['GET', 'PUT', 'DELETE'])
    def template_detail(id):
        """Get, update or delete a specific template"""
        template = EmailTemplate.query.get_or_404(id)
        
        if request.method == 'DELETE':
            db.session.delete(template)
            db.session.commit()
            return '', 204
        
        if request.method == 'PUT':
            data = request.json
            template.name = data.get('name', template.name)
            template.content = data.get('content', template.content)
            template.description = data.get('description', template.description)
            db.session.commit()
            return jsonify(template.to_dict())
        
        return jsonify(template.to_dict())

    # Analytics Endpoint
    @app.route('/api/analytics')
    def analytics():
        """Get platform analytics"""
        total_contacts = Contact.query.count()
        active_contacts = Contact.query.filter_by(status='active').count()
        total_campaigns = Campaign.query.count()
        sent_campaigns = Campaign.query.filter_by(status='sent').count()
        total_templates = EmailTemplate.query.count()
        
        return jsonify({
            'contacts': {
                'total': total_contacts,
                'active': active_contacts,
                'inactive': total_contacts - active_contacts
            },
            'campaigns': {
                'total': total_campaigns,
                'sent': sent_campaigns,
                'draft': total_campaigns - sent_campaigns
            },
            'templates': {
                'total': total_templates
            }
        })

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
