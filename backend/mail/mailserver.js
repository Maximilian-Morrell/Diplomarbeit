import transporter from "./transporter.js";
import verificationEMail from "./templates/verificationEMail.js";
import nodemailer from "nodemailer";

export default async function RegisterEMail(user) {
    try {
        await transporter.verify();
        console.log("Mailserver is ready!");

        const content = verificationEMail(user);
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