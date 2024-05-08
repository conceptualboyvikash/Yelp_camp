const express=require('express');
const router=express.Router();
const ExpAsync=require('../utility/Expasync');
const {logindone,validateReview,isAuthor,validateData, isReviewAuthor}=require('../middlewarelogin');
const campLogic=require('../controllers/compground');
const multer  = require('multer')
const {storage}=require('../cloudinary/index')
const upload = multer({storage})


router.route('/')
    .get(ExpAsync(campLogic.indexPage))
     .post(upload.array('image'),validateData,ExpAsync(campLogic.makeNewCampground));
    

    router.get('/new',logindone,campLogic.newCampForm) 
router.route('/:id')
    .get(logindone,ExpAsync(campLogic.showCampDetail))
    .put(logindone,isAuthor,upload.array('image'),validateData,ExpAsync(campLogic.updateCampground))
    .delete(logindone,isAuthor,ExpAsync(campLogic.deleteCampground));


router.delete('/:id/reviews/:reviewId',isReviewAuthor,ExpAsync(campLogic.deleteReview))

router.get('/:id/edit',isAuthor,ExpAsync(campLogic.editCampgroundFrom));

router.post('/:id/reviews',validateReview,ExpAsync(campLogic.createNewReview));

module.exports=router;
