FROM node:18.17.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# RUN nodejs src/database/sync-db.js
# RUN nodejs src/database/user-data.js

COPY . .

EXPOSE 8082

CMD [ "node", "server.js" ]