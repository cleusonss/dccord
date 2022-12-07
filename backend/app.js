require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const Auth = require("./middleware/auth");

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* Configura CORS */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type,Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCHED, DELETE, GET"
    );
    return res.status(200).send({});
  }

  next();
});

/* Rotas */
const UserRouter = require("./routes/user-router");

app.post("/signin", Auth.optional, UserRouter);
app.post("/signup", Auth.optional, UserRouter);

app.get("/users/:email", Auth.optional, UserRouter);
app.put("/users/:email", Auth.mandatory, UserRouter);
app.delete("/users/:email", Auth.mandatory, UserRouter);

/* Rota não Encontrada */
app.use((req, res, next) => {
  const error = new Error("Endpoint not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({ status: "error", message: error.message });
});

module.exports = app;
