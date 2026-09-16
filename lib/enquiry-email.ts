import { site } from "@/lib/site";

export type Enquiry = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function enquirySubject({ name }: Enquiry) {
  return `${name} — website enquiry`;
}

export function enquiryText({ name, email, phone, message }: Enquiry) {
  const lines = [name, email];
  if (phone) lines.push(phone);
  return `${lines.join("\n")}\n\n${message}`;
}

export function enquiryHtml({ name, email, phone, message }: Enquiry) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : "";
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "";
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const phoneLine = phone
    ? `<p style="margin:6px 0 0;font-size:15px;line-height:1.4;"><a href="${escapeHtml(telHref)}" style="color:#111111;text-decoration:underline;">${safePhone}</a></p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(enquirySubject({ name, email, phone, message }))}</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f3f3;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f3;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:36rem;background:#ffffff;">
            <tr>
              <td style="padding:40px 40px 36px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;color:#111111;">
                <p style="margin:0;font-size:13px;line-height:1.4;letter-spacing:0.01em;">${escapeHtml(site.name)}</p>
                <p style="margin:28px 0 0;font-size:22px;line-height:1.3;font-weight:500;">${safeName}</p>
                <p style="margin:6px 0 0;font-size:15px;line-height:1.4;">
                  <a href="mailto:${safeEmail}" style="color:#111111;text-decoration:underline;">${safeEmail}</a>
                </p>
                ${phoneLine}
                <p style="margin:28px 0 0;border-top:1px solid #ececec;font-size:0;line-height:0;">&nbsp;</p>
                <p style="margin:28px 0 0;font-size:16px;line-height:1.55;">${safeMessage}</p>
                <p style="margin:36px 0 0;font-size:12px;line-height:1.4;color:#9a9a9a;">${escapeHtml(site.url.replace(/^https:\/\//, ""))}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
