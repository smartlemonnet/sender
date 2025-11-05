"""
Test suite for Sender email marketing platform
"""
import pytest
import json
from app import create_app
from database import db
from models import Contact, Campaign, EmailTemplate

@pytest.fixture
def client():
    """Create test client"""
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_index(client):
    """Test home endpoint"""
    response = client.get('/')
    data = json.loads(response.data)
    assert response.status_code == 200
    assert 'name' in data
    assert 'Sender' in data['name']

def test_create_contact(client):
    """Test creating a contact"""
    response = client.post('/api/contacts',
                          json={'email': 'test@example.com', 'name': 'Test User'})
    data = json.loads(response.data)
    assert response.status_code == 201
    assert data['email'] == 'test@example.com'
    assert data['name'] == 'Test User'
    assert data['status'] == 'active'

def test_get_contacts(client):
    """Test getting all contacts"""
    # Create test contacts
    client.post('/api/contacts', json={'email': 'test1@example.com', 'name': 'User 1'})
    client.post('/api/contacts', json={'email': 'test2@example.com', 'name': 'User 2'})
    
    response = client.get('/api/contacts')
    data = json.loads(response.data)
    assert response.status_code == 200
    assert len(data) == 2

def test_update_contact(client):
    """Test updating a contact"""
    # Create contact
    response = client.post('/api/contacts', json={'email': 'test@example.com', 'name': 'Test User'})
    contact_id = json.loads(response.data)['id']
    
    # Update contact
    response = client.put(f'/api/contacts/{contact_id}',
                         json={'name': 'Updated Name'})
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['name'] == 'Updated Name'

def test_delete_contact(client):
    """Test deleting a contact"""
    # Create contact
    response = client.post('/api/contacts', json={'email': 'test@example.com', 'name': 'Test User'})
    contact_id = json.loads(response.data)['id']
    
    # Delete contact
    response = client.delete(f'/api/contacts/{contact_id}')
    assert response.status_code == 204
    
    # Verify deletion
    response = client.get(f'/api/contacts/{contact_id}')
    assert response.status_code == 404

def test_create_template(client):
    """Test creating an email template"""
    response = client.post('/api/templates',
                          json={'name': 'Test Template', 'content': '<h1>Hello</h1>'})
    data = json.loads(response.data)
    assert response.status_code == 201
    assert data['name'] == 'Test Template'
    assert data['content'] == '<h1>Hello</h1>'

def test_create_campaign(client):
    """Test creating a campaign"""
    response = client.post('/api/campaigns',
                          json={'name': 'Test Campaign', 'subject': 'Test Subject'})
    data = json.loads(response.data)
    assert response.status_code == 201
    assert data['name'] == 'Test Campaign'
    assert data['subject'] == 'Test Subject'
    assert data['status'] == 'draft'

def test_send_campaign(client):
    """Test sending a campaign"""
    # Create contacts
    client.post('/api/contacts', json={'email': 'test1@example.com', 'name': 'User 1'})
    client.post('/api/contacts', json={'email': 'test2@example.com', 'name': 'User 2'})
    
    # Create campaign
    response = client.post('/api/campaigns',
                          json={'name': 'Test Campaign', 'subject': 'Test Subject'})
    campaign_id = json.loads(response.data)['id']
    
    # Send campaign
    response = client.post(f'/api/campaigns/{campaign_id}/send')
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['sent_count'] == 2
    assert data['campaign']['status'] == 'sent'

def test_analytics(client):
    """Test analytics endpoint"""
    # Create test data
    client.post('/api/contacts', json={'email': 'test@example.com', 'name': 'User'})
    client.post('/api/campaigns', json={'name': 'Campaign', 'subject': 'Subject'})
    client.post('/api/templates', json={'name': 'Template', 'content': 'Content'})
    
    response = client.get('/api/analytics')
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['contacts']['total'] == 1
    assert data['campaigns']['total'] == 1
    assert data['templates']['total'] == 1

def test_send_campaign_no_contacts(client):
    """Test sending campaign with no active contacts"""
    # Create campaign
    response = client.post('/api/campaigns',
                          json={'name': 'Test Campaign', 'subject': 'Test Subject'})
    campaign_id = json.loads(response.data)['id']
    
    # Try to send campaign
    response = client.post(f'/api/campaigns/{campaign_id}/send')
    data = json.loads(response.data)
    assert response.status_code == 400
    assert 'error' in data

def test_send_campaign_already_sent(client):
    """Test sending an already sent campaign"""
    # Create contact
    client.post('/api/contacts', json={'email': 'test@example.com', 'name': 'User'})
    
    # Create and send campaign
    response = client.post('/api/campaigns',
                          json={'name': 'Test Campaign', 'subject': 'Test Subject'})
    campaign_id = json.loads(response.data)['id']
    client.post(f'/api/campaigns/{campaign_id}/send')
    
    # Try to send again
    response = client.post(f'/api/campaigns/{campaign_id}/send')
    data = json.loads(response.data)
    assert response.status_code == 400
    assert 'already sent' in data['error']
