export const forgetPasswordOTPTemplate = (otp: string, name: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h3>Hi ${name}</h3>
        <h3>You have requested to change your password.</h3>
        <h4>Please ignore this email if it is not you!</h4>
        <p></p>
        <h2>Here is your OTP: <strong>${otp}</strong></h2>
    </body>
    </html>
    `;
};
