export default ({
  name,
  code,
  purpose,
}: {
  name: string;
  code: string;
  purpose: string;
}) => ({
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${purpose} OTP</title>
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
        width: 30px;
      }
      .content h1 {
        color: #000000;
        font-size: 22px;
      }
      .content p {
        font-size: 16px;
        color: #616161;
        line-height: 1.6;
      }
      .code-box {
        margin: 20px 0;
        padding: 15px;
        background-color: #1D9B5E;
        border-radius: 8px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #FFFFFF;
        letter-spacing: 4px;
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
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="https://res.cloudinary.com/dpmx02shl/image/upload/v1747069311/logo_saspld.png" alt="Logo">
      </div>
      <div class="content">
        <h1>${purpose} Code</h1>
        <p>Hi ${name},</p>
        <p>Your one-time code for <strong>${purpose}</strong> is:</p>
        <div class="code-box">${code}</div>
        <p>This code is valid for the next 10 minutes. Please do not share it with anyone.</p>
        <p>If you did not request this code, please ignore this email or contact support immediately.</p>
      </div>
    </div>
    <div class="footer">
      <p><span class="footerSpan">Your Bank</span> — Fast. Safe. Reliable.</p>
      <p>
        <a href="https://play.google.com">Google Play</a> |
        <a href="https://apps.apple.com">App Store</a>
      </p>
      <p>
        <span>Need help? Contact us at <a href="mailto:support@yourbank.com">support@yourbank.com</a></span>
      </p>
      <p class="footerCopy">&copy; ${new Date().getFullYear()} Your Bank. All rights reserved.</p>
    </div>
  </body>
  </html>`,
});
