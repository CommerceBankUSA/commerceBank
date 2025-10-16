export default ({ name }: { name: string }) => ({
  subject:
    "🚫 Important: Your CBSH Bank Account Has Been Temporarily Suspended",
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Account Suspended</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #F1FAEF; color: #616161; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background-color: #FBFEFB; border-radius: 12px; padding: 20px; }
    .header img { width: 60px; margin-bottom: 20px; }
    .content h1 { color: #D32F2F; font-size: 22px; margin-bottom: 15px; }
    .content p { font-size: 16px; line-height: 1.6; }
    .footer { text-align: center; font-size: 12px; color: #aaa; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header" style="text-align: center;">
      <img src="https://res.cloudinary.com/dpmx02shl/image/upload/v1760362575/logo1_snrxef.png" alt="CBSH Bank Logo" />
    </div>
    <div class="content">
      <h1>Account Access Suspended</h1>
      <p>Dear ${name.replace(/\b\w/g, (char) => char.toUpperCase())},</p>
      <p>We are writing to inform you that access to your CBSH Bank account has been temporarily suspended as part of our routine security protocols.</p>
      <p>This action may be due to unusual activity or a potential violation of our banking terms and policies. Our goal is to protect your information and ensure the integrity of your financial transactions.</p>
      <p>If you believe this was done in error or would like to request a review, please contact our support team at <a href="mailto:support@cbshbank.com">support@cbshbank.com</a> as soon as possible.</p>
      <p>We appreciate your prompt attention and cooperation.</p>
      <p>Sincerely,<br />The CBSH Bank Security Team</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CBSH Bank. All rights reserved.
    </div>
  </div>
</body>
</html>`,
});
