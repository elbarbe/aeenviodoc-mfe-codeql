# Serve application using Nginx server
FROM nginx:alpine

# Copy from ./dist/ folder to destination
COPY ./dist/. /usr/share/nginx/html

# Copy a new configuration file setting listen port to 8080
COPY default.conf /etc/nginx/conf.d/

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

# RUN cp -r ./default.conf /etc/nginx/conf.d/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
