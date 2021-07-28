const express = require('express')
var bodyParser = require('body-parser')
const cors = require("cors")
const con = require('./db/conn')
const router_1 = require('./controller/login')
const router_2 = require('./controller/private')
const router_public = require('./controller/public/showBikes')
const csvtojson = require("csvtojson");
let url = "mongodb://localhost:27017/";
const app = express()
var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
const port = 3000

app.get("/", (req, res) => {
    return res.send("hello")
})
con.client.connect()
app.get("/createUsers", async (req, res) => {

    const result = await collectionExists();
    return res.send("okay")

})
//insert collections if they dont exists in DB
async function collectionExists() {

    const collections = await con.client.db("Project_RentalBikes").listCollections().toArray();
    const collectionNames = collections.map(c => c.name).filter(name => name === "Users");
    console.log(collectionNames)
    if (!(collectionNames[0] === "Users")) {

        csvtojson().fromFile("users.csv").then(csvData => {

            con.client.db("Project_RentalBikes").collection("Users").insertMany(csvData, (err, res) => {
                if (err) throw err;


            });

        });
        csvtojson().fromFile("bikes.csv").then( array =>{
            array.forEach(element => {

                con.client.db("Project_RentalBikes").collection("Bikes").insertOne({ "ID": element.Id , "TypesofBike": element.TypesofBike ,"Status": element.Status , "Power": element.Power , "Stock": Number(element.Stock) }, (err, res) => {
                    if (err) throw err;


                });

            })
         } );

        return true

    } else {
        console.log(collectionNames + " exists")
        return false
    }
}


app.use(bodyParser.json())
app.use('/app', router_1.login);
app.use('/private', router_2.private);
app.use('/public', router_public.public)
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});