const express = require('express');
const fs = require('fs');


const app = express();

// file ko read kisi bhi route se bahr krtay hn q k wo 1 time hi read hogi out of route 
// aur event loop nahi rok k rakhay gi
// json.parse se jo json ayegi wo array of javascript object mein convert hojayegi
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


// Put request abhi sach mein update nahi kra rahay wo agay hoga

app.patch('/api/v1/tours/:id' , (req, res)=>{
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status:'fail',
            message:'invalid id '
        })
    }

    res.status(200).json({
        status:'success',
        data:{
            tour:'updated tour here'
        }
    })
})

// delete a request 


app.delete('/api/v1/tours/:id' , (req, res)=>{
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status:'fail',
            message:'invalid id '
        })
    }

    res.status(204).json({
        status:'success',
        data:{
            tour:null
        }
    })
})


// to create a basic server

const port = 8000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
