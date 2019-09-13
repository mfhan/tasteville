const express = require('express');
const { User} = require('../models');
const {hashPassword, checkPassword, genToken} = require('../Services/auth.js')

const userController = express.Router();

//was:
// const buildAuthResponse = (user) => {
//   const tokenData = {
//     id: user.id,
//     username: user.username,
//   }
//   const token = genToken(tokenData);
//   return token;
// }

//more abstraction:
const buildAuthResponse = (user) => {
  const {id, username} = user
  //tokenData also called token payload
  const tokenData = { id, username}
  const token = genToken(tokenData);
  return { user:{id, username}, token};
}


userController.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const password_digest = await hashPassword(password);
    const user = await User.create({ username, password_digest });
    const token = buildAuthResponse(user);
    res.json({username: user.username, id:user.id, token });
  } catch (e) {
    next(e);
  }
});

//refer to checkPassword in AUTH.JS
// const checkPassword = async (password, hashed_password) => {
//   return await bcrypt.compare(password, hashed_password);
// }
userController.post('/login', async (req, res, next) => {
  try {
    const {username, password } = req.body;
    const user = await User.findOne({
      where: {username},
    });
    if (await checkPassword(password, user.password_digest)) {
      const token = buildAuthResponse(user);
      res.json({user, token})
    } else {
      res.status(401).send('Invalid Credentials')
    }

  } catch (e) {
    next(e);
  }
});


module.exports = userController;
