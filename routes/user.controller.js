import express from 'express';
import User from '../database/models/user.model.js';
import passport from 'passport';
import jsonwebtoke from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userController = express.Router();

/**
 * POST
 * login user
 */

userController.get('/api/auth', passport.authenticate(`jwt`, {session: false}), (req, res) => {
  res.status(200).send(req.headers.authorization);
});

userController.post('/api/login', (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      res.status(400).send({ success: false, msg: error });
    } if (!user) {
      res.status(401).send({ success: false, msg: `Authentication failed.` });
    } else {
      comparePassword(req.body.password, user.password, (error, isMatch) => {
        if (isMatch && !error) {
          const token = jsonwebtoke.sign(user.toJSON(), process.env.SECRET, { expiresIn: 604800 }); // one week
          res.json({ success: true, token: `JWT ${token}` });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed, wrong password' });
        }
      });
    }
  });
});

/**
 * POST
 * Add a new User to your database
 */
userController.post('/api/signup', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, msg: 'Please pass email and password' })
  } else {
    const { email, name } = req.body;
    const password = await bcrypt.hash(req.body.password, 5);
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400).json({ success: false, msg: `email ${userExists.email} already exists.`});
    } else {
      const user = {
        name,
        email,
        password
      }

      const newUser = new User(user);
      newUser.save((err, response) => {
        if (err) {
          res.status(400).send({ success: false, msg: password });
        } else {
          res.status(200).send({ success: true, msg: response });
        }
      });
    }
  }
});

userController.get(`/api/signout`, passport.authenticate(`jwt`, { session: false }), (req, res) => {
  req.logOut();
  res.json({ success: true, msg: `logged out successfully` });
})

const comparePassword = (password, userPassword, cb) => {
  bcrypt.compare(password, userPassword, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    
    cb(null, isMatch);
  });
};

export default userController;