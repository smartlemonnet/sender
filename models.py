"""
Database models for Sender email marketing platform
"""
from datetime import datetime
from database import db

class Contact(db.Model):
    """Contact/Subscriber model"""
    __tablename__ = 'contacts'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100))
    status = db.Column(db.String(20), default='active')  # active, unsubscribed, bounced
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Campaign(db.Model):
    """Email campaign model"""
    __tablename__ = 'campaigns'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey('email_templates.id'))
    status = db.Column(db.String(20), default='draft')  # draft, scheduled, sent
    sent_at = db.Column(db.DateTime)
    sent_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    template = db.relationship('EmailTemplate', backref='campaigns')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'subject': self.subject,
            'template_id': self.template_id,
            'status': self.status,
            'sent_at': self.sent_at.isoformat() if self.sent_at else None,
            'sent_count': self.sent_count,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class EmailTemplate(db.Model):
    """Email template model"""
    __tablename__ = 'email_templates'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'content': self.content,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
