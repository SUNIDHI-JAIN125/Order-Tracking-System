const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

// handling uncaught exception (something is undefined )
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception `);
  process.exit(1);  
});

//config

dotenv.config({ path: "Backend/config/config.env" });

// connecting to database
connectDatabase();

// CLOUDINARY 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection(problem in  database string )
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `shutting down the server  due to Unhandled  Promise  Rejection `
  );

  server.close(() => {
    process.exit(1);
  });
});
