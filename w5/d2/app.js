const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const studentsRoutes = require('./routes/student-route')
const app = express();
const PORT = 5000;
const mongooseUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hluunuq.mongodb.net/?retryWrites=true&w=majority`;
app.use(bodyParser.json());

app.use('/students', studentsRoutes);

mongoose
    .connect(mongooseUrl)
    .then(() => {
        app.listen(PORT, () => console.log('Server is running'));
    })
    .catch(err => console.log('error message', err.message));