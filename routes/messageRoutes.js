const messageController = require("..//controller/messageController");
const multer = require('multer');

// Configuración de Multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

module.exports = (app) =>{
app.post('/message', upload.single('imagefile'), messageController.insMessage);
app.get('/message', messageController.selMessages);
app.get('/message/:id', messageController.selMessage);
app.put('/message/:id', messageController.updMessage);
app.delete('/message/:id', messageController.delMessage);
}