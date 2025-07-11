export default ({ name }: { name: string }) => ({
  subject: "🚫 Your Commerce Bank USA Account Has Been Suspended",
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Suspended</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #F1FAEF; color: #616161; margin: 0; padding: 0; }
      .email-container { max-width: 600px; margin: auto; background-color: #FBFEFB; border-radius: 12px; padding: 20px; }
      .content h1 { color: #D32F2F; font-size: 20px; }
      .content p { font-size: 16px; color: #616161; line-height: 1.6; }
      .footer { text-align: center; font-size: 12px; color: #aaa; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="content">
        <h1>Account Suspended</h1>
        <p>Dear ${name},</p>
        <p>We regret to inform you that your Commerce Bank USA account has been suspended due to a violation of our platform policies or suspicious activity.</p>
        <p>If you believe this was a mistake, please contact our support team immediately to resolve the issue.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Commerce Bank USA. All rights reserved.
      </div>
    </div>
  </body>
  </html>`,
});
