# Serve application using Nginx server
FROM nginxinc/nginx-unprivileged:alpine


# Copy from ./dist/ folder to destination
COPY ./dist/. /usr/share/nginx/html

# Copy a new configuration file setting listen port to 8080
COPY default.conf /etc/nginx/conf.d/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

