#!/bin/sh
set -e

# Start MinIO server in the background
minio server /data &

# Wait for MinIO to start
sleep 10

# Configure MinIO client and create the bucket
mc alias set local http://localhost:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD"
mc mb local/clothes || true

