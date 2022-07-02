"use strict";
const nodemailer = require("nodemailer");

function createTransporter(config: any) {
    let transporter = nodemailer.createTransport(config);
    return transporter;
}

const defaultConfig = {
    service: "hotmail",
    auth: {
        user: "sammydorcis@outlook.com",
        pass: "Sammy3646."
    }
};


const sendMail = async (email: any) => {
		console.log("creating a new account........");
		
        const transporter = createTransporter(defaultConfig);
        await transporter.verify();
        await transporter.sendMail(email);
    }

export default sendMail;