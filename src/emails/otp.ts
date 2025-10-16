interface OtpEmailProps {
  name: string;
  otp: string;
  otpType: string;
}

export default ({ name, otp, otpType }: OtpEmailProps) => ({
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${otpType} Email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #F1FAEF;
        color: #616161;
      }
      .email-container {
        max-width: 600px;
        margin: auto;
        background-color: #FBFEFB;
        border-radius: 12px;
        padding: 20px;
      }
      .header {
        padding-bottom: 20px;
      }
      .header img {
        width: 60px;
      }
      .content h1 {
        color: #000000;
        font-size: 24px;
      }
      .content p {
        font-size: 16px;
        color: #616161;
        line-height: 1.6;
      }
      .otp-code {
        background-color: #E8F5EE;
        padding: 12px 20px;
        display: inline-block;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 4px;
        border-radius: 10px;
        color: #1D9B5E;
        margin-top: 10px;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #aaa;
      }
      .footer a {
        color: #555;
        text-decoration: none;
      }
      .footerSpan {
        color: #1D9B5E;
        font-size: 14px;
        font-weight: bold;
      }
      .footerCopy {
        text-align: center;
        font-size: 12px;
        color: #999;
        margin-top: 30px;
      }
      @media screen and (max-width: 480px) {
        .content h1 {
          font-size: 20px;
        }
        .otp-code {
          font-size: 20px;
        }
        .content p {
          font-size: 14px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="https://res.cloudinary.com/dpmx02shl/image/upload/v1760362575/logo1_snrxef.png" alt="CBSH Bank Logo" />
      </div>
      <div class="content">
        <h1>Your ${otpType} is here</h1>
        <p>Hi ${name.replace(/\b\w/g, (char) => char.toUpperCase())},</p>
        <p>Here is your <strong>${otpType}</strong>. Please use it to validate your authentication:</p>
        <div class="otp-code">${otp}</div>
        <p style="margin-top: 20px;">For your security, this code will expire shortly. If you did not request this code, please contact support immediately.</p>
      </div>
    </div>
    <div class="footer">
      <p><span class="footerSpan">CBSH Bank</span> at the touch of a button! Download our app for:</p>
      <p>
        <a href="https://play.google.com">Google Play</a> |
        <a href="https://apps.apple.com">App Store</a>
      </p>
      <p>
        <span>Questions or concerns? Get in touch at <a href="mailto:support@cbshbank.com">support@cbshbank.com</a></span> <br />
        <span>Stay connected with us on Twitter, Facebook and Instagram</span>
      </p>
      <p>Don't want any more emails from us? <a href="#" style="color: #F75555;">Unsubscribe</a></p>
      <p class="footerCopy">&copy; ${new Date().getFullYear()} CBSH Bank. All rights reserved.</p>
    </div>
  </body>
  </html>`,
});
