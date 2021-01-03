const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.set('debug', true);
const app = express();
const dbserv = "mongodb";
const dbdns = 'mongodb://' + dbserv + ':27017/userauthtest';
console.log(dbdns);
mongoose.connect(dbdns, {useNewUrlParser:true}).then(() => {
console.log("DB Connected");
executeAPIs();
}).catch((err) => {
console.log("DB NOT Connected");
console.log(err);

});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
const User = require("./models/users.js");


function executeAPIs() {
app.post('/users', function(req, res) {
  if(!req.body.username) {
    return res.json({status: false, message: 'User Name Required!'});
  }  
  if(!req.body.password) {
    return res.json({status: false, message: 'Password Required!'});
  }  
  if(req.body.enabled !== true && req.body.enabled !== false )  {
    return res.json({status: false, message: 'Enabled Required!'});
  }  
    User.findOne({username: req.body.username}, function (err, olduser) {
        if (err) {
            return res.json({status: false, message: err.message});
        }
    if(olduser) {
      return res.json({status: false, message: 'User Name already exists!'});
    }
  User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName ? req.body.firstName: "",
    lastName: req.body.lastName ? req.body.lastName: "",
    enabled: req.body.enabled,
  }, function(err, repo) {
     if(err) {
        return res.json({status: false, message: 'User Not Created due to ' + err });
     }
     return res.json({status: true, message: 'User Created'});
  });
  });
});
app.get('/users', function(req, res) {
    // User.create({user: "kuldeep", password: "kuldeep"})
    
    User.find({}, function (err, user) {
        if (err) {
            return res.json({status: false, message: err.message});
        }

        // ---

        if (!user) {
            return res.json({status: false, message: 'Sorry! '});
        }

        // ---

        /*if (user.hash != sha1(req.query.pass)) {
            return res.json('index', {message: 'Sorry!'});
        }
*/
        // ---

        return res.json({status: true, data: user});
    });
});
}
app.listen(8001, () => {
    console.log("KKKKKKKK");
})
