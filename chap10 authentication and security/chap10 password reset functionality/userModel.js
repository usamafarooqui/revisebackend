



// passwordchangeAT yahan bnao
// 3 step of reset password
userSchema.pre('save',function(next){
    // agr password modify ya change nahi hua ya new hai  tou direct next krdega
    if(!this.isModified('password') || this.isNew) return next();
    // -1000 krna trick hai in case db se data slow jaye
    this.passwordChangedAt = Date.now()-1000;
    next();
})
