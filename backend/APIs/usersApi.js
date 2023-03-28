
//mini-express app
const { application } = require("express");
const exp=require("express");
const userApp=exp.Router()

//body parser
userApp.use(exp.json())


//get user by id
userApp.get('/get-user/:id',(request,response)=>{
    const collectionobj=request.app.get("collectionobj");

    let shelterId=(+request.params.id)

    collectionobj.findOne({id:shelterId})
    .then(collectionobj=>{
        response.status(200).send({message:"Shelter",payload:collectionobj})
    })
    .catch((err)=>{
        console.log("err in finding",err);
        response.send({message:"Error",errMessage:err.message});
    })
   
});





//create user
userApp.post('/create-user',(request,response)=>{
    const collectionobj=request.app.get("collectionobj");

    const newshelter = request.body;
    //insert into db
    collectionobj.insertOne(newshelter)
    .then((dbres)=>{
        console.log(dbres);
        response.status(201).send({message:"Shelter registered"});

    })
    .catch((err)=>{
        console.log("err in creating",err);
        response.send({message:"Error",errMessage:err.message});
    })

  
});





module.exports=userApp;



