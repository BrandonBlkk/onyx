import { readFile } from 'node:fs/promises'

const accountDeletionEmail = async ({
  fullname,
  supportEmail = process.env.SUPPORT_EMAIL || 'support@onyx.com'
}) => {
  const logo = await readFile(new URL('../assets/logo.png', import.meta.url))

  return {
    html: `
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <title>Account Deletion Request</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
    </head>
    <body style="margin: 0; padding: 0; width: 100%; background-color: #f4f4f5; -webkit-font-smoothing: antialiased; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      
      <!-- Outer Wrapper -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="background-color: #f4f4f5; padding: 40px 16px;">
        <tr>
          <td align="center">
            
            <!-- Card Container -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="max-width: 540px; background-color: #ffffff; border: 1px solid #e4e4e7; border-collapse: separate; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
              
              <!-- Header / Logo -->
              <tr>
                <td align="center" style="padding: 10px 32px 5px 32px; background-color: #09090b;">
                  <a href="${process.env.CLIENT_URL || '#'}" target="_blank" style="text-decoration: none; display: inline-block;">
                    <img 
                      src="cid:onyx-logo" 
                      alt="Onyx" 
                      width="120" 
                      style="display: block; border: 0; outline: none; text-decoration: none; max-width: 120px; width: 100%; height: auto;" 
                    />
                  </a>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding: 40px 36px 32px 36px;">
                  
                  <h1 style="margin: 0 0 12px 0; font-size: 20px; line-height: 28px; font-weight: 600; color: #09090b; letter-spacing: -0.01em;">
                    Your account has been permanently deleted
                  </h1>

                  <p style="margin: 0 0 12px 0; font-size: 15px; line-height: 24px; color: #52525b;">
                    Hi ${fullname},
                  </p>
                  
                  <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #52525b;">
                    We are writing to confirm that we received a request to permanently delete your Onyx account, and this process is now complete.
                  </p>
                  
                  <!-- Security Note -->
                  <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 20px; color: #71717a;">
                    If you did not initiate this deletion request or believe it was processed in error, please contact us immediately at <a href="mailto:${supportEmail}" style="color: #2563eb; text-decoration: underline;">${supportEmail}</a> so our support team can assist you in securing your account.
                  </p>

                  <p style="margin: 0 0 28px 0; font-size: 13px; line-height: 20px; color: #71717a;">
                    We are sad to see you go! Thank you for being a part of Onyx.
                  </p>
                  
                  <hr style="border: none; border-top: 1px solid #f4f4f5; margin: 0 0 24px 0;" />
                  
                  <!-- Fallback Link -->
                  <p style="margin: 0 0 8px 0; font-size: 12px; line-height: 18px; color: #a1a1aa;">
                    If you need to contact support regarding your account, email us directly at:
                  </p>
                  <p style="margin: 0; font-size: 12px; line-height: 18px; word-break: break-all;">
                    <a href="mailto:${supportEmail}" style="color: #2563eb; text-decoration: underline;">${supportEmail}</a>
                  </p>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 20px 36px; background-color: #fafafa; border-top: 1px solid #f4f4f5; text-align: center;">
                  <p style="margin: 0; font-size: 12px; line-height: 18px; color: #a1a1aa;">
                    &copy; ${new Date().getFullYear()} Onyx. All rights reserved.
                  </p>
                </td>
              </tr>
              
            </table>
            
          </td>
        </tr>
      </table>
      
    </body>
    </html>
    `,
    attachments: [
      {
        content: logo.toString('base64'),
        filename: 'onyx-logo.png',
        contentId: 'onyx-logo',
      },
    ],
  }
}

export default accountDeletionEmail