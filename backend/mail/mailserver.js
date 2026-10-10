import transporter from "./transporter.js";
import verificationEMail from "./templates/verificationEMail.js";
import nodemailer from "nodemailer";
import verificationEMailSuccess from "./templates/verificationEMailSuccess.js";

export  async function RegisterEMail(user, token) {
    try {
        await transporter.verify();
        console.log("Mailserver is ready!");

        const content = verificationEMail(user, token);
        const info = await transporter.sendMail({
            from: `"Account Creation Service" <diplom@morrell.at>`,
            to: user.email,
            subject: "Welcome " + user.firstName,
            html: content
        });

        console.log("Message sent: %s", info.messageId)
    } catch(err) {
        console.error("Verification failed: ", err)
    }
}

export async function EMailVerificationSuccessful(user, token) {
    try {
        await transporter.verify();
        console.log("Mailserver is ready!");

        const content = verificationEMailSuccess(user);
        const info = await transporter.sendMail({
            from: `"Account Creation Service" <diplom@morrell.at>`,
            to: user.email,
            subject: "Successful verification " + user.firstName,
            html: content
        });

        console.log("Message sent: %s", info.messageId)
    } catch(err) {
        console.error("Verification failed: ", err)
    }
}