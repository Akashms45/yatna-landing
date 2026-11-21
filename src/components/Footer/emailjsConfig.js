/**
 * EmailJS Configuration
 * 
 * Replace these placeholder IDs with your actual EmailJS credentials:
 * 1. serviceId: Your EmailJS Service ID (e.g., 'service_xxxxxxx')
 * 2. templateId: Your EmailJS Template ID (e.g., 'template_xxxxxxx')
 * 3. publicKey: Your EmailJS Public Key / User ID (e.g., 'user_xxxxxxx' or public key)
 * 
 * You can also define these in a .env file as:
 * VITE_EMAILJS_SERVICE_ID=...
 * VITE_EMAILJS_TEMPLATE_ID=...
 * VITE_EMAILJS_PUBLIC_KEY=...
 */
export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_eoln8j8',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_q3t7eci',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'bZaNzAgdmkjpWQvTX',
};

