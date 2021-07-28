var express = require('express');
var router = express.Router();
const con = require('../../db/conn')

router.post('/requestBike', async (req,res) => {
    const user= req.user;
    const {type}=req.body;
    const result = await requestbike(user,type);
    res.send(result);
    });



router.get('/listOrders', async (req,res) => {
const user = req.user;
const result = await getOrderForUser(user);
res.send(result);
});






    async function requestbike (user,type){
    console.log(type)
        type.forEach( async (tp)=> {
            await con.client.db("Project_RentalBikes").collection("Bikes").updateOne({"TypesofBike":tp},{$inc :{"Stock":-1}});
        })
        const result = await  con.client.db("Project_RentalBikes").collection("Reservation").insertOne({"username":user,"type":type,"rented":"Active"});
        
        return result;
    
    
    
    }
    
    
async function getOrderForUser (user){
    
    const result = await  con.client.db("Project_RentalBikes").collection("Reservation").find({"username":user}).sort({_id:-1}).toArray();
    
    return result;



}




module.exports = {
    guestController:router
};