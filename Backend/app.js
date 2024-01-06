const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");   
const cors = require("cors");

const app = express();

const errorMiddleware = require("./middleware/error");

//  config
const dotenv = require("dotenv");

app.use(cors({ credentials: true, origin: true }));

dotenv.config({ path: "config/config.env" });

app.use(express.json());


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const prod = require("./routes/ProductRoute");
const userroute = require("./routes/UserRoute");
const orderroute = require("./routes/OrderRoute");
const paymentroute = require("./routes/PaymentRoute");

app.use("/api/v1", prod);
app.use("/api/v1", userroute);
app.use("/api/v1/", orderroute);
app.use("/api/v1/", paymentroute);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
