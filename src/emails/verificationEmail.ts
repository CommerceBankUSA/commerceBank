export default ({
  name,
  verificationCode,
}: {
  name: string;
  verificationCode: string;
}) => ({
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
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
      line-height: 1.6;
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
      .code {
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
      <img src="https://res.cloudinary.com/dpmx02shl/image/upload/v1760362575/logo1_snrxef.png" alt="CBSH Bank Logo">
    </div>
    <div class="content">
      <h1>Verify Your Email Address</h1>
      <p>Hi ${name.replace(/\b\w/g, (char) => char.toUpperCase())},</p>
      <p>Thank you for joining CBSH Bank! As part of our commitment to your security, we ask that you verify your email address to complete the account setup process.</p>
      <p style="color: #1D9B5E; font-size: 28px; font-weight: 800">${verificationCode}</p>
      <p>This code will expire in 10 minutes. Please enter it promptly to continue.</p>
      <h2>Why This Matters</h2>
      <ul>
        <li style="margin-top: 10px">✅ Verify ownership of your email address.</li>
        <li style="margin-top: 10px">✅ Strengthen protection against unauthorized access.</li>
        <li style="margin-top: 10px">✅ Enable full access to your online banking tools.</li>
      </ul>
      <h2>Need Assistance?</h2>
      <p>We're here to help. If you have any issues verifying your email, please contact our support team.</p>
      <p>Warm regards,<br/>The CBSH Bank Team</p>
    </div>
  </div>
  <div class="footer">
    <p><span class="footerSpan">CBSH Bank</span> — banking made easy. Download our app to get started:</p>
    <p>
      <a href="https://play.google.com">Google Play</a> |
      <a href="https://apps.apple.com">App Store</a>
    </p>
    <p>
      <span>Need help? Contact us at <a href="mailto:support@cbshbank.com">support@cbshbank.com</a></span><br />
      <span>Follow us for updates on Facebook, Twitter, and Instagram.</span>
    </p>
    <p>Prefer not to receive these emails? <a href="#" style="color: #F75555;">Unsubscribe</a></p>
    <p class="footerCopy">&copy; ${new Date().getFullYear()} CBSH Bank. All rights reserved.</p>
  </div>
</body>
</html>`,
});
