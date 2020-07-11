const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../../configold/config')


const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        console.log(`server: user.js -- signing up new user: ${req.email}`);
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  console.log(`user_login = ${req.body.email}`)
  console.log(`process.env.VUE_APP_JWT = ${process.env.VUE_APP_JWT}`)

  // console.log(`user_login(all process.env) = ${JSON.stringify(process.env, null, 3)}`)
  // console.log(`user_login(all process.env.development.local) = ${JSON.stringify(process.env.development.local, null, 3)}`)
  // console.log(`user_login(process.env.development.local.JWT_KEY) = ${process.env.development.local.JWT_KEY}`)
  // console.log(`user_login(process.env.JWT_KEY) = ${process.env.JWT_KEY}`)
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log(`user.js: user_login: failed: ${JSON.stringify(err, null, 3)}`);
          return res.status(401).json({
            message: "Auth failed"
          });
        }
   //     if (result) {y

          console.log(`user.js: user_login: ${JSON.stringify(result, null, 3)}`);
          console.log(`checking JWT in user.js:JWT_SECRET ${config.authentication.jwtSecret}`)

          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
              //TODO add owner to accounts.find({"owner: user[0].email"})
            },
            config.authentication.jwtSecret,
            // process.env.JWT_SECRET,
            // process.env.VUE_APP_JWT,
            {
              expiresIn: "1h"
            }
            );
            console.log(`user.js: user_login:returnin Auth success ${JSON.stringify(result, null, 3)}`);
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              user: user[0].email
            });
    //      }
        //   console.log(`user.js: user_login:default Auth success `);
        //   res.status(401).json({
        //   message: "Auth failed"
        // });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
