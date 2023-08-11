const express = require("express");
require("dotenv").config();
const path = require("path");
const dbConnect = require("./config/connectDB");
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.error : console.log("server is running")
);
const authRouter = require("./routes/auth");
// connect DB
dbConnect();
//body parse midware
app.use(express.json());
//create route
app.use("/api/recipe", require("./routes/recipes"));
app.use("/api/user", require("./routes/users"));
app.use("/api/recipe", require("./routes/comments"));
app.use("/api/ingredients", require("./routes/ingredients"));
app.use("/api/auth", authRouter);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
