const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require('dotenv');
const connectDB = require("./config/db");


var path = require("path");
var url = require("url");

var __filename = url.fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);

//env config
dotenv.config();


//routes import
const userRoutes = require('./routes/userRoutes.js');
const blogRoutes = require('./routes/blogRoutes.js');

// MongoDB connection
connectDB();



// rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json()); //allows to recieve json data from frontend/client
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build"))); //for offline diable this

//routes
// app.get("/", (req, res) => {
//   res.status(200).send({
//     message: "Node Server",
//   });
// });

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);


//web  hosting  route = for offline disable this
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


//PORT
const PORT = process.env.PORT || 8080;


// listen
app.listen(PORT, () => {
  console.log(`server running at ${PORT} MODE:${process.env.DEV_MODE}`.bgCyan.white);
});
