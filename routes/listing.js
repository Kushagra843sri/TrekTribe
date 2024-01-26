const express = require("express");
const router = express.Router();   
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderNewForm, showListing, createListing, renderEditForm, updateListing, destroyListing } = require("../controller/listing.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });



router
    .route("/")
    .get(wrapAsync(index))
    .post(isLoggedIn, upload.single("listing[image]"),
    wrapAsync(createListing)
    );


// New Route
router.get("/new",isLoggedIn, renderNewForm)

router
    .route("/:id")
    .get(wrapAsync(showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), wrapAsync(updateListing))
    .delete(isLoggedIn, wrapAsync(destroyListing));


// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(renderEditForm));


module.exports = router;
