FROM nginx:alpine

WORKDIR /var/www

# Copia os assets do diretorio local do projeto
COPY public /var/www/public

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
