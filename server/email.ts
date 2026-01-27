import nodemailer from 'nodemailer';
import { Contact } from '@shared/schema';

// Configure the email transport
const createTransporter = () => {
  // Check if we're in development or production
  const isDev = process.env.NODE_ENV !== 'production';
  
  if (isDev) {
    // In development, use a preview/mock service
    console.log('Using development email configuration');
    // Use ethereal if credentials are available, otherwise use a mock transport
    if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    } else {
      // For development without SMTP credentials, use nodemailer's built-in test account
      console.log('Using mock transport for development');
      // Create a preview URL for the email with JSON output
      return {
        sendMail: async (mailOptions: any) => {
          console.log('Email would be sent in production:');
          console.log('To:', mailOptions.to);
          console.log('Subject:', mailOptions.subject);
          console.log('Text Content:', mailOptions.text?.substring(0, 100) + '...');
          return { messageId: 'mock-email-id-' + Date.now() };
        }
      };
    }
  } else {
    // In production, use real SMTP settings
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
};

/**
 * Format contact form submission as an HTML email
 */
export const formatContactEmail = (contact: Contact): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #007AFF;">New Contact Form Submission</h2>
      <p>You have received a new message from your website contact form.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Name</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${contact.firstName} ${contact.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${contact.email}" style="color: #007AFF;">${contact.email}</a></td>
        </tr>
        ${contact.phone ? `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${contact.phone}</td>
        </tr>
        ` : ''}
        ${contact.service ? `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Service Required</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${contact.service}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Date Submitted</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${new Date(contact.createdAt).toLocaleString()}</td>
        </tr>
      </table>
      
      <div style="background-color: #f7f7f7; padding: 20px; border-radius: 4px; margin-top: 20px;">
        <h3 style="margin-top: 0;">Message:</h3>
        <p style="white-space: pre-line;">${contact.message}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
        <p>This is an automated email from your website's contact form.</p>
      </div>
    </div>
  `;
};

/**
 * Send an email notification for a new contact form submission
 */
export const sendContactNotificationEmail = async (contact: Contact): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    // Get recipient address from environment variable or use a default
    const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'william@costlawyer.co.uk';

    const info = await transporter.sendMail({
      from: '"Mackenzie Costs Website" <no-reply@costlawyer.co.uk>',
      to: toEmail,
      subject: `New Contact Form Submission: ${contact.firstName} ${contact.lastName}`,
      html: formatContactEmail(contact),
      text: `New message from ${contact.firstName} ${contact.lastName} (${contact.email}): ${contact.message}`,
    });

    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    return false;
  }
};