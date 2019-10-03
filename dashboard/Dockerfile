FROM node:alpine as build
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install yarn
COPY package.json /app/package.json
RUN yarn install
RUN yarn global add react-scripts
COPY . /app
RUN yarn build


FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
