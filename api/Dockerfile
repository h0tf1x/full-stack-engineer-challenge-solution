FROM node:alpine
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install -g yarn
RUN yarn install
RUN yarn global add pm2
CMD ["pm2-runtime", "app.js"]
