# Sender - Piattaforma di Email Marketing

Sender è una piattaforma completa di email marketing per Bluelime Universe. Permette di gestire contatti, creare campagne email, utilizzare template personalizzati e monitorare l'andamento delle campagne.

## Caratteristiche

- 📧 **Gestione Contatti**: Aggiungi, modifica e gestisci i tuoi contatti/iscritti
- 🚀 **Campagne Email**: Crea e invia campagne email ai tuoi contatti
- 🎨 **Template Email**: Crea e riutilizza template HTML personalizzati
- 📊 **Analytics**: Monitora le statistiche delle tue campagne
- 🔌 **API REST**: API completa per integrazioni esterne

## Installazione

### Prerequisiti
- Python 3.8 o superiore
- pip (Python package manager)

### Setup

1. Clona il repository:
```bash
git clone https://github.com/smartlemonnet/sender.git
cd sender
```

2. Installa le dipendenze:
```bash
pip install -r requirements.txt
```

3. Configura le variabili d'ambiente:
```bash
cp .env.example .env
# Modifica .env con le tue configurazioni
```

4. Avvia l'applicazione:
```bash
python app.py
```

L'applicazione sarà disponibile su `http://localhost:5000`

## API Endpoints

### Contatti

- `GET /api/contacts` - Ottieni tutti i contatti
- `POST /api/contacts` - Crea un nuovo contatto
- `GET /api/contacts/:id` - Ottieni un contatto specifico
- `PUT /api/contacts/:id` - Aggiorna un contatto
- `DELETE /api/contacts/:id` - Elimina un contatto

### Campagne

- `GET /api/campaigns` - Ottieni tutte le campagne
- `POST /api/campaigns` - Crea una nuova campagna
- `GET /api/campaigns/:id` - Ottieni una campagna specifica
- `PUT /api/campaigns/:id` - Aggiorna una campagna
- `DELETE /api/campaigns/:id` - Elimina una campagna
- `POST /api/campaigns/:id/send` - Invia una campagna

### Template

- `GET /api/templates` - Ottieni tutti i template
- `POST /api/templates` - Crea un nuovo template
- `GET /api/templates/:id` - Ottieni un template specifico
- `PUT /api/templates/:id` - Aggiorna un template
- `DELETE /api/templates/:id` - Elimina un template

### Analytics

- `GET /api/analytics` - Ottieni statistiche della piattaforma

## Esempi di Utilizzo

### Creare un Contatto
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "name": "Mario Rossi", "status": "active"}'
```

### Creare un Template
```bash
curl -X POST http://localhost:5000/api/templates \
  -H "Content-Type: application/json" \
  -d '{"name": "Welcome Email", "content": "<h1>Benvenuto!</h1><p>Grazie per esserti iscritto.</p>"}'
```

### Creare e Inviare una Campagna
```bash
# Crea la campagna
curl -X POST http://localhost:5000/api/campaigns \
  -H "Content-Type: application/json" \
  -d '{"name": "Newsletter Gennaio", "subject": "Le novità di Gennaio", "template_id": 1}'

# Invia la campagna
curl -X POST http://localhost:5000/api/campaigns/1/send
```

## Struttura del Progetto

```
sender/
├── app.py              # Applicazione principale Flask
├── models.py           # Modelli del database
├── requirements.txt    # Dipendenze Python
├── .env.example        # Esempio di configurazione
├── .gitignore         # File da ignorare in Git
└── README.md          # Documentazione
```

## Tecnologie Utilizzate

- **Flask**: Framework web Python
- **SQLAlchemy**: ORM per database
- **SQLite**: Database (configurabile per PostgreSQL/MySQL)
- **Flask-CORS**: Gestione CORS per API

## Sviluppo Futuro

- [ ] Integrazione con servizi SMTP (Gmail, SendGrid, Mailgun)
- [ ] Sistema di tracking aperture email
- [ ] Sistema di tracking click link
- [ ] A/B testing per campagne
- [ ] Segmentazione avanzata contatti
- [ ] Automazioni email
- [ ] Dashboard web UI
- [ ] Export/import contatti CSV
- [ ] Gestione allegati email

## Licenza

MIT License

## Autore

Bluelime Universe
