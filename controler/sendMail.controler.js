const nodemailer = require('nodemailer');
require('dotenv').config();
// Configure Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' for Gmail, or specify another provider
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
  },
});

// Send an email
async function sendEmail(eventName,useremailId) {
  try {
    const info = await transporter.sendMail({
      from: '"Connectr" <connectrhandle@gmail.com>', // Sender's email
      to: useremailId, // Recipient's email
      subject: 'Hellow,Your Event registration is successful', // Subject line
      text: `Your rigistration for ${eventName} is recorded` ,
      html: `
    <div style="background: linear-gradient(135deg, #0f172a, #1e3a8a); color: white; text-align: center; padding: 20px; font-family: Arial, sans-serif; border-radius: 8px;">
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 10px;">Welcome to Connectr!</h2>
      <p style="font-size: 1rem; line-height: 1.5; margin-bottom: 20px;">Your registration for <strong>${eventName}</strong> has been successfully recorded.</p>
      <p style="font-size: 1rem; line-height: 1.5;">We’re excited to have you at our event!</p>
      <div style="margin-top: 20px; padding: 10px; background-color: rgba(255, 255, 255, 0.1); border-radius: 4px;">
        <p style="font-size: 0.9rem;">For more details, visit our website.</p>
      </div>
      <footer style="margin-top: 30px; font-size: 0.8rem; color: #a3bffa;">
        <p>Thank you,<br />Team Connectr</p>
      </footer>
    </div>
  `,
    });
    return info

    // console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
const sendMail = async(req,res)=>{
    try{
          const eventName=req.query.eventName
          const emailId=req.query.name
          const info=await sendEmail(eventName,emailId)
          res.status(200).json(info)

    }
    catch(err){
        res.status(500).json("Internal server error")
    }   
}
module.exports=sendMail