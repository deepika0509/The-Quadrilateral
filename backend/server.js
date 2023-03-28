//SERVER.JS
//create express app
const exp=require("express");
const app=exp();

app.listen(4000,()=>console.log("web server listening in port 4000..."))

//get mongo client
const mclient = require("mongodb").MongoClient;

//connect to db serverclear
mclient.connect("mongodb://0.0.0.0:27017/")
  .then((dbref) => {
   //connect to db
   const dbobj=dbref.db("shelter");
   //collection of db
   const collectionobj=dbobj.collection("sheltercollection");
   
   // sahre collection
   app.set('collectionobj',collectionobj)

   console.log("DB connection success")
   })
  

   .catch((err)=>console.log("db connect error :", err));


//importing user app
const userApp=require("./APIs/usersApi")


//execeute user api file when path starts with user-api

app.use('/user-api',userApp)

//execute product ai when it starts with products-api



const invpathmiddleware=(request,response,next)=>{
response.send({message:'Invalid path'})
}

app.use("*",invpathmiddleware)

const errhandmiddleware=(error,request,response,next)=>{
response.send({message:error.message});

};

app.use(errhandmiddleware);