const userRoute = require('express').Router();
const {UserController} = require('../controllers');
const upload = require('../middleware/multer');
const {authentication} = require('../middleware/auth');

userRoute.put('/update',authentication,upload.single('avatar'), UserController.editAccount);
userRoute.get('/account',authentication,UserController.account);
userRoute.get('/detail/:id',UserController.detailUserById);
userRoute.get('/',UserController.allUser);
userRoute.post('/login', UserController.login );
userRoute.post('/register',UserController.register);
userRoute.delete('/delete/:id',authentication, UserController.deleteUser);

userRoute.get ('/search',UserController.search)
module.exports = userRoute