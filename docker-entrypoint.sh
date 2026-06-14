#!/bin/sh
# Ensure data dirs exist — the Fly.io volume mount replaces /app/data
# with an empty volume on first boot, so we recreate the subdirectory.
mkdir -p /app/data/predictions
exec node server.js
