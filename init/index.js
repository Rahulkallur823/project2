const mongoose = require('mongoose');
const initData = require('./data.js');
const listing = require('../models/listing.js');


const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust';

main ()
  .then (result => {
    console.log ('connecetd to the db');
  })
  .catch (err => {
    console.log (err);
  });

async function main () {
  await mongoose.connect (MONGO_URL);
}


const initdb= async()=>{
     await listing.deleteMany({});
     await listing.insertMany(initData.data)
     console.log("data was inintiazed");
};

initdb();