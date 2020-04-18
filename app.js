require('dotenv').config()
const express = require("express");

const app = express();
const bodyparser = require("body-parser");

const port = process.env.PORT || 3200;


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const db = require("./models");

db.sequelize.sync();

// welcome route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to DNA analizer." });
});

// mutation routes
require("./routes/dna.routes")(app);


app.listen(port, () => {
    console.log(`running at port ${port}`);
});