export default ({ name }: { name: string }) => ({
  subject: "🎉 Your CBSH Bank Account is Fully Verified",
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Account Verified</title>
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
        text-align: center;
      }
      .header img {
      width: 48px;
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
      .content a.button {
        display: inline-block;
        background-color: #1D9B5E;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 20px;
        margin-top: 20px;
        color: #000000;
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
        .content p {
          font-size: 14px;
        }
        .content a.button {
          padding: 10px 15px;
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
        <h1>Your Account is Fully Verified</h1>
        <p>Hi ${name.replace(/\b\w/g, (char) => char.toUpperCase())},</p>
        <p>Congratulations! Your CBSH Bank account has been fully verified.</p>
        <p>You now have complete access to all our services and features — from managing your savings and checking accounts to making secure payments, transfers, and more.</p>
        <p style="color: #000000; font-weight: 600">Here’s what you can now enjoy:</p>
        <ol>
          <li style="margin-top: 10px">✅ Full access to your dashboard and transactions.</li>
          <li style="margin-top: 10px">✅ Instant transfers, deposits, and withdrawals.</li>
          <li style="margin-top: 10px">✅ 24/7 customer and mobile banking support.</li>
          <li style="margin-top: 10px">✅ A modern banking experience tailored to your needs.</li>
        </ol>
        <a href="#" class="button">Start Banking Now</a>
      </div>
    </div>
    <div class="footer">
      <p><span class="footerSpan">CBSH Bank</span> — banking made simple. Download our app today:</p>
      <p>
        <a href="https://play.google.com">Google Play</a> |
        <a href="https://apps.apple.com">App Store</a>
      </p>
      <p>
        <span>Need help? Contact us at <a href="mailto:support@cbshbank.com">support@cbshbank.com</a></span><br />
        <span>Stay connected: Follow us on Facebook, Twitter, and Instagram.</span>
      </p>
      <p>Prefer fewer emails? <a href="#" style="color: #F75555;">Unsubscribe</a></p>
      <p class="footerCopy">&copy; ${new Date().getFullYear()} CBSH Bank. All rights reserved.</p>
    </div>
  </body>
  </html>`,
});
