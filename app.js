const express = require('express');
const app = express();
const port = 7337;
const path = require('path');
const methodOverride = require('method-override');
const reviews = require('./routes/review.js');
const wildcardHandler = require('./utils/wildcardHandler'); 

const listings = require('./routes/listing.js');

const ejs = require('ejs'); 
const ejsMate=require("ejs-mate")

const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError.js');
const Review = require('./models/review.js');

// const Listing = require('./models/listing.js');
// const Review = require("./models/review.js");
// const wrapAsync= require('./utils/wrapAsync.js');
// const {listingSchema,reviewSchema} =require("./schema.js");





const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust';

main()
  .then(result => {
    console.log('connected to the db');
  })
  .catch(err => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

// const validateListing=(req,res,next)=>{
//   let {error}= listingSchema.validate(req.body);
//   console.log(result)
//   if (error) {
//     let errmsg=error.details.map((el)=>{
//       el.message
//     }).join(",")
//    throw new ExpressError(400,errmsg)
//   }
// }



// const validatereview = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);
//   console.log(error); // Corrected to log the error variable
//   if (error) {
//     let errmsg = error.details.map((el) => {
//       el.message;
//     }).join(",");
//     throw new ExpressError(400, errmsg);
//   } else {
//     next(); // Proceed to the next middleware or route handler if validation passes
//   }
// }










app.get('/', (req, res) => {
  res.send('working perfectly');
});









app.use("/listings",listings)
app.use("/listings/:id/reviews",reviews)




// app.get('/listings', async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render('listings/index.ejs', { allListings });
// });

// app.get('/listings/new', (req, res) => {
//   res.render('listings/new.ejs');
// });

// app.get('/listings/:id', wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id).populate("reviews");
//   res.render('listings/show', { listing });
// }));

// // create route// 
// app.post("/listings", validateListing,wrapAsync(async (req, res,next) => {

//   const newListing = new Listing(req.body.listing);

// await newListing.save();
// res.redirect("/listings")
// }));

// app.get("/listings/:id/edit",async(req,res)=>{
//   let {id}=req.params;
//   const listing = await  Listing.findById(id).populate("reviews")  ;

//   res.render("listings/edit.ejs",{listing})
// })



// app.put("/listings/:id",  validateListing,wrapAsync(async(req,res)=>{
 
//   let {id}=req.params;
//   await Listing.findByIdAndUpdate(id,{...req.body.listing})
// res.redirect(`/listings/${id}`)

// }))

// app.delete("/listings/:id",async (req,res)=>{
  
//   let {id}=req.params;
//   let deletelisting= await Listing.findByIdAndDelete(id)
//   console.log(deletelisting)
//   res.redirect("/listings")
// });




//   app.post("/listings/:id/reviews",validatereview,wrapAsync(async(req,res)=>{
//     let listing= await Listing.findById(req.params.id);
//     let newReview=new Review(req.body.review);
  
  
//     listing.reviews.push(newReview);    
  
//    await newReview.save();
//    await listing.save();
// res.redirect(`/listings/${listing._id}`)
//    console.log("review has saved successfully")
//   }));



// // 
// // delete route for reviews
// app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
//   let {id,reviewId}=req.params;
//   Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})

//    await review.findByIdAndDelete(reviewId);



//    res.redirect(`/listings/${id}`);
// }));

app.all("*", wildcardHandler);

// app.all("*",(req,res,next) => {

// next(new ExpressError(404,"page not found"));

// });


app.use((err,req,res,next)=>{
  let {statuscode=500,message='something went wrong'}=err;
// res.status(statuscode).send(messege); 
res.status(statuscode).render("error.ejs",{message})
})

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
