const bcrypt = require('bcrypt');
const salt = 10;

const hashpassword = async(password) =>{
    const hash = await bcrypt.hash(password, salt);
    return hash
}

const verifypassword = async(password, hashpassword) =>{
    const ismatch = bcrypt.compare(password, hashpassword);
    return ismatch
}


module.exports = {
    hashpassword,
    verifypassword
}