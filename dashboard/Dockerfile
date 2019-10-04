FROM node:alpine as build
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app
RUN npm install -g yarn
COPY package.json /app/package.json
RUN yarn install
COPY . /app
RUN yarn build


FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
