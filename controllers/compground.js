const { cloudinary } = require("../cloudinary");
const campground = require("../models/campground");
const { Review } = require("../models/review");



module.exports.indexPage= async(req,res)=>{
    const campg=await campground.find({});
    res.render('campgrounds/index',{campg});
}
module.exports.newCampForm=(req,res)=>{
    
    res.render('campgrounds/new');
}
module.exports.showCampDetail=async(req,res,next)=>{
    try{  
    const campg=await campground.findById(req.params.id).populate({path:'reviews',populate:'author'}).populate('author');
    if(!campg)
    {
        req.flash('error',"cannot find that url");
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/showcampground',{campg});
    }
    catch(e){
        next(e);
    }
};
module.exports.deleteReview=async(req,res,next)=>{
    const {id,reviewId}=req.params;
    await Review.findByIdAndDelete(reviewId);
    await campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    req.flash('success','Review delete successfully');
    res.redirect(`/campgrounds/${id}`);
};
module.exports.makeNewCampground= async(req,res)=>{
    
    const newc=new campground(req.body);
    newc.img=req.files.map(e=> {return {url:e.path,filename:e.filename}})
    newc.author=req.user._id;
   await newc.save();
   req.flash('success','Your successfully created');
   res.redirect(`/campgrounds/${newc._id}`);
};
module.exports.editCampgroundFrom=async(req,res)=>{
    const {id}=req.params;
    const campg=await campground.findById(id);  
    res.render('campgrounds/edit',{campg});
};
module.exports.updateCampground=async(req,res)=>{
    // console.log(req.body);
    const {title,price,location,description,deleteImage}=req.body;
    const {id}=req.params;
    
  const camp= await campground.findByIdAndUpdate(id,{title,price,location,description});
    const imgarray=req.files.map(e=>{return {url:e.path,filename:e.filename}});
   
    camp.img.push(...imgarray);
     await camp.save();
   if(deleteImage)
   {    for(let filename of deleteImage)
        {
            await cloudinary.uploader.destroy(filename);
        }
        await  camp.updateOne({$pull:{img:{filename:{$in:deleteImage}}}});
   }
   
   req.flash('success','Your successfully edited');
    res.redirect(`/campgrounds/${id}`);
}

module.exports.createNewReview=async(req,res)=>{
    const rev=await new Review(req.body);
    const camp=await campground.findById(req.params.id);
    camp.reviews.push(rev);
    rev.author=(req.user);
    camp.save();
    rev.save();
   req.flash('success','Review created successfully');

    res.redirect(`/campgrounds/${req.params.id}`);

};
module.exports.deleteCampground=async(req,res)=>{
    const {id}=req.params;
    await campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}
