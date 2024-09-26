require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes");
const CrimeReport = require("./models");
const db=require('./database')


app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(bodyParser.json({ extends: false }));

app.use('/crimeReport',routes);

db.sync()
  .then(() => {
    app.listen(process.env.APP_PORT);
    console.log(`Lisining to the port : ${process.env.APP_PORT}`);
  })
  .catch((err) => console.log(err));
