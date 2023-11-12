var nodemailer = require("nodemailer");
const sendEmail = async (options) =>{
  const transporter = nodemailer.createTransport({
    host : process.env.EMAIL_HOST,
    port : process.env.EMAIL_PORT,
    // secure: true,
    auth:{
      user: process.env.EMAIL_USERNAME,
      pass : process.env.EMAIL_PASSWORD
    }
  });
  const  mailOption = {
    from : 'Xf Registration <noreply@nofications.registration.xf>',
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