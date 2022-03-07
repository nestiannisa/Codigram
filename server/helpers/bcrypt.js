const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt =(pwd) =>{
   return bcrypt.hashSync(pwd,saltRounds);
}

const decrypt = (pwd,hashPwd) =>{
    return bcrypt.compareSync(pwd,hashPwd);
}

module.exports =  {
    encrypt, decrypt
}