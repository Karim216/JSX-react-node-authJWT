const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();
// Configuration du middleware CORS
app.use(cors());

var corsOptions = {
  origin: function (origin, callback) {
    const whitelist = ["http://localhost:5173"];
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

app.use(cookieParser());

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
  res.json({ message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄" });
});

require("./src/routes/user.routes.js")(app);
require("./src/routes/auth.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});