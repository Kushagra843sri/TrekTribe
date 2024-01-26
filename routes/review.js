const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js");
const { createReview, destroyReview } = require("../controller/review.js");



// Reviews
// creating a post route for reviews
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

// Delete Review Route
router.delete("/:reviewId",isLoggedIn, isreviewAuthor, wrapAsync(destroyReview));

module.exports = router;
