FROM node:18
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/files
COPY package*.json *.js ./
RUN npm install
EXPOSE 5555
CMD ["node", "app.js"]