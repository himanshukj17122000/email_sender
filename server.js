const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
var nodemailer = require('nodemailer');
const PORT = process.env.PORT || 5000;
var transporter = nodemailer.createTransport({
    service: 'gmail', //process.env.SERVICE_PROVIDER,
    auth: {
        user: 'devconnecthkj@gmail.com',
        pass: 'Himanshu17december'
    }
});
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.post('/', async (req, res) => {
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
app.post('/weekly', async (req, res) => {
    try{
    const mailOptions = {
        from: process.env.SENDER, // sender address
        to: req.body.email, // list of receivers
        subject: 'Your weekly words are in!', // Subject line
        html: `<p>`+req.body.data+`</p>`, // plain text body
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