require("dotenv").config();

// Importing required modules
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

// Setting up the server
const PORT = process.env.PORT;
const app = express();

const store = new MongoDBSession({
  uri: process.env.ATLAS_URI,
  collection: "sessions",
});

const corsOptions = {
  origin: process.env.REACT_BASE_URL,
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.text());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Routes
const authRouter = require("./routes/oauth");
const requestRouter = require("./routes/request");
const sessionCheckRouter = require("./routes/sessionCheck");

app.use("/oauth", authRouter);
app.use("/request", requestRouter);
app.use("/session-check", sessionCheckRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
