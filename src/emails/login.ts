export default ({
  name,
  ip,
  userAgent,
  location,
  date,
}: {
  name: string;
  ip: string;
  userAgent: string;
  location: { city: string; region: string; country: string };
  date: string;
}) => ({
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login Alert</title>
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
    .header img {
      width: 48px;
    }
    .content h1 {
      font-size: 24px;
      color: #000;
    }
    .content p {
      font-size: 16px;
      color: #616161;
      line-height: 1.6;
    }
    .info-box {
      background-color: #f9f9f9;
      padding: 16px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .info-box p {
      margin: 6px 0;
      color: #333;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #aaa;
      margin-top: 20px;
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
      <img src="https://res.cloudinary.com/dpmx02shl/image/upload/v1760362575/logo1_snrxef.png" alt="CBSH Bank Logo">
    </div>
    <div class="content">
      <h1>New Login Alert</h1>
      <p>Hello ${name.replace(/\b\w/g, (char) => char.toUpperCase())},</p>
      <p>We noticed a login to your CBSH Bank account with the following details:</p>
      <div class="info-box">
        <p><strong>IP Address:</strong> ${ip}</p>
        <p><strong>Location:</strong> ${location.city}, ${location.region}, ${location.country}</p>
        <p><strong>Device:</strong> ${userAgent}</p>
        <p><strong>Date & Time:</strong> ${date}</p>
      </div>
      <p>If this was you, no further action is needed. If not, please secure your account immediately by resetting your password, or contact support: <span class="footerSpan" style="color: #1D9B5E">support@cbshbank.com</span></p>
    </div>
  </div>
  <div class="footer">
    <p><span class="footerSpan">CBSH Bank</span> — Your secure banking provider</p>
    <p>Need help? <a href="mailto:support@cbshbank.com">Contact Support</a></p>
    <p class="footerCopy">&copy; ${new Date().getFullYear()} CBSH Bank. All rights reserved.</p>
  </div>
</body>
</html>`,
});
