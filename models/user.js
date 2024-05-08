const mongoose=require('mongoose');
const {Schema}=mongoose;
const passportLocalMongoose=require('passport-local-mongoose');


const userSchema=Schema({
   email:{
    type:String,
    unique:true,
    required:true,
   }
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',userSchema); 