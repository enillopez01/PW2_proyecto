const msgeModel = require("../models/messageModel");
const { ObjectId } = require('mongodb');


// Creacion de mensaje
exports.insMessage = async (req, res) => {
    try {
        const newMSG = new msgeModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            imagefile: req.file.path,
            message: req.body.message
        })

        if (!req.file) {
            return res.status(400).send('It is required an image file.')
        }

        const MSG = await newMSG.save();
        res.status(200).json({ MSG });
        console.log('insMessage It was Executed Successfully');

    } catch (err) {
        console.error('Error Saving message to server:', err);
        res.status(500).send('Internal Server Error');
    }
}

//Consulta todos los mensajes
exports.selMessages = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const skip = (page - 1) * pageSize;
    try {
        const MSG = await msgeModel.find().skip(skip).limit(pageSize);
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
        const MSG = await msgeModel.findOne({ _id: new ObjectId(id) });
        console.log('Select by ID Succesfully completed');
        res.status(200).send(MSG)

    } catch (err) {
        console.error('Error Consulting the server:', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.updMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const updMSG = ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        });
        const updatedMSG = await msgeModel.findByIdAndUpdate(id, updMSG);
        if (updatedMSG) {
            res.status(200).send(updatedMSG);
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
        const { id } = req.params;

        const delMSG = await msgeModel.findOneAndDelete(id);
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