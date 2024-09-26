const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'andresgp682@gmail.com',
        pass: 'actpdrjimvczkhvu',
    },
});
class SendEmail {

    static async sendEmail({email, subject, text}) {
        const mailOptions = {
            from: 'andresgp682@gmail',
            to: email,
            subject: subject,
            text: text
        };
        return await transporter.sendMail(mailOptions);
    }
}

module.exports = SendEmail;