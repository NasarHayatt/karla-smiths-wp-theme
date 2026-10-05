# KarlaRSmith.com — Master Build Spec

Client: Karla R. Smith, Bible teacher, equipper of believers, mentor of leaders, prophetic voice.
Site identity: Bible Teacher • Equipper of Believers • Mentor of Leaders • Prophetic Voice
Tagline: "Know Jesus. Hear the Holy Spirit. Walk in His Truth." (see note under Home/Hero on a possible longer variant)
Prophetic mandate (used sparingly, not a slogan): "Liberty to the Captives"
Public-facing message: "Truth That Leads to Freedom"

This file is the current, authoritative source of truth. It supersedes every earlier draft from this project's history. Where something below says "flag to client," it means: this spec's best answer is a reasonable guess, not a confirmed fact, check before treating it as final.

---

## 1. How this project got here (context, not instructions)

1. Client supplied an original designer package (HTML/CSS prototype + README) establishing site structure, brand hierarchy, and initial visual direction (olive/forest green + warm gold, ivory/cream, serif headings).
2. Site was built in WordPress/Elementor on the Femina template kit (a "feminine business" Elementor kit), heavily reworked page by page.
3. Client reviewed and called the result "generic and somber," asked for brighter, more inviting, more feminine. Palette shifted to dusty rose/plum-brown/gold.
4. Client reviewed again, said the rose palette still wasn't right, and sent 8 screenshots of a separate, already-built static HTML reference (a different design entirely: cream background, near-black ink text, pill buttons, a single soft taupe/dusty-rose accent, minimal color variation) and asked for an exact match.
5. Client separately supplied: her personal photo, her "Liberty to the Captives" testimony document (for the About page), and a note asking for an expanded tagline to appear near the top of the homepage.
6. Work is now moving from Elementor to a code-based WordPress build deployed via git. This spec is written to be implementation-agnostic (works whether built as a custom theme, block theme, or otherwise), not tied to Elementor.

**Do not** reintroduce the rose/plum palette or the original olive-heavy palette. Section 3 below is the only authoritative design system.

---

## 2. Design system (pixel-sampled from the client's final reference screenshots)

### Colors

| Role | Hex | Notes |
|---|---|---|
| Page / section background | `#FCF3EE` | Nearly every section on every page. This design does not rotate background colors between sections, resist the urge to add alternating bands. |
| Header background | `#FEFDF9` | Near-white |
| Card / form background | `#FFFFFF` | |
| Main ink color (headings, body, nav) | `#17150F` | One dark near-black warm ink color used for almost everything. Do not split into separate "heading color" vs "body color," this design uses one. |
| Eyebrow label color | `#464737` | Small uppercase labels above headings, muted warm gray-olive |
| Wordmark/logo color | `#261911` | Dark warm brown, distinct from but close to main ink |
| Primary button fill | `#2E3A28` | Solid pill buttons |
| Primary button text | `#FFFFF8` | |
| Outline button fill | `#F6F0ED` (ranges to `#FCF8F3`) | Essentially page-background colored |
| Outline button border/text | `#0F0A06` | Near black |
| Decorative accent (arch shape, card numerals) | `#D5C1B6` (arch), `#B4ADA3` (numerals) | The only place a rose/taupe tone belongs. Shapes only, never text, never a section fill. |
| Form field border | `#979797` | |
| Form field fill | `#FFFFFF` | |

### Typography

- Headings: elegant serif, one weight/color family, no two-tone heading treatment anywhere.
- Body: serif, same ink color as headings, lighter weight.
- Eyebrow labels: small, uppercase, letter-spaced, `#464737`.
- Nav: uppercase, small, letter-spaced, `#17150F`.

### Components

