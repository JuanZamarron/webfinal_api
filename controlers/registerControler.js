const Register = require('../models/registerModel.js')

const createRegister = function(req, res){
    const register = new Register(req.body)
    register.save().then(function(){
        res.send(register)
    }).catch(function(error){
        return res.status(400).send(error);
    })
}

module.exports = {
    createRegister: createRegister
}
