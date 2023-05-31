const express = require('express');
const fs = require('fs');


const app = express();

// file ko read kisi bhi route se bahr krtay hn q k wo 1 time hi read hogi out of route 
// aur event loop nahi rok k rakhay gi
// json.parse se jo json ayegi wo array of javascript object mein convert hojayegi
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// lets create our 1st route 
// v1 is version 1 of our api in case api change krni ho ya update tou sab cheezain esi hi aur v2 kro
app.get('/api/v1/tours' , (req, res)=>{
    // uper tours ka response bhejnay k liye
    res.status(200).json({
        status:'success',
        results: tours.length, 
        data:{
            // ya tou esay bhej saktay hn 
            // tours:tours 
            // new version of javascript mein agr 2no name same ho tou wo 1 bar likhnay se key value pair bn jata hai
            tours
        }
    })
})


// to create a basic server

const port = 8000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
