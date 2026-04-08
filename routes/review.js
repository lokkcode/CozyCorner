const express = require("express");
const router = express.Router({mergeParams: true}); //taki parent route childroute se merge ho sake by access params 

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");

const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");


const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");
//Reviews 
//Post Review route - hmne new , show etc routes reviews k liye nhi banaya kyuki reviews ko hrdm loisting a sath hi access kiya jaga alg se review ko webside thodi dekhinge 
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));



module.exports = router;