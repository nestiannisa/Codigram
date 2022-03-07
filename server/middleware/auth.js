const {tokenVerifier} = require('../helpers/jwt');
const {Posts,Users} = require('../models');

const authentication = (req,res,next) =>{
    console.log("Authentication Middleware");
    const {token_for_access} = req.headers;
    
    if(token_for_access){
        try {
            let verify = tokenVerifier(token_for_access);
            req.userData = verify;
            next()
        } catch (e) {
            res.status(401).json({
                message: "user not authenticated!"
            })
        }
    }else{
        res.status(404).json({
            message: "Token not found"
        })
    }
}

const authorization = (req,res,next) =>{
    console.log("Authorization middleware")
    const id = +req.params.id;
    const UserId = req.userData.id;

    Posts.findByPk(id)
    .then(post =>{
        if(!post){
            res.status(404).json({
                message: "Post not found!"
            })
        }if(post.UserId !== UserId){
            res.statu(401).json({
                message: "User is not authorized"
            })
        }else{
            next()
        }
    })
    .catch(err =>{
        res.status(500).json(err);
    })
}

module.exports ={
    authentication,authorization
}