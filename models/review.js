const mongoose=require('mongoose');
const {Schema}=mongoose;

const ReviewSchema=Schema({
   body:String,
   rating:Number,
   author:{
      type:Schema.Types.ObjectId,
      ref:'User'
   }
});

module.exports.Review=mongoose.model('Review',ReviewSchema); 
module.exports.val=2;