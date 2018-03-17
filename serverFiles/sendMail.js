const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'projectsanchep@gmail.com',
    pass: 'sanchepwin'
  }
});

  var sendMail = (userInfo,callback) => {

    console.log(userInfo);
    var send = `Hi ${userInfo.name}, 
Nice to hear from you,
We just recieved your message,
We will get in touch as soon as possible.
REGARDS,
Team Sankshep
(http://snakshep.herokuapp.com)`;
  
    var sendSelf = `Feedback from ${userInfo.name}
  Email: ${userInfo.email}, 
  ${userInfo.feedback}`;
  
  
    var mailOptions = {
      from: 'TEAM SANKSHEP',
      to: userInfo.email,
      subject: 'Thanks For The Message',
      text: send
    };
    var selfMailOptions = {
      from: userInfo.email,
      to: 'projectsanchep@gmail.com',
      subject: `Team Sankshep Feedback from ${userInfo.name}`,
      text: sendSelf
    };
  
    transporter.sendMail(selfMailOptions,(err,info) => {
      if(err){
        return callback(err);
      } else {
        transporter.sendMail(mailOptions,(err,info) => {
            if(err){
              return callback(err);
            } else {
              return callback(undefined,send);
            }
        });
        
      }
    });
    
  };
  
  module.exports = {sendMail}