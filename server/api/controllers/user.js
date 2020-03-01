const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
   //     if (result) {
          console.log(`user.js: user_login: ${JSON.stringify(result, null, 3)}`);
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
              //TODO add owner to accounts.find({"owner: user[0].email"})
            },
            process.env.JWT_KEY,
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
