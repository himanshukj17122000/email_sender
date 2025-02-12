const express = require('express');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: `${process.env.SENDER}`,
        pass: `${process.env.PASSWORD}`
    }
});
// var transporter = nodemailer.createTransport({
//     service: 'gmail', //process.env.SERVICE_PROVIDER,
//     auth: {
//         user: `${process.env.SENDER}`,
//         pass: `${process.env.PASSWORD}`
//     }
// });
// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.options('*', cors())
// define a simple route
app.post('/', cors(), (req, res) => {
    try{
    const mailOptions = {
        from: process.env.SENDER, // sender address
        to: req.body.email, // list of receivers
        subject: 'Thanks for joining in!', // Subject line
        html: `<p>Welcome to the app, Himanshu! Let me know how you get along with the app. </p>`, // plain text body
        replyTo: process.env.SENDER
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    res.json({"message":"Email sent"});
} catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
}
});

// define a simple route
app.post('/weekly',cors(), async (req, res) => {
    try{
    const mailOptions = {
        from: process.env.SENDER, // sender address
        to: req.body.email, // list of receivers
        subject: 'Your weekly words are in!', // Subject line
        html: `<div>The following are the new words you learnt: </div>`+ req.body.data, // plain text body
        replyTo: process.env.SENDER
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    res.json({"message": "Email sent"});
} catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
}
});

app.listen(PORT, () => {
    console.log(`Listening at the port ${PORT}`)
})