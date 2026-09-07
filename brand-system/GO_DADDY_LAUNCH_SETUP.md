# Cypress Command — GoDaddy email and website setup

This is the shortest reliable path from a registered domain to usable email and a live website. The brand kit is ready; this file does not change your GoDaddy account, buy a plan, alter DNS, or publish the site.

## 1. Create email first

**Recommendation:** buy one Microsoft 365 mailbox through GoDaddy for `adam@cypresscommand.com`, set Adam Abdalla as the administrator, and use `adam@adamabdalla.com` as the recovery/notification address. Use `info@cypresscommand.com` as an alias or a shared/forwarded address that delivers to Adam's mailbox if your chosen plan supports it. That gives you the two public addresses without paying for two independent inboxes. Buy a second paid mailbox only if `info@` needs a separately signed-in inbox or another person will operate it.

1. In GoDaddy, open **Email & Office Dashboard** and choose **Add user** or **Set up accounts** for `cypresscommand.com`.
2. Choose a Microsoft 365 plan, select `cypresscommand.com`, and create the first user with username `adam`, first name Adam, last name Abdalla, and administrator permission.
3. Send account details to `adam@adamabdalla.com`, use a unique password, and complete first sign-in.
4. Add `info` as an alias/shared mailbox/forwarding address to the Adam mailbox if your dashboard/plan offers that option. If it does not, create a second user only if a separate inbox is actually required.
5. Turn on MFA for the administrator, then send external tests to both addresses and reply from each public address before placing either in the website, signature, or cards.
6. In the Email & Office Dashboard, enable the available domain-authentication options (including DKIM) and confirm GoDaddy's required DNS records are present. Do not manually replace MX, SPF, or DKIM records without checking the plan’s current instructions.

GoDaddy's current instructions for creating the first Microsoft 365 address are [here](https://www.godaddy.com/en-uk/help/create-my-microsoft-365-email-address-9137); its documented user-account flow is [here](https://www.godaddy.com/help/add-user-email-accounts-8900); and its Microsoft 365 help hub, including DKIM and MFA topics, is [here](https://www.godaddy.com/help/microsoft-365-from-godaddy-1000005). The precise button labels and plan options can vary by account and region.

## 2. Use the website package

The supplied `web/` folder is a finished, responsive static starter, not a live website. It is intentionally `noindex` until launch and has no forms, analytics, cookie banner, CRM, or backend.

**Best launch path:** host the static site on a simple static host and point the GoDaddy domain’s DNS there. Use GoDaddy only for domain/DNS and Microsoft 365. This is usually faster and less constrained than rebuilding the approved HTML in a page-builder.

1. Choose a static host. A drag-and-drop static host is sufficient for this launch; Vercel, Netlify, Cloudflare Pages, or a GoDaddy web-hosting plan can all serve static files. Choose one before changing DNS.
2. Upload the separately packaged `Cypress_Command_Website_Starter_v1.0.1.zip` after extracting it. Its `index.html` belongs at the site root, alongside `logos/`, `fonts/`, `tokens/`, and `social/`.
3. In the host, add `cypresscommand.com` and `www.cypresscommand.com`, then use the exact DNS records the host provides in GoDaddy’s DNS manager. Do not copy generic DNS values from another service.
4. Test the temporary host URL on desktop and mobile. Then test the custom domain over HTTPS, every navigation link, logo/font loading, page title, and the sharing image.
5. Add the tested public email address to `web/index.html` and remove `noindex, nofollow` only after contact details and final copy are approved. Keep `ui.html`, this brand library, and the larger brand-release archive out of the public web root.

## 3. Confirm before public launch

- Owner / Founder: Adam Abdalla
- Mailing address for documents: 532 Alonda Drive, Lafayette, LA 70503
- Domain: `https://cypresscommand.com`
- Planned addresses: `adam@cypresscommand.com` and `info@cypresscommand.com` — do not treat as live until external send/receive tests pass
- Phone: intentionally omitted until confirmed

The current website focuses on real estate, operations, and systems. Review those positioning statements against the exact Cypress Command business offer before public launch. Add legal/entity disclosures, privacy terms, accessibility decisions, analytics, or a contact form only when their operational ownership and data handling are defined.
