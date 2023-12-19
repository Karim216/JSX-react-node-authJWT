## CMD Exécution du projet

### Sans docker
- Demarrage le projet: node server.js
- Synchronisation de la bd avec sequelize: node sync-db.js
- Persister la bd avec sequelize: node user-db.js

### Avec docker
- Demarrage le projet avec docker: docker compose up
- Persister la bd avec sequelize avec docker: docker exec node user-db.js
- Synchronisation de la bd avec sequelize avec docker: docker exec node sync-db.js