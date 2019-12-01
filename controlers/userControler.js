const User = require('../models/userModel.js');
if ( process.env.NODE_ENV === 'production') {
  var secret = process.env.secret
} else {
  const config = require('../config')
  var secret = config.secret
}

const createUser = function(req, res){
  const user = new User(req.body)
  user.save().then(function() {
    res.send(user)
  }).catch(function(error) {
      return res.status(400).send(error);
  });
}

const login = function(req, res) {
  User.findByCredentials(req.body.email, req.body.password).then(function(user){
    user.generateToken().then(function(token){
      return res.send({user, token});
    }).catch(function(error){
      return res.status(401).send({ error: error });
    })
  }).catch(function(error) {
    return res.status(401).send({ error: error });
  });
};

const logout = function(req, res){
  req.user.tokens = req.user.tokens.filter(function(token){
    return token.token !== req.token;
  });
  req.user.save().then(function(){
    return res.send();
  }).catch(function(error){
    return res.status(500).send({error: error})
  });
}

const updateUser = function(req, res) {
  const _id = req.user._id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['email', 'name', 'password', 'phone']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidUpdate){
    return res.status(400).send({
      error: 'Invalid update, only allowed updates: ' + allowedUpdates
    })
  }
  req.body.hash()
    User.findByIdAndUpdate(_id, req.body).then(function(user) {
      if (!user){
        return res.status(404).send()
      }
      return res.send(user)
    }).catch(function(error) {
      res.status(500).send(error)
    })
}

module.exports = {
  createUser: createUser,
  login: login,
  logout: logout,
  updateUser: updateUser
};
