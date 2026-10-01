const nodemailer = require("nodemailer");
const transporter = require("./EmailConfig.js");

const sendverificationCode = async (email, verificationCode) => {
    try {
        const info = await transporter.sendMail({
            from: `"DEMO Mail" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Your Verification Code",

            // =========================
            // Plain Text Version
            // =========================
            text: `
Hello,

Welcome to DEMO Mail!

To complete your account verification, please use the verification code below:

${verificationCode}

This code is valid for 10 minutes.

If you did not create a DEMO Mail account, you can safely ignore this email.

Regards,
DEMO Mail Team

© ${new Date().getFullYear()} DEMO Mail. All rights reserved.
            `,

            // =========================
            // HTML Version - Dark Theme
            // =========================
            html: `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your DEMO Mail Account</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #0b1020;
    font-family: Arial, Helvetica, sans-serif;
">

    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
            background-color: #0b1020;
            padding: 40px 15px;
        "
    >
        <tr>
            <td align="center">

                <!-- Main Container -->
                <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="
                        max-width: 600px;
                        background-color: #111827;
                        border-radius: 18px;
                        overflow: hidden;
                        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
                    "
                >

                    <!-- Header -->
                    <tr>
                        <td
                            align="center"
                            style="
                                background: linear-gradient(
                                    135deg,
                                    #7c3aed 0%,
                                    #2563eb 55%,
                                    #06b6d4 100%
                                );
                                padding: 38px 25px;
                            "
                        >

                            <div style="
                                font-size: 32px;
                                font-weight: 800;
                                letter-spacing: 3px;
                                color: #ffffff;
                            ">
                                DEMO Mail
                            </div>

                            <div style="
                                margin-top: 8px;
                                font-size: 13px;
                                color: #e0f2fe;
                                letter-spacing: 1px;
                            ">
                                SECURE • SIMPLE • POWERFUL
                            </div>

                        </td>
                    </tr>


                    <!-- Content -->
                    <tr>
                        <td style="
                            padding: 45px 40px 30px;
                        ">

                            <!-- Icon -->
                            <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                            >
                                <tr>
                                    <td align="center">

                                        <div style="
                                            width: 70px;
                                            height: 70px;
                                            line-height: 70px;
                                            background-color: #1e293b;
                                            border-radius: 50%;
                                            font-size: 32px;
                                        ">
                                            🔐
                                        </div>

                                    </td>
                                </tr>
                            </table>


                            <!-- Heading -->
                            <h1 style="
                                margin: 25px 0 10px;
                                text-align: center;
                                color: #f8fafc;
                                font-size: 27px;
                                line-height: 1.3;
                            ">
                                Verify Your Account
                            </h1>


                            <!-- Description -->
                            <p style="
                                margin: 0;
                                text-align: center;
                                color: #94a3b8;
                                font-size: 15px;
                                line-height: 1.7;
                            ">
                                Welcome to DEMO Mail! We're excited to have you
                                with us. Please use the verification code below
                                to complete your account verification.
                            </p>


                            <!-- Verification Code -->
                            <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                style="
                                    margin-top: 30px;
                                "
                            >
                                <tr>
                                    <td
                                        align="center"
                                        style="
                                            background-color: #0f172a;
                                            border: 1px solid #334155;
                                            border-radius: 14px;
                                            padding: 25px 15px;
                                        "
                                    >

                                        <div style="
                                            font-size: 12px;
                                            color: #94a3b8;
                                            text-transform: uppercase;
                                            letter-spacing: 2px;
                                            font-weight: bold;
                                            margin-bottom: 12px;
                                        ">
                                            Your Verification Code
                                        </div>


                                        <div style="
                                            font-size: 36px;
                                            font-weight: 800;
                                            letter-spacing: 8px;
                                            color: #67e8f9;
                                        ">
                                            ${verificationCode}
                                        </div>

                                    </td>
                                </tr>
                            </table>


                            <!-- Expiry -->
                            <p style="
                                margin: 22px 0 0;
                                text-align: center;
                                font-size: 14px;
                                color: #94a3b8;
                            ">
                                ⏱️ This code will expire in

                                <strong style="
                                    color: #f8fafc;
                                ">
                                    10 minutes
                                </strong>.
                            </p>


                            <!-- Security Notice -->
                            <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                style="
                                    margin-top: 30px;
                                "
                            >
                                <tr>

                                    <td style="
                                        background-color: #2a1a12;
                                        border-left: 4px solid #fb923c;
                                        padding: 15px 18px;
                                        border-radius: 8px;
                                    ">

                                        <div style="
                                            font-size: 13px;
                                            line-height: 1.6;
                                            color: #fed7aa;
                                        ">

                                            <strong>
                                                Security notice:
                                            </strong>

                                            Never share this verification code
                                            with anyone. DEMO Mail will never ask
                                            you for your verification code.

                                        </div>

                                    </td>
                                </tr>
                            </table>


                            <!-- Ignore Message -->
                            <p style="
                                margin: 30px 0 0;
                                text-align: center;
                                color: #94a3b8;
                                font-size: 13px;
                                line-height: 1.6;
                            ">
                                If you did not create a DEMO Mail account,
                                you can safely ignore this email.
                            </p>

                        </td>
                    </tr>


                    <!-- Divider -->
                    <tr>
                        <td style="
                            padding: 0 40px;
                        ">

                            <div style="
                                height: 1px;
                                background-color: #334155;
                            "></div>

                        </td>
                    </tr>


                    <!-- Footer -->
                    <tr>
                        <td
                            align="center"
                            style="
                                padding: 28px 30px 35px;
                                background-color: #111827;
                            "
                        >

                            <div style="
                                font-size: 15px;
                                font-weight: 700;
                                color: #e2e8f0;
                            ">
                                Regards,
                            </div>


                            <div style="
                                margin-top: 5px;
                                font-size: 14px;
                                color: #94a3b8;
                            ">
                                DEMO Mail Team
                            </div>


                            <div style="
                                margin-top: 22px;
                                font-size: 12px;
                                color: #94a3b8;
                                line-height: 1.6;
                            ">
                                © ${new Date().getFullYear()} DEMO Mail.
                                All rights reserved.
                            </div>

                        </td>
                    </tr>

                </table>


                <!-- Bottom Text -->
                <div style="
                    max-width: 600px;
                    margin-top: 18px;
                    text-align: center;
                    color: #64748b;
                    font-size: 11px;
                    line-height: 1.5;
                ">
                    This is an automated email. Please do not reply to this
                    message.
                </div>

            </td>
        </tr>
    </table>

</body>
</html>
            `,
        });

        console.log("Verification email sent:", info.messageId);

        // Ethereal preview URL
        const previewUrl = nodemailer.getTestMessageUrl(info);

        if (previewUrl) {
            console.log("Preview URL:", previewUrl);
        }

        return info;

    } catch (err) {
        console.error("Error while sending verification email:", err);
        throw err;
    }
};

module.exports = {
    sendverificationCode
};