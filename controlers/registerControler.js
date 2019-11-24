const Register = require('../models/registerModel.js')

//Create register
const createRegister = function(req, res){
    const register = new Register(req.body)
    register.save().then(function(){
        res.send(register)
    }).catch(function(error){
        return res.status(400).send(error);
    })
}

//Get registers
const getRegisterByUserID = function(req, res){
    const id = req.params.id
    Register.find({ userID: `${id}` }, function(err, register){
        if(!register){
            return res.status(404).send()
        }
        return res.send(register)
    })
}

module.exports = {
    createRegister: createRegister,
    getRegisterByUserID: getRegisterByUserID
}
