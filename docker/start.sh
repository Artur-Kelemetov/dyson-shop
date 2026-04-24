#!/bin/sh
set -eu

json-server --host 0.0.0.0 --watch /app/json-server/db.json --port 8080 &

exec nginx -g 'daemon off;'
