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

//Update register
const updateRegister = function(req, res){
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["services"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate){
        return res.status(400).send({
            error: 'Invalid update, only allowed updates: ' + allowedUpdates
        })
    }
    Register.findByIdAndUpdate(_id, req.body).then(function(register){
        if(!register){
            return res.status(404).send()
        }
        return res.send(register)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

//Delete register
const deleteRegister = function(req, res){
    const id = req.params.id
    Register.findOneAndRemove({ _id: id }).then(function(event,res){
        res.send({event: "deleted"});
    }).catch(function(error){
        res.status(500).send(error)
    })
}

module.exports = { 
    createRegister: createRegister,
    getRegisterByUserID: getRegisterByUserID,
    deleteRegister: deleteRegister
}
