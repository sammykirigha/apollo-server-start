"use strict";
const nodemailer = require("nodemailer");

function createTransporter(config: any) {
    let transporter = nodemailer.createTransport(config);
    return transporter;
}

const defaultConfig = {
	host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
        user: "sammydorcis@outlook.com",
        pass: "Sammy3646."
    }
};


const sendMail = async (email: any) => {
		
        const transporter = createTransporter(defaultConfig);
        await transporter.verify();
        await transporter.sendMail(email);
    }

export default sendMail;