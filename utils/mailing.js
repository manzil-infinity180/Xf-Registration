var nodemailer = require("nodemailer");

// mailtrap 

// const sendEmail = async (options) =>{
//   const transporter = nodemailer.createTransport({
//     host : process.env.EMAIL_HOST,
//     port : process.env.EMAIL_PORT,
//     // secure: true,
//     auth:{
//       user: process.env.EMAIL_USERNAME,
//       pass : process.env.EMAIL_PASSWORD
//     }
//   });

// using gmail 

  const sendEmail = async (options) =>{
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      // port: 587,
      // secure: true,
      auth:{
        user: process.env.REAL_EMAIL_ID,
        pass: process.env.REAL_PASSWORD
      }
    })
  
  const  mailOption = {
    from : "Xf Organisation <noreply.registration.xf>",
    to : options.email,
    subject : options.subject,
    text : options.message
  }

   await transporter.sendMail(mailOption,(error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = sendEmail;