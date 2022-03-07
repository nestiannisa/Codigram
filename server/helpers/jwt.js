const jwt = require('jsonwebtoken');
const sekretKey ="bebas";

const generateToken= (user)=> {
    const {id,username} = user;
    const token = jwt.sign({
        id,username
    },sekretKey);
    return token;
}

const tokenVerifier= (token)=> {
    const decoded = jwt.verify(token,sekretKey);
    return decoded;
}

module.exports= {
    generateToken,tokenVerifier
}