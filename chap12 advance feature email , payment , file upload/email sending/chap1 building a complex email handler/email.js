// install nodemailer

const nodemailer = require('nodemailer');
const pug = require('pug');
const htmltoText = require('html-to-text')

// advance kaam yahan 
// email bhejnay ki class bna letay hn 

module.exports = class Email {
    // user k ander sari detail hogi uska naam aur email aur url mein kis email address se email jayegi
    constructor(user , url){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = 'Usama Farooqui <muhammadusamafarooqui@gmail.com';
    }
    
    // yahan transporter function 
    newTransport(){
        if(process.env.NODE_ENV === 'production'){
            // sendgrid 
            return nodemailer.createTransport({
                // sendgrid node mailer mein built in 
                service:'Sendgrid',
                auth:{
                    user:process.env.SENDGRID_USERNAME,
                    pass:process.env.SENDGRID_PASSWORD
                }
            })
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            auth:{
                user: process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD
            }
            
        });
    }

    // send actual email 
    async send(template , subject){
        // 1) Render HTml based on a pug template 
        // ye html file bhejnay k liye hai email mein
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`,{
            // yahan custom data bhejaingay 
            firstName: this.firstName,
            url:this.url,
            subject
        })

        // define email options 
        const mailOptions ={
            from:this.from,
            // options ye humara function ka parameter hai
            to:this.to,
            subject,
            html,
            // html ko as a text bhejna chahain agr 
            text:htmltoText.fromString(html)
        };

        // create transport and send email 
        await this.newTransport().sendMail(mailOptions);


    }

    async sendWelcome(){
       await this.send('welcome','welcome to natours ')
    }

    async sendPasswordReset(){
        await this.send(
            'passwordReset',
            'Your Password reset token (valid for 10 minutes)'
        )
    }
}








