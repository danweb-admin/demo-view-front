#!/bin/sh
# Substitui as variáveis do template e gera o config.json final
envsubst < /usr/share/nginx/html/assets/config.json > /usr/share/nginx/html/assets/config.json

# Sobe o Nginx
exec nginx -g 'daemon off;'
