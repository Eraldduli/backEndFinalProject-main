var express = require('express');
const con = require('../db/conn');
const getUSer = require('../db/login.db');
var router = express.Router();
const myfunction = require ('../db/token.db')



router.post('/login', async function (req, res) {
    const  {username , password} = req.body;
    const user = await getUSer(username);
    if(!username || ! password){
        return res.json({"message" :"Username/Password fields are required" });
    }else if (!user){
       return  res.json({"message" :"Wrong Username" });
    }else if (user.password != password){
        return res.json({"message" :"Wrong Password " });
    }
    else{
        
            const token = await myfunction.createTokenForUser(user.username,user.role)
            console.log(token);
            return res.json({
                access_token: token
            })
        
    }

  });
  

  module.exports = {
login:router
  } ;