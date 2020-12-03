const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "super.detskieigruski@gmail.com",
    pass: "Kalead12345",
  },
  from: "Детские игрушки <super.detskieigruski@gmail.com>",
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Info", info);
  });
}

module.exports = mailer;
