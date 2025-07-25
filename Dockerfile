FROM node:22 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
EXPOSE 5173
COPY . ./
RUN npm run build

FROM nginx:alpine AS production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

