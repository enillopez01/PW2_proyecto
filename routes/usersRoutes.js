const usersController = require("../controller/usersController");
const auth = require("../auth/authController");

module.exports = (app) => {
app.get('/user', usersController.getAllUsers);
app.get('/user/:id', usersController.getUser);
app.post('/signup', usersController.createUser);
app.post('/login', usersController.loginSys);
app.put('/upduser/:id', usersController.updateUser);
app.delete('/deluser/:id', usersController.deleteUser);


}