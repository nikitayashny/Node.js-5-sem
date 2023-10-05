const nodemailer = require('nodemailer');

function send(fromEmail, password, message) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromEmail,
      pass: password
    }
  });

  const mailOptions = {
    from: fromEmail,
    to: fromEmail,
    subject: 'Test Email',
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = { send };