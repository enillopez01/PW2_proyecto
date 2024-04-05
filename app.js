const mongoose = require('mongoose');
const express = require('express');
const app = express();
const UsersRoute = require('./routes/usersRoutes');
const MessageRoutes = require("./routes/messageRoutes")


const PORT = 3000;

/*Conexion a BD */
mongoose.connect('mongodb://localhost:27017/classicCars')
    .then(() => {
        console.log('Database Connection Successfully');
    })
    .catch((err) => {
        console.log('Connection Error: ', err);
    });

app.use(express.json());
UsersRoute(app);
MessageRoutes(app);

app.listen(PORT, () => {
    console.log(`Server started in port #: ${PORT}`);
});