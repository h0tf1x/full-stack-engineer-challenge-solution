FROM nodejs:10.13.0
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install yarn
RUN npm install
RUN npm install pm2
CMD ["pm2-runtime", "app.js"]
