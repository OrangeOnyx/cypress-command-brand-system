# Cypress Command email signatures

Use `signature-text-first.html` as the most robust option. It is a table-based, inline-styled signature with no image hosting or font dependency. The company name is ordinary text, not a substitute logo wordmark. `signature.txt` is the plain-text alternative and works without any image hosting. The website line uses the purchased domain Adam confirmed: `https://cypresscommand.com/`. No DNS, active website, or email alias is assumed; verify that the website is reachable before using its link in outbound email.

`signature-with-logo.html` is a local preview of the visual-logo version. Its relative PNG path will not work for recipients. Before sending, either:

- Insert the supplied PNG through the email client's image control so it manages an inline attachment; verify the received result in another account, or
- Host the image at a verified public HTTPS URL under your control, then replace the image `src` with that URL. Use a stable public image without authentication or tracking. Recipients may block external images; the alt text and contact details still carry the information.

Do not paste a local file path into a sent signature. The table uses a 260px-wide logo with the supplied clear space. Do not crop it, stretch it, retype the wordmark, or substitute the screenshot. For clients that force a dark background, test the received result; email-client dark-mode transformations are not controlled reliably by signature HTML. The text-first version is the fallback.

## Personalize and install

1. Owner / Founder is filled. Replace `[Phone]` and `[Email]` only after they are configured and tested. Adam Abdalla's confirmed name, mailing address, and purchased domain are already filled in. `adam@cypresscommand.com` and `info@cypresscommand.com` are planned addresses, not live mailboxes yet.
2. If desired, add `mailto:` and `tel:` links with the verified values. Verify the configured website destination is live before sending. Keep the visual text readable if links are stripped.
3. Open the HTML file in a browser, select the rendered signature table, and paste it into the chosen client's signature editor. Client editors vary; their image insertion feature is preferable for inline images. No account settings have been changed by this package.
4. Send a test to yourself and inspect desktop, mobile, light/dark modes, blocked-image mode, a reply, and a plain-text view. Confirm that contact links work and no bracketed placeholders remain.

The signature contains no tracking pixel, social profile claim, credential, disclaimer, or affiliate logo. Add any entity-specific or legally required footer only after its text is supplied and approved.
