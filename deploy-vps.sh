#!/bin/bash
# ==============================================================================
# DM SOFTWARE - VPS AUTOMATIC DEPLOYMENT SCRIPT
# Target IP: 186.64.123.136 | Domain: dmsoftwaretech.com
# ==============================================================================

set -e

DOMAIN="dmsoftwaretech.com"
WEB_ROOT="/var/www/$DOMAIN"
REPO_URL="https://github.com/Scribax/DMSoftware.git"

echo "🚀 Iniciando despliegue de DM Software en $DOMAIN..."

# 1. Actualizar e instalar dependencias básicas
echo "📦 Instalando Nginx, Git y Certbot..."
apt update -y
apt install -y nginx git certbot python3-certbot-nginx

# 2. Descargar o actualizar repositorio
if [ -d "$WEB_ROOT/.git" ]; then
    echo "🔄 Actualizando código existente..."
    cd "$WEB_ROOT"
    git pull origin main
else
    echo "📥 Clonando repositorio desde GitHub..."
    mkdir -p /var/www
    rm -rf "$WEB_ROOT"
    git clone "$REPO_URL" "$WEB_ROOT"
fi

# 3. Ajustar permisos
chown -R www-data:www-data "$WEB_ROOT"
chmod -R 755 "$WEB_ROOT"

# 4. Configurar Nginx
echo "⚙️ Configurando Nginx para $DOMAIN..."
cat <<'EOF' > "/etc/nginx/sites-available/$DOMAIN"
server {
    listen 80;
    listen [::]:80;
    server_name dmsoftwaretech.com www.dmsoftwaretech.com;

    root /var/www/dmsoftwaretech.com;
    index index.html;

    # Compresión Gzip para mayor velocidad
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache de activos estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

# 5. Activar sitio en Nginx
ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
rm -f /etc/nginx/sites-enabled/default

# Detección de sintaxis Nginx
nginx -t
systemctl reload nginx

echo "✅ Nginx configurado exitosamente."
echo ""
echo "🔒 Para habilitar el certificado SSL gratuito (HTTPS) con Certbot, ejecuta:"
echo "certbot --nginx -d dmsoftwaretech.com -d www.dmsoftwaretech.com"
echo ""
echo "🎉 ¡Despliegue completado! Visita http://$DOMAIN"
