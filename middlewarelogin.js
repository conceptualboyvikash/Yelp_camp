const campground = require("./models/campground");
const { Review } = require("./models/review");
const { reviewSehema, schema } = require("./schema");
const ExpressError = require("./utility/ExpressError");

module.exports.logindone = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateReview=(req,res,next)=>{
   
    // const {error}=reviewval.validate(req.body);
    const {error}=reviewSehema.validate(req.body);
    if(error)
    {
        const msg=error.details.map(e=>e.message).join(',');
        throw new ExpressError(msg,400);
    }
    else
    {
        next();
    }
} 
module.exports.isAuthor=async(req,res,next)=>{

    const campg=await campground.findById(req.params.id);
    const {id}=req.params;
    if(!campg.author.equals(req.user._id))
    {
        req.flash('error',"You are not author");
        res.redirect(`/campgrounds/${id}`);
    }
    next();

}
module.exports.isReviewAuthor=async(req,res,next)=>{

    const {id,reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(!review.author.equals(req.user._id))
    {
        req.flash('error',"You are not author");
       return res.redirect(`/campgrounds/${id}`);
    }
    next();

}
 
module.exports.validateData=(req,res,next)=>{

    const {error}=schema.validate(req.body);
    if(error)
    {
        const msg=error.details.map(e=>e.message).join(',');
        throw new ExpressError(msg,400);
    }
    else
    {
        next();
    }
}