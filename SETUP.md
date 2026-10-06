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

## Layout source

Layout, spacing, colours and type follow the client's reference files (index.html, about.html, teach.html, write.html, speak.html, resources.html and styles.css). Where they differ from `karlarsmith-master-spec.md` (green headings, sans body text, a dark footer, cream hero bands, a dark Fired-Up! section), the client's files win. Teach (six cards) and the Speak form fields are now confirmed by those files.

## Open items to confirm with the client

Search the patterns for `TODO(client)` to find these in code:

1. Home hero tagline: short version (reference files) is live; her later note asked for a longer one.
2. Home "Featured: Latest teaching & writing" block exists in her index.html as a designer placeholder, so it is left out until real content exists.
3. Support the Work button points to the Fired-Up! Leaders giving page, https://firedupleaders.org/giving/.
4. Stay Connected form emails the admin; no mailing-list service is connected.
5. Recipient address for form email (Contact Form 7 > each form > Mail).
6. Privacy Policy and Terms are published with drafted text based on what the site does (forms, no payments, no analytics). Confirm the facts and have an attorney review before launch.
7. Connect and Support the Work page layouts are not in her files; they reuse the same components.
8. No photos beyond the portrait were supplied, so other sections are text only.

## Social icons

The footer has Facebook, Instagram and YouTube icons. They currently link to each platform's home page as placeholders. Replace them with Karla's real profile links in Appearance > Editor > Patterns > Template Parts > Footer (click an icon, paste the link), or send the URLs to be set in the theme.
