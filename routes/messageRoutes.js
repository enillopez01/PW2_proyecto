const messageController = require("../controller/messageController");
const auth = require("../auth/authController");
const upload = require("../controller/storageController");

//

module.exports = (app) => {
    app.post('/message', upload.single('imagefile'), messageController.insMessage);
    app.get('/message', messageController.selMessages);
    app.get('/message/:id', messageController.selMessage);
    app.put('/message/:id', messageController.updMessage);
    app.delete('/message/:id', messageController.delMessage);
}