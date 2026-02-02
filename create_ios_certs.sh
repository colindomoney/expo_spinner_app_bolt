#!/bin/bash

# iOS Distribution Certificate Generator for EAS
# Creates CSR, converts Apple's .cer to .p12

set -e

CERTS_DIR="./certs"
BASE="$CERTS_DIR/ios_test_development"
KEY_FILE="$BASE.key"
CSR_FILE="$BASE.csr"
CRT_FILE="$BASE.crt"
P12_FILE="$BASE.p12"
CER_FILE="$BASE.cer"

# Defaults - override with args or edit here
EMAIL="${1:-your@email.com}"
NAME="${2:-Your Name}"
COUNTRY="${3:-GB}"

mkdir -p "$CERTS_DIR"

echo "=== iOS Distribution Certificate Generator ==="
echo ""
# If the .cer already exists, skip steps 1 & 2 (key + CSR generation)
if [ -f "$CER_FILE" ]; then
  echo "[0/4] Found $CER_FILE — skipping key and CSR generation (steps 1 & 2)."
  if [ ! -f "$KEY_FILE" ]; then
    echo "ERROR: Private key $KEY_FILE not found. Cannot create .p12 without private key."
    echo "Either provide $KEY_FILE or remove $CER_FILE to regenerate key/CSR."
    exit 1
  fi
  SKIP_GEN=true
else
  SKIP_GEN=false
fi

if [ "$SKIP_GEN" != "true" ]; then
  # Step 1: Generate private key
  echo "[1/4] Generating private key..."
  openssl genrsa -out "$KEY_FILE" 2048
  echo "      Created: $KEY_FILE"

  # Step 2: Generate CSR
  echo "[2/4] Generating CSR..."
  openssl req -new -key "$KEY_FILE" -out "$CSR_FILE" \
    -subj "/emailAddress=$EMAIL/CN=$NAME/C=$COUNTRY"
  echo "      Created: $CSR_FILE"
fi

echo ""
if [ "$SKIP_GEN" != "true" ]; then
  echo "================================================"
  echo "NOW DO THIS:"
  echo "1. Go to https://developer.apple.com/account/resources/certificates/add"
  echo "2. Select 'Apple Distribution'"
  echo "3. Upload: $CSR_FILE"
  echo "4. Download the .cer file to: $CER_FILE"
  echo "================================================"
  echo ""
  read -p "Press ENTER when you've downloaded the .cer file to $CER_FILE..."

  if [ ! -f "$CER_FILE" ]; then
    echo "ERROR: $CER_FILE not found!"
    exit 1
  fi
else
  echo "Proceeding with existing certificate: $CER_FILE"
fi

# Step 3: Convert .cer to .crt
echo "[3/4] Converting .cer to .crt..."
openssl x509 -inform DER -in "$CER_FILE" -out "$CRT_FILE"
echo "      Created: $CRT_FILE"

# Step 4: Create .p12
echo "[4/4] Creating .p12 (you'll set a password)..."
openssl pkcs12 -export -out "$P12_FILE" \
  -inkey "$KEY_FILE" \
  -in "$CRT_FILE"
echo "      Created: $P12_FILE"

echo ""
echo "=== DONE ==="
echo ""
echo "Files created in $CERTS_DIR:"
ls -la "$CERTS_DIR"
echo ""
echo "Next steps:"
echo "1. Create Ad Hoc provisioning profile in Apple Developer Portal"
echo "2. Download .mobileprovision to $CERTS_DIR/"
echo "3. Update credentials.json with your bundle ID and p12 password"
echo "4. Run: eas credentials --platform ios"
echo "5. Upload credentials from credentials.json to EAS"
echo "6. Build: eas build --platform ios --profile dev"