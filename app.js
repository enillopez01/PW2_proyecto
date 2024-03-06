const mongoose = require('mongoose');
const express = require('express');
const app = express();

/*Conexion a BD */
mongoose.connect('mongodb://localhost:27017/classicCars')
.then(() => {
    console.log('Conexion Exitosa');
})
.catch( (err) =>{
    console.log('Error de Conexion: ',err);
});


app.listen(3000, ()=>{
    console.log('El servidor inicio el puerto 3000');
});