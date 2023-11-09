export const registerOTPTemplate = (otp: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h3>Thanks for register OwwiMoney</h3>
        <p></p>
        <h2>Here is your OTP: <strong>${otp}</strong></h2>
    </body>
    </html>
    `;
};
