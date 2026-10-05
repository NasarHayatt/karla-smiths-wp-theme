# KarlaRSmith.com setup

Repo layout: the theme lives in the top-level `karlarsmith/` folder. `karlarsmith-master-spec.md` is the content source of truth. `tools/build-patterns.mjs` regenerates `karlarsmith/patterns/*.php` (run `node tools/build-patterns.mjs`), but the pattern files are committed and can also be edited by hand.

## 1. Plugins

| Plugin | Why |
|---|---|
| WP Pusher | Deploys this repo to the site |
| Contact Form 7 | Connect, Speak and Stay Connected forms |
| Optional: Flamingo | Keeps a copy of every submission in wp-admin |
| Optional: an SMTP plugin (WP Mail SMTP or FluentSMTP) | Makes sure form emails actually reach the inbox |

No page builder is needed. Elementor can be deactivated once the new theme is live.

## 2. Deploy

1. WP Pusher > Install Theme, point it at this repo, branch `main`.
2. If your WP Pusher version asks for a subdirectory, enter `karlarsmith`. If it does not offer one, make the repo root the theme folder instead.
3. Turn on push-to-deploy so every commit to `main` updates the site.
4. Activate the theme **Karla R. Smith**.

On first activation the theme creates, only where missing: the pages Home, About, Teach, Write, Speak, Resources, Connect, Support the Work (all with editable block content), draft Privacy Policy and Terms pages, the Books / Teaching Topics / Resource Categories entries from the spec, and sets Home as the front page and the site tagline.

**Existing pages are never overwritten.** If the old Elementor pages already use the slugs `about`, `teach`, etc., they stay as they are. To get the new design, trash those pages (and empty the trash so the slug frees up) before activating, or open the page and paste the matching pattern from Add Block > Patterns > "Karla R. Smith pages".

## 3. Forms

1. Install and activate Contact Form 7.
2. Open any wp-admin screen once. The theme creates three forms (KRS Connect, KRS Speaking Inquiry, KRS Stay Connected) and the pages pick them up automatically.
3. Check Contact > Contact Forms > Mail on each. Mail goes to the site admin email (Settings > General). Change the recipient there to Karla's real inbox.
4. Spam protection: a honeypot field is built in. For stronger protection add reCAPTCHA v3 under Contact > Integration.
5. Send a test submission from each form and confirm the email arrives. If it does not, install an SMTP plugin.

## 4. Navigation and footer

Header and footer menus are Navigation blocks inside the Header and Footer template parts, already filled in with the 7 pages in spec order plus the footer Explore / Connect columns and the discreet Support the Work link. Edit them at Appearance > Editor > Patterns > Template Parts. Links are relative (`/about/`), so the site must run at the domain root.

## 5. Logo, photo, tagline

- **Logo**: Appearance > Editor > Template Parts > Header, click the logo block, upload the word mark. When a logo is set, the text word mark hides itself automatically.
- **Tagline**: Settings > General.
- **Portraits**: on Home and About, select the grey arch placeholder, delete it, add an Image block, choose the **Arch** style in the sidebar, and upload the photo. The same works for the rectangular photo placeholders (plain Image block).
- **Colours**: the full palette from the spec is in Site Editor > Styles > Colors.

## 6. Day-to-day editing

- Pages: Pages > edit like any normal page.
- Books: Books menu. Write the description in the main editor, tick **Coming Soon** or **Published** under Book Status.
- Teaching cards: Teaching Topics menu. Numbers 01, 02, 03 are automatic and follow the Order field (Page Attributes).
- Resource categories: Resource Categories menu. They are deliberately unlinked.

## Open items to confirm with the client

Search the patterns for `TODO(client)` to find these in code:

1. Home hero tagline: long version (her latest instruction) is live; short version is in the footer and site tagline.
2. Logo treatment: script word mark vs plain serif text (text is the default until a logo is uploaded).
3. Teach page: only cards 01 to 03 exist, with no descriptions.
4. Speak form: message field and submit button are inferred.
5. Footer: extrapolated, not in her screenshots. Privacy Policy and Terms pages are empty drafts, so their footer links 404 until real text exists.
6. Support the Work button points to https://firedupleaders.org until the real giving URL is supplied.
7. Stay Connected form emails the admin; no mailing-list service is connected.
8. Recipient address for form email.
9. Photos for the below-the-hero Home sections, and pathway card images, were not supplied.
