const express = require('express')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const cors = require('cors');

const port = 3000;

const app = express();
app.use(express.json());
app.use(bodyparser.json())

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

mongoose.connect("mongodb://0.0.0.0:27017/crudTask", {
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database is connected Successfuly!")
})

app.use("/", require("./routes/route"))

app.listen(port,()=> {
    console.log(`App is listening on ${port}`)
})