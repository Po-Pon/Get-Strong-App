const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

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

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.listen(8888,() => {
    console.log("Sever is running on 8888!!");
});