const con = require('./conn')
 
async function getUSer (_username){
    
        const result = await  con.client.db("Project_RentalBikes").collection("Users").findOne({"username":_username});
        
        return result;
    


}
module.exports = getUSer;