"use strict";
const nodemailer = require("nodemailer");

function createTransporter(config: any) {
    let transporter = nodemailer.createTransport(config);
    return transporter;
}

const defaultConfig = {
	// name: 'Ebba Tromp',
	host: 'smtp.ethereal.email',
	// security: 'STARTTLS',
    port: 587,
    auth: {
        user: "ebba.tromp24@ethereal.email",
        pass: "ucH2kPEy31qJpWm64t"
    }
};


const sendMail = async (email: any) => {
		
        const transporter = createTransporter(defaultConfig);
        await transporter.verify();
        await transporter.sendMail(email);
		console.log("creating a new account........");
    }

export default sendMail;