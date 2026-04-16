#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# ==========================================
# CONFIGURATION VARIABLES
# ==========================================
# Best Practice: Pass email and password via environment variables 
# from your CI/CD secrets manager, do not hardcode them.
MEGA_EMAIL="${MEGA_EMAIL}"
MEGA_PASSWORD="${MEGA_PASSWORD}"

# Remote MEGA Path (The path as it looks inside your MEGA drive)
MEGA_FILE_PATH="/test-data.zip"

# Local Paths
LOCAL_DOWNLOAD_DIR="/tmp/mega_downloads"
LOCAL_FILE_PATH="$LOCAL_DOWNLOAD_DIR/test-data.zip"
TARGET_EXTRACTION_PATH="./cypress/fixtures" # Change to your framework's actual path

# ==========================================
# 1. INSTALL MEGAcmd
# ==========================================
echo "Installing prerequisites (wget, unzip)..."
sudo apt-get update -qq
sudo apt-get install -y wget unzip apt-transport-https gnupg2 curl

echo "Downloading and installing MEGAcmd..."
# Note: This uses the Ubuntu 22.04 package. Adjust the URL if using a different OS version.
wget -q "https://mega.nz/linux/repo/xUbuntu_22.04/amd64/megacmd-xUbuntu_22.04_amd64.deb" -O megacmd.deb
sudo apt-get install -y "$PWD/megacmd.deb"
rm megacmd.deb # Clean up installer

# ==========================================
# 2. LOG IN TO MEGA
# ==========================================
echo "Authenticating with MEGA..."
# Running this suppresses the verbose login output which might leak data
mega-login "$MEGA_EMAIL" "$MEGA_PASSWORD" > /dev/null

# ==========================================
# 3. DOWNLOAD THE ZIPPED FILE
# ==========================================
echo "Downloading $MEGA_FILE_PATH..."
mkdir -p "$LOCAL_DOWNLOAD_DIR"

# mega-get downloads to the specified directory
mega-get "$MEGA_FILE_PATH" "$LOCAL_DOWNLOAD_DIR"

# ==========================================
# 4. EXTRACT THE FILE
# ==========================================
echo "Extracting files to $TARGET_EXTRACTION_PATH..."
mkdir -p "$TARGET_EXTRACTION_PATH"

# -o overwrites existing files without prompting
# -q makes the extraction quiet (less console spam)
unzip -o -q "$LOCAL_FILE_PATH" -d "$TARGET_EXTRACTION_PATH"

# ==========================================
# 5. LOG OUT AND CLEAN UP (CRITICAL)
# ==========================================
echo "Logging out of MEGA..."
mega-logout

echo "Cleaning up temporary downloads..."
rm -rf "$LOCAL_DOWNLOAD_DIR"

echo "✅ Test data successfully downloaded and extracted!"