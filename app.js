if(process.env.NODE_ENV!='production')
{
    require('dotenv').config();
}
const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const ExpressError=require('./utility/ExpressError');
const passport=require('passport');
const localStrategy=require('passport-local');
const User=require('./models/user');
const userRoute=require('./routes/user');


const flash=require('connect-flash');
const session=require('express-session')
const campgroundRoute=require('./routes/campground');


const app=express();
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session(
    {
        secret:'this is my secret message',resave:false,saveUninitialized:true,
        cookie:{
           // expires:Date.now()+1000*60*60*24*7,
            maxAge:1000*60*60*24*7,
            httpOnly:true,
        }
    }
));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currentUser=req.user;
   
   
    // console.log(req.user);
    next();
})



mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db=mongoose.connection;

db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected");
});
 




app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.engine('ejs',ejsMate);

app.get('/',(req,res)=>{
    res.render('home');
})
 
app.use('/',userRoute);
app.use('/campgrounds',campgroundRoute);


app.all('*',(req,res,next)=>{
    next(new ExpressError("i am from * handerler",404));
})

app.use((err,req,res,next)=>{
   const {message="oh no something went wrong",statusCode=500}=err;
   if(!err.message)
        err.message="oh no something went wrong"
   res.status(statusCode).render('error',{err});
})


app.listen(3000,(req,res)=>{
    console.log("app is listing at 3000");
})