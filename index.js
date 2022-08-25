// config inicial
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Forma de ler JSON / middlewares - recursos executados entre as requisições respostas.
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rotas da API
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);

//Criar uma rota inicial / endpoint
app.get("/", (req, res) => {
  //mostrar req

  res.json({ message: "Oi Express!" });
});

//Entregar uma porta

const DB_USER = process.env.DB_USER 
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.t1bhzxv.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
