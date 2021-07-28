var express = require('express');
var router = express.Router();
const myfunction = require('../db/token.db')
const router_3 = require('./private/admin')
const router_4 = require('./private/guest')


router.use(async (req, res, next) => {
    const access_token = req.headers.authorization;
    let realToken;
    if (access_token) {
        realToken = access_token.split(' ', 2)[1];
    }
    if (!realToken) {
        return res.status(401).json({
            message: "you need to provide an access_token in Bearer form"
        })
    }
    const user = await myfunction.getUsernameFromToken(realToken);
    if (!user) {
        return res.status(403).json({
            message: "invalid access_token"
        })
    }


    req.user = user.username;
    req.role = user.role;
    return next(undefined, req);
});
function isAdmin( req, res, next ) {
    if(req.role === 'Guest'){
        return res.json({
                            "message": "You don't have permission"
                        }) 
    }
    next();
 }
 function isGuest( req, res, next ) {
    if(req.role === 'Admin'){
        return res.json({
                            "message": "You don't have permission"
                        }) 
    }
    next();
 }
 router.use('/Admin', isAdmin, router_3.adminController)
 router.use('/Guest',isGuest, router_4.guestController)
module.exports = {
    private: router
}