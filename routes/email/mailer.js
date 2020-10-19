var nodemailer = require('nodemailer');
// const xoauth2 = require('xoauth2');
require('dotenv').config();

var transporter = nodemailer.createTransport({
service: 'yahoomail',
host: 'smtp.deavielcollege.org',
secure: 'true',
port: '465',
auth: {
    user: process.env.USER,
    pass: process.env.PASS
// type: 'OAuth2', //Authentication type
// user: 'noreply@deavielcollege', //For example, xyz@gmail.com
// clientId: '619071863094-njlfbfli9a7o08h30moitf8a3lgcn65j.apps.googleusercontent.com',
// clientSecret: 'WX_fUd7B_m9D-_OOplrR3evh',
// refreshToken: 'Refresh_Token'
  }
});



module.exports={transporter}