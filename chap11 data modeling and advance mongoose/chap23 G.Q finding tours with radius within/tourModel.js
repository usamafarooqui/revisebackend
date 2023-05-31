

// geospatial start location ko bhi index kro
// yahan 1 ya -1 nahi ayega ye geospatial hai yahan 2dshere ayega it is earth like sphere where all our data is store
tourSchema.index({startLocation:'2dsphere'});