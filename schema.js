const joi = require("joi");

const schema=joi.object(
    
    {
        title:joi.string().required(),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        description:joi.string().required(),
        deleteImage:joi.array(),
       
    }
    
)
const reviewSehema=joi.object({
    body:joi.string().required(),
    rating:joi.number().required().min(0).max(5)
})


module.exports.schema=schema;
module.exports.reviewSehema=reviewSehema;
