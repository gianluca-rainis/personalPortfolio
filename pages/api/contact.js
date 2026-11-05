import nodemailer from 'nodemailer';

const CONTACT_RECEIVER = 'gianlucarainis@gmail.com';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body;

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    if ((body.senderName != null && typeof body.senderName !== 'string') || (body.replyEmail != null && typeof body.replyEmail !== 'string') || typeof body.subject !== 'string' || typeof body.message !== 'string') {
        return res.status(400).json({ error: 'Invalid field value' });
    }

    const safeName = sanitizeText(body.senderName, { maxLength: 100 });
    const safeReplyEmail = sanitizeText(body.replyEmail, { maxLength: 254 });
    const safeSubject = sanitizeText(body.subject, { maxLength: 500 });
    const safeMessage = sanitizeText(body.message, { allowNewLines: true, maxLength: 10000 });

    if (!safeSubject || !safeMessage) {
        return res.status(400).json({ error: 'Subject and message are required' });
    }

    if (safeReplyEmail && !isValidEmail(safeReplyEmail)) {
        return res.status(400).json({ error: 'Invalid reply email address' });
    }

    if (!process.env.EMAIL_NODE_MAILER || !process.env.PASSWORD_NODE_MAILER) {
        console.error('Missing email env vars.');

        return res.status(500).json({ success: false, error: 'Email service is not available yet' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_NODE_MAILER,
            pass: process.env.PASSWORD_NODE_MAILER
        }
    });

    try {
        await transporter.sendMail({
            from: `GRLabs Support Form`,
            to: CONTACT_RECEIVER,
            ...(safeReplyEmail && { replyTo: safeReplyEmail }),
            subject: `[Support] ${safeSubject}`,
            text: [
                `Name: ${safeName || 'Not provided'}`,
                `Reply email: ${safeReplyEmail || 'Not provided'}`,
                '',
                'Message:',
                safeMessage
            ].join('\n'),
            html: `
            <!DOCTYPE html>
            <html lang="en-US">
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <title>[Support] ${safeSubject}</title>
                </head>

                <body style="
                    margin:0;
                    padding:0;
                ">
                    <h2>New Support message</h2>
                    <p><strong>Name:</strong> ${escapeHtml(safeName || 'Not provided')}</p>
                    <p><strong>Reply email:</strong> ${escapeHtml(safeReplyEmail || 'Not provided')}</p>
                    <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
                    <hr />
                    <p style="white-space: pre-wrap;">${escapeHtml(safeMessage)}</p>
                </body>
            </html>
            `
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending contact email: '+error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
}

function sanitizeText(value, options = {}) {
    if (typeof value !== 'string') {
        return '';
    }

    const input = value.trim().slice(0, options.maxLength);

    if (options.allowNewLines) {
        return input.replace(/\r/g, '');
    }

    return input.replace(/[\r\n]/g, ' ');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
