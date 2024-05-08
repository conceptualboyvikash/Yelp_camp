const User = require("../models/user");

module.exports.registerFrom=(req,res)=>{
    res.render('users/register');}

module.exports.createNewUser=async(req,res,next)=>{
    try{
       const {email,username,password}=req.body;
      const user= new User({email,username});
     const registerUser=await User.register(user,password);
     req.login(registerUser,(e)=>{
        if(e)
        {return next(e)}
    
        req.flash('success','New uer created');
        res.redirect('/campgrounds');
    });
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }
    };

module.exports.renderLogicPage=(req,res)=>{
    res.render('users/login')
}
module.exports.successfulLogin=(req,res)=>{
    req.flash('success','Welcome Back to Yelp Camp ! you succeffully logged in');
   const redirectUrl= res.locals.returnTo;
   if(redirectUrl)
    res.redirect(redirectUrl);
    else
        res.redirect('/campgrounds');
    
};
module.exports.successfulLogout=(req,res,next)=>{
    req.logout((e)=>{
        if(e)
        {
           return next(e);
        }
        req.flash('success',"Logout Successfully");
        return res.redirect('/campgrounds');
        
    });
    
   
};


    
