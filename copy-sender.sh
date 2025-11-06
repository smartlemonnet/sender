#!/bin/bash

# Script per creare una copia di Sender
# Usage: ./copy-sender.sh <nome-nuova-copia>

set -e

if [ -z "$1" ]; then
  echo "Errore: Specificare il nome della nuova copia"
  echo "Usage: ./copy-sender.sh <nome-nuova-copia>"
  exit 1
fi

NEW_NAME="$1"
SOURCE_DIR="sender-ui"
TARGET_DIR="${NEW_NAME}"

if [ -d "$TARGET_DIR" ]; then
  echo "Errore: La directory $TARGET_DIR esiste già"
  exit 1
fi

echo "📋 Creazione copia di Sender: $NEW_NAME"
echo ""

# Copia della directory
echo "📂 Copia dei file da $SOURCE_DIR a $TARGET_DIR..."
cp -r "$SOURCE_DIR" "$TARGET_DIR"

# Aggiornamento package.json con il nuovo nome
echo "📝 Aggiornamento package.json..."
if [ -f "$TARGET_DIR/package.json" ]; then
  sed -i "s/\"name\": \"sender-ui\"/\"name\": \"$NEW_NAME\"/" "$TARGET_DIR/package.json"
fi

# Aggiornamento README
echo "📄 Aggiornamento README..."
if [ -f "$TARGET_DIR/README.md" ]; then
  sed -i "s/Sender UI/Sender UI - $NEW_NAME/g" "$TARGET_DIR/README.md"
  sed -i "s/sender-ui/$NEW_NAME/g" "$TARGET_DIR/README.md"
fi

echo ""
echo "✅ Copia completata con successo!"
echo ""
echo "Prossimi passi:"
echo "  cd $TARGET_DIR"
echo "  npm install"
echo "  npm run dev"
echo ""
