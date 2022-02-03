const express = require('express');
const mongoose = require('mongoose')
const joi = require('joi');
const users = require('./routes/users');
const product = require('./routes/product');
const tours = require('./routes/tours');
const opinion = require('./routes/opinion');
const externs = require('./routes/externs');
const news = require('./routes/news');
const path = require('path')
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' });
const bodyParser = require('body-parser')
var cors = require('cors')
app.use(express.static('uploads'));
    
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api', users);
app.use('/api', product);
app.use('/api', tours);
app.use('/api', opinion);
app.use('/api', externs);
app.use('/api', news);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const { message } = error;
    const { data } = error;
    res.status(status).json({ message, data });
});

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'build/index.html'))
})
const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})
