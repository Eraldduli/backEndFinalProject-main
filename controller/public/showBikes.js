const express = require('express');
const router = express.Router();
const con = require('../../db/conn') 

router.get('/publicBikes', async (req,res) =>{
  const result = await  showAllBikes();
  res.send(result);
})

router.get('/filerBikesStatus/:status', async (req,res) =>{
  const status = req.params.status;
  const result = await  filterByStatus(status);
  res.send(result);
})



router.get('/filerBikesType/:type', async (req,res) =>{
  const type = req.params.type;
  const result = await  filterByType(type);
  res.send(result);
})

router.get('/filerBikesPower/:power', async (req,res) =>{
  const power = req.params.power;
  const result = await  filterByDeveloper(power);
  res.send(result);
})



async function showAllBikes(){
 
    const result = await  con.client.db("Project_RentalBikes").collection("Bikes").find().toArray();
    return result;
 
}

async function filterByStatus(status){
 
  const result = await  con.client.db("Project_RentalBikes").collection("Bikes").find({"Status":status}).toArray();
  return result;

}



async function filterByType(type){
 
  const result = await  con.client.db("Project_RentalBikes").collection("Bikes").find({"TypesofBike":type}).toArray();
  return result;

}

async function filterByDeveloper(power){
 
  const result = await  con.client.db("Project_RentalBikes").collection("Bikes").find({"Power":power}).toArray();
  return result;

}

module.exports={
  public:router
}