var express = require('express');
var router = express.Router();
const con = require('../../db/conn')
var mongo = require('mongodb');



router.post('/changeRented', async(req,res) =>{
const {id,type} = req.body;
var o_id = new mongo.ObjectID(id);
console.log(o_id)
const author = req.user;
const result = await changeRented(o_id,type);

return res.json(result);

})

router.get('/getAllReservation',async (req,res) => {
    const results = await getReservation();
    res.json(results);
} )


async function changeRented  (id, type){
    
        const result = await  con.client.db("Project_RentalBikes").collection("Reservation").updateOne({"_id":id},{$set:{"rented":"Returned"}});
        if(result.modifiedCount === 1){

            type.forEach( async (tp)=> {
                await con.client.db("Project_RentalBikes").collection("Bikes").updateOne({"TypesofBike":tp},{$inc :{"Stock":1}});
            })
            return result;
        }else{
            return {"message":"Stock is full ,all Bikes are available"}
        }
        
        
    


}

async function getReservation(){
    const result = await con.client.db("Project_RentalBikes").collection("Reservation").find().sort({_id:-1}).toArray();
return result;
}



module.exports = {
    adminController:router
};