export default ({ name }: { name: string }) => ({
  subject: "✅ Your CBSH Bank Account Has Been Restored",
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Account Restored</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #F1FAEF; color: #616161; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background-color: #FBFEFB; border-radius: 12px; padding: 20px; }
    .header img { width: 60px; margin-bottom: 20px; }
    .content h1 { color: #2E7D32; font-size: 22px; margin-bottom: 15px; }
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
      <h1>Account Access Restored</h1>
      <p>Hi ${name.replace(/\b\w/g, (char) => char.toUpperCase())},</p>
      <p>We’re pleased to inform you that your CBSH Bank account has been successfully restored, and you now have full access to all banking services and features.</p>
      <p>If you have any concerns or if this issue persists, feel free to reach out to our support team at <a href="mailto:support@cbshvault.com">support@cbshvault.com</a>.</p>
      <p>Thank you for your patience and for banking with CBSH Bank.</p>
      <p>Warm regards,<br />The CBSH Bank Support Team</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CBSH Bank. All rights reserved.
    </div>
  </div>
</body>
</html>`,
});
