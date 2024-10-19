var nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();
exports.sendFromUserToMe = async (req, res) => {
    const { name, email, message,phonenumber } = req.body;

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user:  process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_FROM,
        subject: 'Contact From Producers_Planet User',
        text: `Name: ${name}\nEmail: ${email}\nPhoneNumber: ${phonenumber}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.log('Error sending email:', error);
        res.status(500).json({ Error:'Internal Server Error' });
    }
}