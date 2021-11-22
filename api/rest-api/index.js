const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
var cors = require('cors')

// import Route
const Register = require("./routes/register");
const login = require("./routes/login");
const modeRoute = require("./routes/mode");
const exerciseRoute = require("./routes/exercise");
const authRoute = require("./routes/auth");

const statisticsRoute = require("./routes/statistics")

app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true},
    () => {
    console.log("Connected to MongoDB")
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected.');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(Register.router);
app.use(login.router);
app.use("/api", modeRoute);
app.use("/api", exerciseRoute);
app.use("/api", statisticsRoute);
app.use("/api/users", authRoute);


app.listen(8888,() => {
    console.log("Sever is running on 8888!!");
});