const mongoose = require("mongoose");
const slugify = require("slugify");



const tourSchema = new mongoose.Schema(
  {
     startLocation:{
      // ye special cheez hai jo mongodb suppoert krta hai Geojson (in order specify geospecial data)
      // type aur coordinate btana se ye geojson data bngaya hai
      type:{
        type:String,
        default:'Point',
        // enum:['point'] poligon aur hexagon bhi de saktay hn magr default point hi hota hai
      },
      coordinates:[Number], // it means it will take a array of numbers
      // ye coordinates location btaingay is mein is mein longitude pehlay ayega phr lattitude ayega google map mein ulta hota hai [pehlay latiude hpta hai phr longitude]
      address:String,
      description:String
    },
    // agr array k ander ye saab bnayegay tou wo embedded/denormalise document bn jayega
    locations:[
      {
        type:{
          type:String,
          default:'point',
          // enum:['point']
        },
        coordinates:[Number],
        address:String,
        description:String,
        day:Number
        
      }
    ]

}
    );


    
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;