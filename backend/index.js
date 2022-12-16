require("dotenv").config();

const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");

const { log } = console;
const app = express();
const server = http.createServer(app);

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

/* Socket */
app.use(express.static(path.join(__dirname, "public")));
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  log("There was a connection...");
  socket.on("room", (data) => {
    log(data);
  });
  socket.emit("Welcome to DCCord");
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

const port = process.env.PORT || 3001;

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
