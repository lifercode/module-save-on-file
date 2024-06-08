FROM node:18
WORKDIR /usr/src/app
COPY package*.json *.js ./
RUN npm install
EXPOSE 5555
CMD ["node", "app.js"]