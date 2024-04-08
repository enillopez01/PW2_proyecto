const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = '4EG6446646@64RFGEF&43$CERTG/DDSLOPZ';

exports.authentication = (req, res, next) => {
    const autHeader = req.headers.authorizations;
    if (!autHeader) {
        res.status(401).send('Missing Authentication Token');
        return;
    }
    const [type, token] = autHeader.split(' ');

    if (type !== "Bearer") {
        res.status(401).send('Invalid Type of Token');
        return;
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch {
        res.status(401).send('Invalid Token')
    }

}