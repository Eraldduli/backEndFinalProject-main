const uuid = require('uuid');
const con = require('./conn')

async function createTokenForUser(_username,_role){
    const token = uuid.v4();
await con.client.db("Project_RentalBikes").collection("userToken").insertOne({"username":_username,"role":_role,"token":token});
return token;
}

async function getUsernameFromToken (_token){
const username = await con.client.db("Project_RentalBikes").collection("userToken").findOne({"token":_token})
if(!username){
    return null
}
return username;
}


module.exports = {createTokenForUser,
    getUsernameFromToken}