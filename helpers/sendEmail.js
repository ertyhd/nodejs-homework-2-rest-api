const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, MAIL_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: MAIL_FROM,
    pass: "9$Bd3#xGp7@WfZ2K",
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: MAIL_FROM };
  await transport.sendMail(email);

  return true;
};

module.exports = sendEmail;
