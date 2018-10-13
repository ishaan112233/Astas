const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
   service: 'gmail',
   secure: false,
   port: 25,
   auth: {
       user: 'ishaans937@gmail.com',
       pass: ''
   },
   tls: {
       rejectUnauthorized: false
   } 

});
let HelperOptions = {
    form: '"Ishaan Sharma" <ishaans937@gmail.com',
    to: 'ishaans937@gmail.com',
    subject: 'Done',
    text: 'FInally Did it' 
};
transporter.sendMail(HelperOptions , (err,info) =>{
    if(err){
        console.log(err);
    }
    else{
        confirm.log('Done');
    }
});