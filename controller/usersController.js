const usersModels = require("../models/usersModel");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const SECRET_KEY = '4EG6446646@64RFGEF&43$CERTG/DDSLOPZ';

const optionsPage = {
    page: 1,
    limit: 2
};

/** Creacion de Usuario/SingUp*/
exports.createUser = async (req, res) => {
    try {
        console.log('createUser It was Executed Successfully');
        const newuser = new usersModels({
            name: req.body.name,
            surname: req.body.surname,
            gender: req.body.gender,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        });
        const savedUser = await newuser.save();
        const payload = { id: savedUser.id, email: savedUser.email };
        const token = jwt.sign(payload, SECRET_KEY);
        console.log('newuser It was Executed Successfully');
        res.status(200).json({ savedUser, token });
    } catch (err) {
        console.log('Error in createUser: ', err);
        res.status(500).send('Server Error');
    }
}

/** Consulta todos los registros*/
exports.getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};


    results.totalCount = await usersModels.countDocuments().exec();

    try {
        const users = await usersModels.find().limit(limit).skip(startIndex).exec();
        console.log('getAllUsers It was Executed Successfully');
        res.status(200).send(users);
    } catch (err) {
        console.log('Error in getAllUsers: ', err);
        res.status(500).send('Server Error');
    }
}


/** Consulta registros por ID*/
exports.getUser = async (req, res) => {

    try {
        const id = req.params.id;
        const user = await usersModels.findOne({ _id: new ObjectId(id) });
        console.log('getUser It was Executed Sucessfully');
        res.status(200).send(user);
    } catch (err) {
        console.log('Error in getUser: ', err);
        res.status(500).send('Server Error');
    }
}

/**Login y autenticacion */

exports.loginSys = async (req, res) => {
    try {
        const user = await usersModels.findOne({ email: req.body.email })
        if (!user || user == null) {
            res.status(401).send('Incorrect email or password!');
            return;
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            res.status(401).send('Incorrect email or password!');
            return;
        } else {
            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, SECRET_KEY);
            res.status(200).json({ user, token });


        }
    } catch (err) {
        console.log(err);
        res.status(500).send('loginSys: There is an error in the loginSys: ' + err);
    }
}


/** Actualizacion de Usuario*/
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updtUser = ({
            name: req.body.name,
            surname: req.body.surname,
            gender: req.body.gender,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        });
        const updatedUser = await usersModels.findByIdAndUpdate(id, updtUser);
        const payload = { id: updatedUser.id, email: updatedUser.email };
        const token = jwt.sign(payload, SECRET_KEY);
        if (updatedUser) {
            res.status(200).send(updatedUser);
        } else {
            res.status(400).send('Could not find User with sent ID');
        }
    } catch (err) {
        console.log('Error in updateUser: ', err);
        res.status(500).send('Server Error');
    }
}

/** Eliminacion de Usuario*/
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const delUser = await usersModels.findByIdAndDelete(id);
        if (delUser) {
            res.status(200).send(delUser);
        } else {
            res.status(400).send('Could not find User with sent ID');
        }
    } catch (err) {
        console.log('Error in delUser: ', err);
        res.status(500).send('Server Error');
    }

}