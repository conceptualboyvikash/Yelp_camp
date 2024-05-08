const mongoose=require('mongoose');
const Campground=require('../models/campground')
const {descriptors,places}=require('./seedHelpers');
const cities=require('./cities');


const seedDb=async()=>{
   await Campground.deleteMany({});
   for(let i=0;i<50;i++)
   {
        const math1000=Math.floor(Math.random()*1000+1);
        const m1=Math.floor(Math.random()*17+1);
        const m2=Math.floor(Math.random()*20+1);
        
        const place=new Campground(
            {
                title:`${cities[math1000].city}`,
                price:`${math1000}`,
                location:`${cities[math1000].state}`,
                img:[{
                    url: 'https://res.cloudinary.com/firstwala/image/upload/v1713441245/YelpCamp/psx6rzfamxj58pyfkfxn.jpg',
                    filename: 'YelpCamp/psx6rzfamxj58pyfkfxn',
                   
                  },
                  {
                    url: 'https://res.cloudinary.com/firstwala/image/upload/v1713441245/YelpCamp/mmrpnqgddag4gj3stf4q.jpg',
                    filename: 'YelpCamp/mmrpnqgddag4gj3stf4q',
                   
                  },
                  {
                    url: 'https://res.cloudinary.com/firstwala/image/upload/v1713441245/YelpCamp/wbv9rh4qwtxl9j9meqwz.jpg',
                    filename: 'YelpCamp/wbv9rh4qwtxl9j9meqwz',
                   
                  }
                ],
                author:'661fb283edd34245d4329fde',
                description:`${descriptors[m1]},${places[i]}`
            }
        
        )
        await place.save();
   }
}
seedDb();


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db=mongoose.connection;

db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected");
})


