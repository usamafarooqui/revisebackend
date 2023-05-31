const express = require('express');
const fs = require('fs');


const app = express();

// file ko read kisi bhi route se bahr krtay hn q k wo 1 time hi read hogi out of route 
// aur event loop nahi rok k rakhay gi
// json.parse se jo json ayegi wo array of javascript object mein convert hojayegi
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// for post request 

// req direct data nahi le sakta uske is kaam k liye middleware chaiye hota hai
// modify incoming request data
// agr ye middle ware nahi lagaingay tou humain data nahi milega in return
app.use(express.json()); 

// post route 

app.post('/api/v1/tours' , (req, res)=>{
    // console.log(req.body);
    // ab hum ye jo data hai usko json file mein add krengay
    // q k ye database nahi hai tou id khud bnani pregi db hota tou khud id bna leta
    const newId = tours[tours.length-1].id + 1;
    // object.assign new object bnata hai 2 existing object ko merge kr k 
    const newTour = Object.assign({id:newId} , req.body);

    // uper jo tours ka array call kia hai tours-simple  se us mein new tour add kro
    tours.push(newTour);
    //                                                           tours object hai isko json mein krnay k liye .stringify
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json` , JSON.stringify(tours) , err => {
        res.status(201).json({
            status:"success",
            data:{
                tour : newTour
            }
        });
    })
 
})



// to create a basic server

const port = 8000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});