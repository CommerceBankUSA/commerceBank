export default ({
  name,
  amount,
  date,
  transactionId,
  description,
  balance,
  type,
  subType,
}: {
  name: string;
  amount: number;
  date: string;
  transactionId: string;
  description: string;
  balance: number;
  type: string;
  subType: string;
}) => ({
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction Alert</title>
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
        text-align: center;
        margin: 0 auto;
      }
      .content  h2 {
        margin: 10px 0;
      }
      .content p {
        font-size: 16px;
        color: #616161;
        line-height: 1.6;
      }
      .content .highlight {
        color: #000000;
        font-weight: bold;
      }
      .content a.button {
        display: inline-block;
        background-color: #1D9B5E;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 20px;
        margin-top: 20px;
        color: #FFFFFF;
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
        <img src="https://res.cloudinary.com/dpmx02shl/image/upload/v1753090598/logo_oicitz.png" alt="Bank Logo">
      </div>
      <hr />
      <div class="content">
        <p>Dear ${name},</p>
        <p>Your transfer of $${amount.toLocaleString()} was initiated successfully. Your pending balance is <span class="highlight">$${balance.toLocaleString()}</span>.
        <hr />

        <h2 class="highlight">Transfer Details</h2>
        <p>Type: <span class="highlight">${type}</span></p>
        <p>Method: <span class="highlight">${subType}</span></p>
        <p>Amount: <span class="highlight">${amount.toLocaleString()}</span></p>
        <p>Description: <span class="highlight">${description || "No Description"}</span></p>
        <p>Transaction ID: <span class="highlight">${transactionId}</span></p>
        <p>Transaction Date: <span class="highlight">${date}</span></p>

        <hr />
        <a href="https//www.commercebankusa.com/auth" class="button">View Transaction</a>
      </div>
    </div>
    <div class="footer">
      <p><span class="footerSpan">Commerce Bank USA</span> — Reliable & Secure</p>
      <p>
        <a href="https://play.google.com">Google Play</a> |
        <a href="https://apps.apple.com">App Store</a>
      </p>
      <p>
       <span>Questions? Contact <a href="mailto:support@commercebankusa.com">support@commercebankusa.com</a></span><br />
       <span>Follow us on Twitter, Facebook, and Instagram</span>
      </p>
      <p class="footerCopy">&copy; ${new Date().getFullYear()} Commerce Bank USA. All rights reserved.</p>
    </div>
  </body>
  </html>`,
});
