require("dotenv").config();
// require('dotenv').config({ path: '.env.development' });
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const cookieParser = require('cookie-parser');

// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

const app = express();

// Configuration du middleware CORS
app.use(cors());

app.use(cookieParser());

var corsOptions = {
  origin: function (origin, callback) {
    const whitelist = ["http://localhost:3000"];
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
  // Vous pouvez ajouter d'autres options ici si nécessaire
};

// Configuration Swagger JSDoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'A sample API',
    },
  },
  // Chemin vers les fichiers de l'API
  apis: ['./app/routes/*.routes.js'],
};

const specs = swaggerJsdoc(options);

// Configuration Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API." });
});

// Définition de la route pour les images d'utilisateurs
const publicDirectoryPath = path.join(__dirname, 'public', 'images', 'users');
app.use('/app/public/images/users', express.static(publicDirectoryPath));

require("./app/routes/user.routes.js")(app);
require("./app/routes/auth.routes.js")(app);
require("./app/routes/logout.routes.js")(app);
require("./app/routes/me.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});