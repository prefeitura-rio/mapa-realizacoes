FROM node:12-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
ARG REACT_APP_MAPA_VERSION
ENV REACT_APP_MAPA_VERSION=$REACT_APP_MAPA_VERSION
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
