const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send', (req, res) => {
    const { name, email, number, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'davidmwaniki2001@gmail.com',
            pass: 'david5512' // Replace with your actual password
        }
    });

    const mailOptions = {
        from: email,
        to: 'mbitid19@gmail.com',
        subject: `New Contact Form Enquiry: ${subject}`,
        html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Number: ${number}</p>
            <p>Subject: ${subject}</p>
            <p>Message: ${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Email sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
