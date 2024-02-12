require("dotenv").config();

// Importing required modules
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { checkSession } = require("./middleware/checkSession");

// Setting up the server
const PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
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

app.use("/oauth", authRouter);
app.use("/request", requestRouter);

// Public Routes

app.use(checkSession);

// Protected Routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
