const mongoose=require('mongoose');
const {Schema}=mongoose;
const {Review}=require('./review');


const imageSchema=Schema({
    url:String,
    filename:String
})
imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
});
const campgroundSchema=Schema({
    title:String,
    price:Number,
    location:String,
    description:String,
    img:[imageSchema],
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    

    ] 

});
campgroundSchema.post('findOneAndDelete',async(docs)=>{
    if(docs)
    { 
        console.log(docs);
      await  Review.deleteMany({_id:{$in:docs.reviews}})
    }
   
})
module.exports=mongoose.model('Campground',campgroundSchema);