const postRoute = require('express').Router();
const {PostController} = require('../controllers');
const { authentication, authorization } = require('../middleware/auth');
const upload = require('../middleware/multer');

postRoute.get('/', PostController.getPost);// all post
postRoute.get('/userPost',authentication, PostController.showUserPost); //post sesuai user login
postRoute.get('/userPost/:UserId',PostController.showUserPostById); //post sesuai user login
postRoute.post('/create',authentication,upload.single('image'), PostController.createPost); //create post
postRoute.get('/:id', PostController.findById); //get post by id
postRoute.put('/update/:id',authentication,authorization, PostController.updatePost); // update post
postRoute.delete('/delete/:id',authentication,authorization, PostController.deleteUserPost); //delete post
postRoute.get('/:name',PostController.findPostByName);

module.exports = postRoute