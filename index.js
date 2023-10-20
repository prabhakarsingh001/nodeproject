const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
// let bodyParser = require('body-parser');
// to access image from public folder
app.use(express.static('public'))
//routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
//environment variable or you can say constants
env.config();
mongoose.set('strictQuery', false);
mongoose.connect(
    `mongodb+srv://prabhakar9374:9234735689@newtest.5d3px5e.mongodb.net/`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }
).then(() => {
    console.log('Database connected');
});
// app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.get("/", (req, res) => {
    res.send("<h1>home</h1>");
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});