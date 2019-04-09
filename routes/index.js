var express = require('express');
var router = express.Router();
var express = require('nodemailer');
require('../models/enquiry');
var mongoose = require('mongoose');
var Enquiry = mongoose.model('enqs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/02_about_us', function(req, res, next) {
  res.render('02_about_us', { title: 'Express' });
});

router.get('/04_blog', function(req, res, next) {
  res.render('04_blog', { title: 'Express' });
});

router.get('/05_contact', function(req, res, next) {
  res.render('05_contact', { title: 'Express' });
});

router.get('/res', function(req, res, next) {
  res.render('res', { title: 'Express' });
});




router.post('/enquiry', (req, res) => {
  const output = `
    <p>You have a  New Enquiry</p>
    <h3>Enquiry Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.number}</li>
     
     
     
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'joelmessi38@gmail.com', // generated ethereal user
        pass: 'takku143me#96'  // generated ethereal password
    },
    // tls:{
    //   rejectUnauthorized:false
    // }
  });
 
  // setup email data with unicode symbols
  let mailOptions = {
      from: 'joelmessi38@gmail.com', // sender address
      to: 'saketbari2015@gmail.com', // list of receivers
      subject: 'New Enquiry', // Subject line
      text: 'From Brandzia Website', // plain text body
      html: output // html body
  };
 
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);  
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
 
      res.send(`<body style="background-color:gray;"><div style="position:absolute; width : 100%;  height:5rem; text-align:center; font-size:2rem;top:50%;transform:translateY(-50%);">We Saved Your Enquiry. We will get in touch with you soon </div></body>`);
  });
});


router.post('/enq', function(req, res) {
  new Enquiry({name : req.body.name, email :
     req.body.email, subject : req.body.subject,
     message: req.body.message, phone : req.body.phone, date : req.body.date, 
    time : req.body.time, quantity : req.body.quantity}


)
  .save(function(err, Enquiry) {
    console.log('enqs');
    res.send(`<h1> Your Message has been saved<h1>`);
  });
});
module.exports = router;
