const messageModel = require("../models/messageModel");
const { ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
const { findById } = require("../models/usersModel");



/** */
// Creacion de mensaje
exports.insMessage = async (req, res) => {
    const { name } = req.body;
    const { email } = req.body;
    const { phone } = req.body;
    const imagefile = req.file.filename;
    const { message } = req.body;
    try {
        const MSG = await messageModel.create({ name, email, phone, imagefile, message });
        res.status(200).send("Message sent successfully /n" + MSG);
    } catch (err) {
        console.error('Error Saving message to server:', err);
        res.status(500).send('Internal Server Error');
    }
}

//Consulta todos los mensajes
exports.selMessages = async (req, res) => {
    try {
        const MSG = await messageModel.find();
        console.log('Select all Messages Successfully');
        res.status(200).send(MSG);
    } catch (err) {
        console.error('Error Consulting the server:', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.selMessage = async (req, res) => {
    try {
        const id = req.params.id;
        const MSG = await messageModel.findOne({ _id: new ObjectId(id) });
        console.log('Select by ID Succesfully completed');
        res.status(200).send(MSG)

    } catch (err) {
        console.error('Error Consulting the server:', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.updMessage = async (req, res) => {
try {
    
    const { id } = req.params.id;

    const updMSG = ({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });
    const updatedMSG = await messageModel.findOneAndUpdate(id, updMSG);
    if (updatedMSG) {
        res.status(200).send(updMSG);
    } else {
        res.status(400).send('Could not find User with sent ID');
    }
} catch (err) {
    console.error('Error Updating the Message:', err);
        res.status(500).send('Internal Server Error');
}
}

exports.delMessage = async (req, res) => {
try {
     const { id } = req.params.id;

        const delMSG = await messageModel.findOneAndDelete(id);
        if (delMSG) {
            res.status(200).send(delMSG);
        } else {
            res.status(400).send('Could not find Message with sent ID');
        }
} catch (err) {
    console.error('Error Deleting the Message:', err);
        res.status(500).send('Internal Server Error');
}

}