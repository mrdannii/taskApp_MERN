const mongoose =require('mongoose');

const mongoURL="mongodb://127.0.0.1:27017/tasks";

const connectToMongo=()=>{
    mongoose.connect(mongoURL);
    //console.log("conntected");
}

module.exports=connectToMongo;