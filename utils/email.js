const nodemailer = require('nodemailer');

const sendMail = async options => {

    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        // service: 'Gamil',
        host: process.env.EMAIL_HOST,
        port: process.env.EMIAL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
        // Activate in gmail "less secure app" option
    })
    // 2) Define the email options
    const mailOptions = {
        from: 'Avdhesh Kumar Nigam <avdheshkn@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:

    }
    // 3) Actually send the mail
    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;