## CMD Exécution du projet

### Sans docker
- node server.js
- node sync-db.js
- node user-db.js

### Avec docker
- docker-compose build --no-cache
- docker-compose up
- docker-compose exec nodejs node src/database/sync-db.js
- docker-compose exec nodejs node user-db.js