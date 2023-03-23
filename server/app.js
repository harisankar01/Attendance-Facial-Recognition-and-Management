// const path = require('path')
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employee");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// set headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", function (req, res) {
  res.status(200).json({
    message: "Attendence API",
  });
});

// app.use((error, req, res, next) => {
//   console.log(error + "--------------------------");
//   const statusCode = error.statusCode || 500;
//   const message = error.message;
//   let errorsPresent;
//   if (error.errors) {
//     errorsPresent = error.errors;
//   }

//   res.status(statusCode).json({
//     message: message,
//     errors: errorsPresent,
//   });
// });
// app.set("view engine", "ejs");

app.use("/api/employee", employeeRoutes);

const httpServer = require("http").createServer(app);

httpServer.listen(5000);
