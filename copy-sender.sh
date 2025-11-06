#!/bin/bash

# Script per creare una copia di Sender
# Usage: ./copy-sender.sh <nome-nuova-copia>

set -e

# Funzione per escape di stringhe per sed
escape_for_sed() {
  printf '%s\n' "$1" | sed 's:[][\\/.^$*]:\\&:g'
}

if [ -z "$1" ]; then
  echo "Errore: Specificare il nome della nuova copia"
  echo "Usage: ./copy-sender.sh <nome-nuova-copia>"
  exit 1
fi

NEW_NAME="$1"
SOURCE_DIR="sender-ui"
TARGET_DIR="${NEW_NAME}"

# Validazione del nome: solo caratteri alfanumerici, trattini e underscore
if [[ ! "$NEW_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
  echo "Errore: Il nome può contenere solo lettere, numeri, trattini (-) e underscore (_)"
  exit 1
fi

if [ -d "$TARGET_DIR" ]; then
  echo "Errore: La directory $TARGET_DIR esiste già"
  exit 1
fi

echo "📋 Creazione copia di Sender: $NEW_NAME"
echo ""

# Copia della directory
echo "📂 Copia dei file da $SOURCE_DIR a $TARGET_DIR..."
cp -r "$SOURCE_DIR" "$TARGET_DIR"

# Rimuovi file sensibili dalla copia
echo "🔒 Rimozione file sensibili..."
rm -f "$TARGET_DIR/.env" "$TARGET_DIR/.env.local" "$TARGET_DIR/.env.*.local" 2>/dev/null || true

# Estrai il nome corrente dal package.json sorgente
CURRENT_NAME=$(grep -o '"name": "[^"]*"' "$SOURCE_DIR/package.json" | cut -d'"' -f4)

# Escape dei caratteri speciali per sed
ESCAPED_CURRENT_NAME=$(escape_for_sed "$CURRENT_NAME")
ESCAPED_NEW_NAME=$(escape_for_sed "$NEW_NAME")

# Aggiornamento package.json con il nuovo nome
echo "📝 Aggiornamento package.json..."
if [ -f "$TARGET_DIR/package.json" ]; then
  sed -i "s/\"name\": \"$ESCAPED_CURRENT_NAME\"/\"name\": \"$ESCAPED_NEW_NAME\"/" "$TARGET_DIR/package.json"
fi

# Aggiornamento README
echo "📄 Aggiornamento README..."
if [ -f "$TARGET_DIR/README.md" ]; then
  sed -i "s/$ESCAPED_CURRENT_NAME/$ESCAPED_NEW_NAME/g" "$TARGET_DIR/README.md"
fi

echo ""
echo "✅ Copia completata con successo!"
echo ""
echo "⚠️  IMPORTANTE: Verifica che non ci siano file sensibili nella copia"
echo ""
echo "Prossimi passi:"
echo "  cd $TARGET_DIR"
echo "  npm install"
echo "  npm run dev"
echo ""
