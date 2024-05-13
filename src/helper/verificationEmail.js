const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../secret");

console.log(smtpUserName,smtpPassword);
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
});

const sendEmail = async (emailData)=>{

   try
   {
    const emailDetails ={
        from: smtpUserName, // sender address
        to: emailData.email, // list of receivers
        subject: emailData.subject, // Subject line
        html: emailData.html, 
       }
    
       const info = await transporter.sendMail(emailDetails);
       console.log("Message sent: %s", info.response);
   } 
   catch(err)
   {
     console.log(err);
     throw err;
   }
   
}

module.exports = {
  sendEmail,
};