- **Buttons**: fully rounded pill shape, uppercase letter-spaced text. Primary = solid `#2E3A28` fill with `#FFFFF8` text. Secondary = outline, `#F6F0ED` fill, `#0F0A06` border/text.
- **Cards**: white background, rounded corners, minimal/no border, soft shadow.
- **Forms**: white fields, `#979797` border, rounded corners, in-field placeholder-style labels.
- **Portrait placeholder / arch component**: a reusable shape, not a plain rectangle. Flat bottom, domed/arched top, solid `#D5C1B6` fill, thin outline, centered caption near the bottom when no photo is present yet (e.g. "PLACE HERO PORTRAIT HERE"). Used on Home hero and About's "Her Ministry" section, likely reusable anywhere a portrait appears.
- **Numbered cards** (Teach page): large decorative numeral in `#B4ADA3`, bold heading below it, white card.

### Photography direction

Bright, warm, natural light, genuine smiles, visible faces (not silhouettes or heavy backlighting). No dark overlays on images. No beauty/fashion/glamour stock photography. No floral-heavy "lifestyle influencer" styling. Client's own photo (provided, warm-toned, red door background) is approved for use in the Home hero and About's "Her Ministry" section, framed within the arch component with a thin accent border.

---

## 3. Site navigation

Order: Home, About, Teach, Write, Speak, Resources, Connect
Footer-only, not in primary nav: Support the Work (see Section 9)

---

## 4. Page-by-page content

### Home

**Hero**
- Eyebrow: `BIBLE TEACHER • EQUIPPER OF BELIEVERS • MENTOR OF LEADERS • PROPHETIC VOICE`
- H1: `Welcome. I'm Karla.`
- Tagline: see note below, two candidate versions exist.
- Body: `I'm a Bible teacher, equipper of believers, mentor of leaders, and prophetic voice. My heart is to help you know Jesus more intimately, recognize the voice of the Holy Spirit, grow in biblical truth, and walk in the freedom and purpose God has for your life.`
- Button 1 (solid): `EXPLORE THE TEACHING` → /teach
- Button 2 (outline): `ABOUT KARLA` → /about
- Image: arch component, client's personal photo

**Tagline, unresolved, flag to client**: her reference screenshot shows the short version, `Know Jesus. Hear the Holy Spirit. Walk in His Truth.` Her own later written instruction asked for a longer version placed near the top of the homepage: `Know Jesus. Hear the voice of the Holy Spirit. Walk in His truth. Biblical teaching and encouragement to help you grow in faith and live God's Word.` These conflict. Confirm which one she wants before shipping. Default to the longer one if you must ship without an answer, since it's her most recent explicit instruction, but flag this decision to her either way.

**Below the hero** (content established earlier in the project, not shown in the client's final reference screenshots, carry forward as-is, restyled to Section 2's system):

"Let's walk in truth together"
- Eyebrow: `A Place to Grow`
- H2: `Let's walk in truth together.`
- Body: `I believe God's Word is not simply something we study, it is truth we receive, live, and allow to transform us.`
- Body 2: `Whether you are growing in your relationship with Jesus, learning to recognize the voice of the Holy Spirit, seeking freedom, or stepping more fully into your purpose, my prayer is that what you find here will encourage you, strengthen you, and point you back to Christ.`
- Pull quote: `"And you shall know the truth, and the truth shall make you free." — John 8:32`
- Image: bright Bible/flowers/natural light photo

Three Pathways ("Come Along")
- Section eyebrow: `Come Along`
- Section H2: `There are several ways we can grow together.`
- Card 1 Teach: `Biblical teaching and prophetic insight to help believers know Christ, recognize truth, mature spiritually, and live God's Word.` → `Explore Teaching →` /teach
- Card 2 Write: `Books, reflections, and resources designed to make biblical truth relevant to everyday life.` → `Explore Writing →` /write
- Card 3 Speak: `Biblical teaching and Spirit-led ministry for churches, conferences, gatherings, podcasts, and retreats.` → `Invite Karla →` /speak
- Images: bright, no dark overlays

"The Heart Behind the Call"
- Eyebrow: `The Heart Behind the Call`
- H2: `Truth spoken in love. Freedom found in Christ.`
- Lead: `I have a deep love for people and a particular burden for those who feel bound, fearful, wounded, discouraged, or hindered from becoming who God has called them to be.`
- Body: `My desire is always to point people to Jesus Christ, the One who sets us free. Through biblical teaching, prophetic insight, prayer, writing, encouragement, and Spirit-led ministry, I want to help people recognize truth, respond to the Holy Spirit, grow in maturity, and move forward with hope, obedience, and purpose.`
- Button (primary): `Read Karla's Story` → /about
- Image: bright, warm, genuine conversation photo

