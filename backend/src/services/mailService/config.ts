
import {MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS} from "../../env"
import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }

})

