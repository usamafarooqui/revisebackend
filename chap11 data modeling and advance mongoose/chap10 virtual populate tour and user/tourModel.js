// tour model mein reviews lanay k liye yahan virtal populate krengay 



// virtual populate (ye is liye hota hai q k hum ne child referencing ki hai reviews mein)
// yahan agr reviews ko integrate krden tou ye model ka size boht ziada barh jayega is liye 
// virtual populate use kr rahay hn
//                  virtual field name(koi bhi naam de saktay)
tourSchema.virtual('reviews',{
    ref:'Review', // model that we want to reference
    foreignField:'tour', // this is the field in the other model(review model ) where the current reference is store by id 
    localField:'_id' // wo field is model mein kahan hai ye bhi id tou 2no id se ye connect hojayegi
  });