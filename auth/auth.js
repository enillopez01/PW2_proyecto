const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'S973SDCHO93$54^7HR5^&U3$g$%V54';

exports.signUp = async () => {
    try {
        const user = await new User({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        });
    } catch (err) {
        console.log(err);
        resizeBy.status(500).send('signUp: Habido un error ' + err)
    }

}