const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const cookieParser = require('cookie-parser');
const UsersRoute = require('./routes/usersRoutes');
const MessageRoutes = require("./routes/messageRoutes")

/*Conexion a BD */
mongoose.connect('mongodb://localhost:27017/classicCars')
    .then(() => {
        console.log('Database Connection Successfully');
    })
    .catch((err) => {
        console.log('Connection Error: ', err);
    });

app.use('/public', express.static(`${__dirname}/uploads`));

UsersRoute(app);
MessageRoutes(app);

app.listen(PORT, () => {
    console.log(`Server started in port #: ${PORT}`);
});