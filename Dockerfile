FROM node:16-alpine3.15 as builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production
EXPOSE 80

FROM nginx:1.23.2-alpine 
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/www /usr/share/nginx/html
EXPOSE 80
# Start NgInx service
CMD ["nginx", "-g", "daemon off;"]