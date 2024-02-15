const express = require('express');
const router = express.Router();

const wildcardHandler = require('../utils/wildcardHandler');
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('../schema.js');

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
}));

router.get('/new', (req, res) => {
    res.render('listings/new.ejs');
});

router.get('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    res.render('listings/show', { listing });
}));
// router.get('/:id', async (req, res) => {
//     try {
//       const listingId = req.params.id;
//       const listing = await Listing.findById(listingId).populate('reviews');
//       if (!listing) {
//         throw new Error('Listing not found');
//       }
//       res.render('show', { listing }); // Assuming your EJS file is named 'show.ejs'
//     } catch (error) {
//       console.error('Error fetching listing:', error);
//       res.status(404).send('Listing not found');
//     }
//   });

router.post('/', validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
}));

router.get('/:id/edit', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    res.render('listings/edit.ejs', { listing });
}));

router.put('/:id', validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

router.delete('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect('/listings');
}));

router.post('/:id/reviews', validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));

router.all('*', wildcardHandler);

module.exports = router;
