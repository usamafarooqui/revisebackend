const express = require('express');
const fs = require('fs');


const app = express();

// file ko read kisi bhi route se bahr krtay hn q k wo 1 time hi read hogi out of route 
// aur event loop nahi rok k rakhay gi
// json.parse se jo json ayegi wo array of javascript object mein convert hojayegi
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


// how to return only 1 tour 
// iske k liye id ya kisi bhi naam ka varaible bnana prega
// url mein variable bnana k liye :variable_name
// to make a parameter optional uske agay question mark laga do :x?
app.get('/api/v1/tours/:id' , (req, res)=>{
    console.log(req.params);
 
 //    to find something in a array 
 // el variable name hai jo filter data return krega
     // params se jo value ayegi wo string mein hogi usko convert krnay k liye 1 se multiply
     const id = req.params.id *1 ;
     const tour = tours.find(el => el.id === id)
     // agr tour ki id se ziada hai tou 
     if(!tour){
        // return laganay se foran exit hojayega
        return res.status(404).json({
             status:"fail",
             message:"invalid id"
         })
     }
 
     res.status(200).json({
         status:'success',
         data:{
             tour
         }
         
     })
 })
 



// to create a basic server

const port = 8000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
