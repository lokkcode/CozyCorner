const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview = async(req,res)=>{ 
    //validatereview ko use as a middleware kr rhe h and wraoAsync ko error handling k liye
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review) //model
    newReview.author = req.user._id;
     
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    
    req.flash("success", "New Review Created!")
    res.redirect(`/listings/${listing._id}`)
};

module.exports.destroyReview = async(req,res)=>{  // child route
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    // $pull =>                     id --->replace---> reviews k reviewId se
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};