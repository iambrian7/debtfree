const mongoose = require("mongoose");
const Accounts = require("../models/accounts");
const fs = require('fs');
const path = require('path');
const util = require("../../util");


exports.accounts_check = (req, res, next) => {
  var dataPath = path.resolve(__dirname + '../../data/');
  console.log(`account check........dir=${dataPath}`)
  // test find accounts file 
  // var accounts = util.getFile('data/accounts.json')
  // Accounts.find({"owner":"tess"})


  console.time("TIME for tess")
  // var accounts = util.getFile('/data','accounts.json');
  // console.timeEnd("TIME for tess")
  //     res.status(200).json(JSON.parse(accounts));

  Accounts.find({})
  .exec()
  .then(docs => {

    // save accounts here
    console.timeEnd("TIME for tess")
    console.log(`all accounts retrieved for Tess:  ${docs.length} accounts. Found in ${JSON.stringify(docs).length} bytes`)

   util.writeFile(dataPath,JSON.stringify(docs));
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(`we got a error: ${err}`);
      res.status(500).json({
        error: err
      });
    })
}

exports.accounts_get_all = (req, res, next) => {
  console.log('account accounts_get_all........')
  
  ////// test get from file
  // var accounts = util.getFile('/data','accounts.json');
  // // const data = JSON.parse(accounts);
  // res.status(200).json(accounts);

 ///   test get from file
  console.time("mongo atlas get_all")
  Accounts.find({})
  //  .select("name price _id accountImage")
  .exec()
  .then(docs => {
    console.timeEnd("mongo atlas get_all")
    console.log(`all accounts retrieved for ${docs.length} accounts. Found in ${JSON.stringify(docs).length} bytes`)
    // writeFile('myaccounts.json',JSON.stringify(docs));
      // const response = {
      //   count: docs.length,
      //   accounts: docs.map(doc => {
      //     return {
      //       data: doc,
      //       _id: doc._id,
      //       request: {
      //         type: "GET",
      //         url: "http://localhost:3019/accounts/" + doc._id
      //       }
      //     };
      //   })
      // };
      //   if (docs.length >= 0) {
      // res.status(200).json(response);
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.accounts_create_account = (req, res, next) => {
  // const account = new Account({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: req.body.name,
  //   price: req.body.price,
  //   accountImage: req.file.path
  // });
  console.log(`accounts_create_account*******************`)
  console.log(` account body = ${JSON.stringify(req.body, null, 3)}`)
  const account = new Accounts(req.body)
  account
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created account successfully",
        createdAccount: {
          name: result.name,
          price: result.new_balance,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3019/accounts/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.accounts_get_account = (req, res, next) => {
  // Adventure.findById(id).exec(callback);
  const id = req.params.accountId;
  Accounts.findById(id)
    // .select("name price _id accountImage")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          account: doc,
          request: {
            type: "GET",
            url: "http://localhost:3019/accounts"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.accounts_update_account = (req, res, next) => {
  console.log("route is accounts_update_account")
  console.log(`req.body= ${JSON.stringify(req.body,null,3)}`)
  const id = req.params.accountId;
  // const updateOps = {};
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }

  var updateObject = req.body; // {last_name : "smith", age: 44}
  //  var id = req.params.id;
 //  db.users.update({_id  : ObjectId(id)}, {$set: updateObject});


  Accounts.update({ _id: id }, { $set: updateObject })
  // Accounts.update({ _id: ObjectId(id) }, { $set: updateObject })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Account updated",
        request: {
          type: "GET",
          url: "http://localhost:3019/accounts/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.accounts_delete = (req, res, next) => {
  const id = req.params.accountId;
  console.log(`accounts_delete: deleting: id = ${id}`)
  
  // Account.remove({ _id: id })
  Accounts.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(`...deleted ok for ${id}`)
      res.status(200).json({
       _id: id
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

function writeFile(name, data) {
  fs.writeFile(name, data, (err) => {
      if (err) {
          return console.log(err);
      }
      console.log(`File ${name} saved successfully!`);
  })
}
