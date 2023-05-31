

const mongoose = require("mongoose");
const slugify = require("slugify");
const User = require('./userModel');


const tourSchema = new mongoose.Schema({
    // child referencing 

    guides:[
      {
        // ye btayega k yahan mongodb ki id lega 
        type:mongoose.Schema.ObjectId,
        ref:'User' // ye asal cheez hai k wo id konsay se model se ayegi yahan user ko import krnay ki bhi zaroorat nahi
      }
    ],
});


const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;