"Fired-Up! Leaders"
- Eyebrow: `Fired-Up! Leaders`
- H2: `Serving together.`
- Body: `Karla and her husband, Marvin, co-founded Fired-Up! in 1996 with a heart to develop, equip, and empower servant leaders who follow Jesus Christ.`
- Body 2: `KarlaRSmith.com is the home of Karla's personal teaching, writing, speaking, and ministry voice, while Fired-Up! Leaders remains the organizational ministry founded and led by Marvin and Karla.`
- Button (outline): `Visit Fired-Up! Leaders` → https://firedupleaders.org
- Background: flat `#FCF3EE` (no dark band, no photo overlay, per Section 2's "no section color rotation" rule)

"Stay Connected"
- Eyebrow: `Stay Connected`
- H2: `I'd love to stay in touch.`
- Body: `Receive occasional teachings, reflections, resources, and ministry updates, shared to encourage your walk with Jesus.`
- Fields: `First Name`, `Email Address`
- Button: `Stay Connected`

### About

**Hero**
- Eyebrow: `ABOUT KARLA`
- H1: `Teacher. Builder. Spiritual Mother. Equipper.`
- Subhead (bold): `Bible Teacher • Equipper of Believers • Mentor of Leaders • Prophetic Voice`
- Body: `Karla R. Smith is an ordained minister, Bible teacher, equipper of believers, mentor of leaders, and prophetic voice with a heart to see people know Jesus Christ, hear the voice of the Holy Spirit, walk in His truth, and experience the freedom found in Him.`

**Her Ministry**
- Eyebrow: `Her Ministry`
- H2: `A life of teaching, equipping & service.`
- Body: `Ordained in 2005, Karla has faithfully served the Body of Christ through biblical teaching, prophetic ministry, mentoring, discipleship, prayer, and leadership development. As co-founder of Fired-Up! Leaders, she serves alongside her husband, Marvin, developing, equipping, and encouraging servant leaders to mature in Christ and faithfully fulfill their God-given purpose.`
- Body 2: `With a deep love for God's Word and dependence upon the Holy Spirit, Karla communicates biblical truth with compassion, prophetic insight, and practical application.`
- Image: arch component, client's personal photo (or a second bright photo if she wants variety from Home)

**A Call to Freedom** (this section's body content is her real testimony document, not generic placeholder copy)
- Eyebrow: `A Call to Freedom`
- H2: `Liberty to the Captives.`
- Body: `Years ago, I received a prophetic word that used the picture of a songbird trapped in a cage. The door was closed, the song was within, but freedom, joy, hope, and expectancy seemed beyond reach.`
- Body: `Then came these words:`
- Blockquote: `"Just as I am going to swing open the door of that cage for you, I am going to through your life swing open the door of the cage that keeps them in."`
- Body: `And the word concluded:`
- Blockquote: `"Liberty to the captives."`
- Body: `Those words have become increasingly clear throughout my journey with Christ.`
- Body: `God's work in my life was never intended to end with me. As He has taught me to know Jesus more deeply, hear the Holy Spirit, walk in His truth, and experience His freedom, He has also given me a desire to help others do the same.`
- Body: `Through biblical teaching, prophetic ministry, mentoring, writing, and Spirit-led encouragement, my desire is to point people to Jesus Christ, the One who saves, heals, restores, and sets captives free.`
- Body (bold, short): `The cage is not the end of the story.`
- Closing statement (bold): `There is freedom in Christ. There is hope again. And there is still a song within you.`
- Pull quote (keep, closing scripture anchor): `"And you shall know the truth, and the truth shall make you free." — John 8:32`
- Styling: flat `#FCF3EE` background, no pink card, use the blockquote styling (left border or similar) from Section 2 for the two embedded quotes and the John 8:32 quote.

**Her Story**
- Eyebrow: `Her Story`
- H2: `Leadership beyond the pulpit.`
- Body: `Karla's service has also extended into organizational leadership, education, community service, and professional administration. These experiences have strengthened her ability to communicate biblical truth with compassion, discernment, practical application, and an understanding of real-life leadership challenges.`
- Body 2: `Above all, Karla's desire is to strengthen and equip believers to live with faith, obedience, humility, freedom, and purpose.`

### Teach

- Eyebrow: `TEACH`
- H1: `Truth that leads to freedom.`
- Lead: `Karla teaches from a conviction that God's Word is alive, relevant, and transformational.`
- Body: `Her teaching combines biblical truth, prophetic insight, spiritual discernment, and practical application to help believers know Jesus more intimately, recognize the leading of the Holy Spirit, mature in faith, and walk in freedom and obedience.`
- Numbered cards: `01 Knowing Jesus`, `02 Hearing the Holy [Spirit]`, `03 Truth & Freedom`

**Flag to client**: her reference screenshot cuts off before showing card descriptions, and it's unconfirmed whether there are more than 3 cards. Get the full page from her, or confirm directly, before finalizing this page.

### Write

- Eyebrow: `WRITE`
- H1: `Truth made relevant for life.`
- Lead: `Through books, reflections, and written teachings, Karla seeks to make biblical truth understandable, relevant, and applicable to everyday life.`
- Next section eyebrow: `FROM KARLA'S DESK`
- H2: `Books, teachings, reflections & resources.`
- Book cards (established earlier in the project, keep):
  - `Lessons Made Relevant for You!` — `A developing collection of biblical lessons designed to help readers understand God's Word and apply His truth to everyday life.` — `Coming Soon`
  - `Let's Be Honest About Marriage` — `A practical, biblical conversation about marriage, relationships, truth, and growth.` — `Coming Soon`
- No cover art, no purchase links, no publication dates, per the client's explicit README instruction.

**Flag to client, do not publish as-is**: her reference screenshot for this section shows a paragraph that is a near word-for-word restatement of her own dev instructions ("unfinished projects should be presented honestly as Coming Soon, without publication dates until they are confirmed"), sitting as visible body copy. This reads like a mockup mistake, not intended reader-facing text. Use the book cards above instead, and confirm with her that this paragraph wasn't meant to go live.

### Speak

- Eyebrow: `INVITE KARLA`
- H1: `Truth. Freedom. Spiritual growth. Purpose.`
- Lead: `Karla is available for appropriate churches, ministries, conferences, retreats, leadership gatherings, interviews, podcasts, and other speaking opportunities.`
- Section H2: `Areas of teaching.`
- Body: `Knowing Jesus Christ • Hearing and Following the Holy Spirit • Truth & Spiritual Freedom • Spiritual Growth & Maturity • Biblical Truth for Everyday Life • Marriage & Relationships • Purpose • Servant Leadership`
- Form fields confirmed from screenshot: `Name`, `Organization / Ministry`, `Email`, `Phone (optional)`

**Flag to client**: form is cut off before showing a Message field or submit button. Add a `Tell me about your event` textarea and a `Send Speaking Inquiry` button as reasonable completions, but confirm the full field list with her if possible.

### Resources

- Eyebrow: `RESOURCES`
- H1: `Resources for truth, growth & freedom.`
- Lead: `A growing library of tools designed to help believers grow in faith, discernment, prayer, and biblical truth.`
- Cards (plain category labels, no links, no downloads, per client's explicit instruction not to fill with placeholder content):
  - `Teaching Notes` — `Companion notes and Scripture references for selected teachings.`
  - `Bible Studies` — `Focused studies for personal or group use.`
  - `Prayer Resources` — `Prayer guides and Spirit-led resources as they become available.`

### Connect

- Eyebrow: `CONNECT`
- H1: `Connect with Karla.`
- Lead: `Whether you're reaching out about teaching, speaking, ministry, resources, or simply want to stay connected, we'd love to hear from you.`
- Left H2: `Send a message.`
- Left body: `Speaking invitations should use the dedicated speaking inquiry. Fired-Up! Leaders organizational matters should be directed to Fired-Up! Leaders.`
- Buttons (both outline style): `SPEAKING INQUIRY` → /speak, `FIRED-UP! LEADERS` → https://firedupleaders.org
- Form fields: `Name`, `Email`, `Subject`, `Message`
- Button: `SEND MESSAGE`
- No phone number field. No map, no fake address, no social icon row.

---

## 5. Footer

**Not shown in any of the client's reference screenshots.** Treat the following as a reasonable extrapolation of Section 2's system, and flag this choice to the client rather than presenting it as confirmed:

- Background: `#FCF3EE` or `#FEFDF9`
- Brand column: wordmark, tagline (`Know Jesus. Hear the Holy Spirit. Walk in His Truth.`)
- Explore column: About, Teach, Write, Speak
- Connect column: Resources, Contact, Fired-Up! Leaders
- Bottom bar: copyright (`© 2026 Karla R. Smith. All Rights Reserved.`), Privacy Policy, Terms, and a small, same-weight `Support the Work` link
- All text in `#17150F`, no decorative imagery

---

## 6. Support the Work (separate page, footer-only link, not yet built)

- Footer link only, excluded from primary nav
- Copy (client-provided, exact):

> **SUPPORT THE WORK**
> Helping Truth Reach Others
>
> Karla's heart is to help people know Jesus, hear the Holy Spirit, grow in biblical truth, and walk in the freedom and purpose God has for their lives.
>
> Through biblical teaching, writing, mentoring, speaking, and the development of practical resources, Karla desires to make God's truth accessible, relevant, and applicable to everyday life.
>
> If you have been encouraged by this ministry and would like to help make these teachings and resources available to others, you are warmly invited to support the work through Fired-Up! Leaders, a 501(c)(3) nonprofit ministry.
>
> Your tax-deductible contribution helps support the continued work of sharing biblical truth, equipping believers, developing resources, and encouraging people to grow in Christ and live lives of faith, freedom, and God-given purpose.
>
> Thank you for partnering with us and helping this work reach others.
>
> **BUTTON: SUPPORT THE WORK**
>
> Contributions are made to and received by Fired-Up! Leaders, a 501(c)(3) nonprofit ministry.

- Button links to Fired-Up! Leaders' official giving page, exact URL not yet provided, make it easily editable.
- Design: understated, warm, gracious, consistent with the rest of the site, should not look like a fundraising campaign page.

---

## 7. Assets

**Provided by client, need to be placed in the project:**
- Original Karla R. Smith word mark (the cursive script logo with the KRS monogram and gold leaf sprig). Note: the reference screenshots show a plain serif "Karla R. Smith" text logotype instead, this may be a typographic placeholder similar to the one in her original package, confirm with her which logo treatment she actually wants live.
- Personal photo (warm-toned portrait, red door background, approved for Home hero and About's Her Ministry section).
- "Liberty to the Captives" testimony document (used in About's "A Call to Freedom" section, see Section 4).

**Still needed:**
- Final decision on logo treatment (script word mark vs. plain serif text logo).
- Confirmation on the Home hero tagline (short vs. long version, see Section 4).
- Teach page: full card set beyond card 03.
- Speak page: full form field list.
- Any footer reference or sign-off on the extrapolated version in Section 5.
- Final giving URL for the Support the Work button.

---

## 8. Hard rules, don't repeat earlier mistakes

- No two-tone headings. One ink color per heading, full stop, this was a recurring low-contrast bug across multiple pages earlier in the project.
- No dark photo overlays. Every image should read brightly and clearly.
- No alternating section background colors in this design system, everything sits on `#FCF3EE`/white.
- No fake testimonials, no invented quotes, no fabricated contact info (address/phone/email), no stock "Lorem ipsum" content anywhere, anything without real client content should say so plainly (e.g. "Coming Soon") rather than being filled with placeholder filler.
- Resources page specifically: no download links, no fake PDFs, category labels only, until real resources exist, per the client's explicit instruction.
- Write page specifically: no publication dates, no fake cover art, "Coming Soon" labels only.
- Support the Work link stays visually discreet in the footer, same weight as Privacy Policy/Terms, never styled as a prominent nav-level CTA.
