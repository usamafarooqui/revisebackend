// yahan signup k under se email send krengay 
// import email 
const Email = require('./../utils/email')

// create a user 

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    // yahan email bhejo 
    const url = `${req.protocol}://${req.get('host')}/me`;
   await  new Email(newUser , url).sendWelcome();

    // createSendToken(newUser , 201 , res);
    const token = signToken(newUser._id);
})
