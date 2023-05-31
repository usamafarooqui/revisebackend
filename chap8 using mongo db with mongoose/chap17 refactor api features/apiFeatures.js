

 // sare functions ko 1 class mein krna hai
 class ApiFeatures {
  // contructor is call when a object is call out of this class
  // query = Tour.find() , queryString = req.query
    constructor(query , queryString){
      this.query = query;
      this.queryString = queryString;
    }

    // filter function 
    filter(){

      // const queryObj ={...req.query}; req.query availabe nahi hogi is liye queryString
      const queryObj ={...this.queryString}; 
      const excludeFields = ['page','sort','limit','fields'];
      excludeFields.forEach(el => delete queryObj[el])
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => `$${match}`);
      // let query =  Tour.find(JSON.parse(queryStr));
      this.query = this.query.find(JSON.parse(queryStr));

      // filter method kuch return nahi krta is se filter object return kranay k liye 
      return this;
    }

    // sorting function 
    sort(){
      if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
        console.log(sortBy);
      }else{
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }

    limitFields(){
      if(this.queryString.fields){
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      }else{
        this.query = this.query.select('-__v');
      }

      return this;
    }

    paginate(){
      const page = this.queryString.page *1 || 1;
      const limit = this.queryString.limit *1 || 100;
      const skip = (page -1 ) * limit;
      this.query = this.query.skip(skip).limit(limit)
      
      return this;
    }


  }
  
  module.exports = ApiFeatures;