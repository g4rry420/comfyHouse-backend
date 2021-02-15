require("dotenv").config()

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser =require("cookie-parser");

//My routes
const productRoutes = require("./routes/products")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const googleRoutes = require("./routes/google")

//DB Connection
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("DB CONNECTED")
}).catch((err) => {
  console.log("Error in connecting database")
})
mongoose.set('useFindAndModify', false);

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

// My Routes
app.use("/api", productRoutes)
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", googleRoutes)

//PORT
const port = process.env.PORT || 5000;

//Starting a server
app.listen(port, () => console.log(`Your App is running on ${port}`))