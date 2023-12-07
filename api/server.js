const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");

const middlewares = require("./src/middlewares.js");

require("dotenv").config();
// Configuration du middleware CORS
app.use(cors());

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

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(bodyParser.json());

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.use(passport.initialize());
app.use(passport.session());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄" });
});

require("./src/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});