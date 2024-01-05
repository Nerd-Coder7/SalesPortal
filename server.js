require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const PORT = process.env.PORT || 4000;
//Routes:-
const Database = require("./config/database");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const portalRoutes = require("./routes/portal.route.js");
const contextAuthRoutes = require("./routes/context-auth.route");
const { notFound, errorHandler } = require('./middlewares/error.js');


const db = new Database(process.env.MONGODB_URI);

db.connect().catch((err) =>
  console.error("Error connecting to database:", err)
);

app.use(cors());
app.use(morgan("dev"));
app.use("/assets/userFiles", express.static(__dirname + "/assets/userFiles"));
app.use(
  "/assets/userAvatars",
  express.static(__dirname + "/assets/userAvatars")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./config/passport.js");

app.use(express.static(path.join(__dirname, "build")));

// Define a route for handling requests to the root URL
app.get(/^(?!\/?api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/server-status", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

app.use("/api/admin", adminRoutes);
app.use("/api/auth", contextAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portal",portalRoutes)

process.on("SIGINT", async () => {
    try {
      await db.disconnect();
      console.log("Disconnected from database.");
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
  
  app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!`));

  app.use(notFound);
  app.use(errorHandler)