const Register = require('../models/registerModel.js')

//Create register
const createRegister = function(req, res){
    const register = new Register({
        ...req.body,
        userID: req.user._id
    })
    register.save().then(function(){
        res.send(register)
    }).catch(function(error){
        return res.status(400).send(error);
    })
}

//Get registers
const getRegisterByUserID = function(req, res){
    Register.find({ userID: req.user._id }, function(register){
        if(!register){
            return res.status(404).send()
        }
        return res.send(register)
    }).catch(function(error){
        return res.status(500).send({ error: error })
    })
}

module.exports = { 
    createRegister: createRegister,
    getRegisterByUserID: getRegisterByUserID
}
