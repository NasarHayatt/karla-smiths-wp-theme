// Generates karlarsmith/patterns/*.php (block markup) from one source so the
// hand-written block HTML stays valid and consistent.
// Run: node tools/build-patterns.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'karlarsmith', 'patterns');
mkdirSync(root, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const attrs = (o) => (o && Object.keys(o).length ? ' ' + JSON.stringify(o) : '');
const blk = (name, a, html) =>
  html === null
    ? `<!-- wp:${name}${attrs(a)} /-->`
    : `<!-- wp:${name}${attrs(a)} -->\n${html}\n<!-- /wp:${name} -->`;
const cls = (...c) => c.filter(Boolean).join(' ');

const p = (text, className, raw = false) =>
  blk('paragraph', className ? { className } : {}, `<p${className ? ` class="${className}"` : ''}>${raw ? text : esc(text)}</p>`);
const eyebrow = (t) => p(t, 'is-style-eyebrow');
const lead = (t) => p(t, 'is-style-lead');
const strong = (t) => p(`<strong>${esc(t)}</strong>`, '', true);
const h = (level, text, className, raw = false) => {
  const a = {};
  if (level !== 2) a.level = level;
  if (className) a.className = className;
  return blk('heading', a, `<h${level} class="${cls('wp-block-heading', className)}">${raw ? text : esc(text)}</h${level}>`);
};
const quote = (text, citation) =>
  blk('quote', {}, `<blockquote class="wp-block-quote">${p(text)}${citation ? `<cite>${esc(citation)}</cite>` : ''}</blockquote>`);
const button = (text, url, outline = false) =>
  blk('button', outline ? { className: 'is-style-outline' } : {},
    `<div class="${cls('wp-block-button', outline && 'is-style-outline')}"><a class="wp-block-button__link wp-element-button" href="${url}">${esc(text)}</a></div>`);
const buttons = (list) =>
  blk('buttons', {}, `<div class="wp-block-buttons">${list.map((b) => button(b.text, b.url, b.outline)).join('\n')}</div>`);
const group = (inner, { className, layout = { type: 'constrained' }, tag } = {}) => {
  const a = {};
  if (tag) a.tagName = tag;
  if (className) a.className = className;
  if (layout) a.layout = layout;
  const t = tag || 'div';
  return blk('group', a, `<${t} class="${cls('wp-block-group', className)}">\n${inner}\n</${t}>`);
};
const column = (inner, { width, align } = {}) => {
  const a = {};
  if (align) a.verticalAlignment = align;
  if (width) a.width = width;
  return blk('column', a,
    `<div class="${cls('wp-block-column', align && `is-vertically-aligned-${align}`)}"${width ? ` style="flex-basis:${width}"` : ''}>\n${inner}\n</div>`);
};
const columns = (cols, { className, align } = {}) => {
  const a = {};
  if (align) a.verticalAlignment = align;
  if (className) a.className = className;
  return blk('columns', a,
    `<div class="${cls('wp-block-columns', align && `are-vertically-aligned-${align}`, className)}">\n${cols.join('\n')}\n</div>`);
};
const form = (name) => `<!-- wp:shortcode -->\n[krs_form form="${name}"]\n<!-- /wp:shortcode -->`;

// Reusable components
const arch = (caption) =>
  group(p(caption, 'krs-arch__caption'), { className: 'krs-arch is-style-arch', layout: { type: 'constrained' } });
const photo = (caption = 'Place photo here') =>
  group(p(caption, 'krs-arch__caption'), { className: 'krs-photo-placeholder', layout: { type: 'constrained' } });
const section = (inner, extra) => group(inner, { className: cls('krs-section', extra) });
const hero = (eyebrowText, title, leadText) =>
  section([eyebrow(eyebrowText), h(1, title), lead(leadText)].join('\n'), 'krs-hero');
const cardLink = (text, url) => p(`<a href="${url}">${esc(text)}</a>`, 'krs-card-link', true);
const card = (title, body, link) =>
  group([h(3, title), p(body), link ? cardLink(link[0], link[1]) : ''].filter(Boolean).join('\n'),
    { className: 'is-style-card', layout: { type: 'constrained' } });

const query = ({ postType, perPage, cols, className, empty, card: tpl }) =>
  blk('query', {
    queryId: 1,
    query: { perPage, pages: 0, offset: 0, postType, order: 'asc', orderBy: 'title', author: '', search: '', exclude: [], sticky: '', inherit: false },
    className,
  },
  `<div class="${cls('wp-block-query', className)}">\n` +
  blk('post-template', { layout: { type: 'grid', columnCount: cols } }, tpl) +
  `\n${blk('query-no-results', {}, p(empty))}\n</div>`);

const pageHeader = ({ title, slug, desc, todo }) =>
  `<?php\n/**\n * Title: ${title}\n * Slug: karlarsmith/${slug}\n * Categories: karlarsmith-pages\n * Description: ${desc}\n * Viewport Width: 1280\n */\n` +
  (todo ? `/*\n${todo.map((t) => ` * TODO(client): ${t}`).join('\n')}\n */\n` : '') +
  `?>\n`;

const write = (file, meta, content) => writeFileSync(join(root, file), pageHeader(meta) + content + '\n');

// Components
write('arch-portrait.php',
  { title: 'Arch portrait', slug: 'arch-portrait', desc: 'Arch-shaped portrait placeholder. To use a photo, add an Image block and choose the Arch block style.' },
  arch('Place portrait here'));
write('photo-placeholder.php',
  { title: 'Photo placeholder', slug: 'photo-placeholder', desc: 'Rounded photo placeholder. Replace with an Image block.' },
  photo());

// Home
write('page-home.php', {
  title: 'Home page', slug: 'page-home', desc: 'Full Home page.',
  todo: [
    'Hero tagline: the long version (her latest written instruction) is used. Her reference screenshot shows the short version "Know Jesus. Hear the Holy Spirit. Walk in His Truth." Confirm which she wants.',
    'Below-the-hero photos and pathway-card images were not supplied; photo placeholders are used and pathway cards are text only.',
    'Stay Connected form has no mailing-list service wired; submissions are emailed to the site admin.',
  ],
}, [
  section(columns([
    column([
      eyebrow('BIBLE TEACHER • EQUIPPER OF BELIEVERS • MENTOR OF LEADERS • PROPHETIC VOICE'),
      h(1, "Welcome.<br>I'm Karla.", null, true),
      lead('Know Jesus. Hear the voice of the Holy Spirit. Walk in His truth.'),
      p("Biblical teaching and encouragement to help you grow in faith and live God's Word.", 'krs-tagline-sub'),
      p("I'm a Bible teacher, equipper of believers, mentor of leaders, and prophetic voice. My heart is to help you know Jesus more intimately, recognize the voice of the Holy Spirit, grow in biblical truth, and walk in the freedom and purpose God has for your life."),
      buttons([{ text: 'Explore the Teaching', url: '/teach/' }, { text: 'About Karla', url: '/about/', outline: true }]),
    ].join('\n'), { width: '58%', align: 'center' }),
    column(arch('Place hero portrait here'), { width: '42%', align: 'center' }),
  ], { align: 'center' }), 'krs-hero krs-hero--home'),

  section(columns([
    column([
      eyebrow('A Place to Grow'),
      h(2, "Let's walk in truth together."),
      p('I believe God\'s Word is not simply something we study, it is truth we receive, live, and allow to transform us.'),
      p('Whether you are growing in your relationship with Jesus, learning to recognize the voice of the Holy Spirit, seeking freedom, or stepping more fully into your purpose, my prayer is that what you find here will encourage you, strengthen you, and point you back to Christ.'),
      quote('"And you shall know the truth, and the truth shall make you free."', 'John 8:32'),
    ].join('\n'), { align: 'center' }),
    column(photo('Place photo here'), { align: 'center' }),
  ], { align: 'center' })),

  section([
    eyebrow('Come Along'),
    h(2, 'There are several ways we can grow together.'),
    columns([
      column(card('Teach', 'Biblical teaching and prophetic insight to help believers know Christ, recognize truth, mature spiritually, and live God\'s Word.', ['Explore Teaching →', '/teach/'])),
      column(card('Write', 'Books, reflections, and resources designed to make biblical truth relevant to everyday life.', ['Explore Writing →', '/write/'])),
      column(card('Speak', 'Biblical teaching and Spirit-led ministry for churches, conferences, gatherings, podcasts, and retreats.', ['Invite Karla →', '/speak/'])),
    ].map((c) => c), { className: 'krs-cards' }),
  ].join('\n')),

  section(columns([
    column(photo('Place photo here'), { align: 'center' }),
    column([
      eyebrow('The Heart Behind the Call'),
      h(2, 'Truth spoken in love. Freedom found in Christ.'),
      p('I have a deep love for people and a particular burden for those who feel bound, fearful, wounded, discouraged, or hindered from becoming who God has called them to be.', 'is-style-lead'),
      p('My desire is always to point people to Jesus Christ, the One who sets us free. Through biblical teaching, prophetic insight, prayer, writing, encouragement, and Spirit-led ministry, I want to help people recognize truth, respond to the Holy Spirit, grow in maturity, and move forward with hope, obedience, and purpose.'),
      buttons([{ text: "Read Karla's Story", url: '/about/' }]),
    ].join('\n'), { align: 'center' }),
  ], { align: 'center' })),

  section([
    eyebrow('Fired-Up! Leaders'),
    h(2, 'Serving together.'),
    p('Karla and her husband, Marvin, co-founded Fired-Up! in 1996 with a heart to develop, equip, and empower servant leaders who follow Jesus Christ.'),
    p("KarlaRSmith.com is the home of Karla's personal teaching, writing, speaking, and ministry voice, while Fired-Up! Leaders remains the organizational ministry founded and led by Marvin and Karla."),
    buttons([{ text: 'Visit Fired-Up! Leaders', url: 'https://firedupleaders.org', outline: true }]),
  ].join('\n')),

  section(columns([
    column([
      eyebrow('Stay Connected'),
      h(2, "I'd love to stay in touch."),
      p('Receive occasional teachings, reflections, resources, and ministry updates, shared to encourage your walk with Jesus.'),
    ].join('\n')),
    column(form('newsletter')),
  ]), 'krs-section--last'),
].join('\n\n'));

// About
write('page-about.php', { title: 'About page', slug: 'page-about', desc: 'Full About page.' }, [
  section([
    eyebrow('ABOUT KARLA'),
    h(1, 'Teacher. Builder. Spiritual Mother. Equipper.'),
    p('<strong>Bible Teacher • Equipper of Believers • Mentor of Leaders • Prophetic Voice</strong>', 'krs-subhead', true),
    lead('Karla R. Smith is an ordained minister, Bible teacher, equipper of believers, mentor of leaders, and prophetic voice with a heart to see people know Jesus Christ, hear the voice of the Holy Spirit, walk in His truth, and experience the freedom found in Him.'),
  ].join('\n'), 'krs-hero'),

  section(columns([
    column(arch('Place about portrait here'), { align: 'center' }),
    column([
      eyebrow('Her Ministry'),
      h(2, 'A life of teaching, equipping & service.'),
      p('Ordained in 2005, Karla has faithfully served the Body of Christ through biblical teaching, prophetic ministry, mentoring, discipleship, prayer, and leadership development. As co-founder of Fired-Up! Leaders, she serves alongside her husband, Marvin, developing, equipping, and encouraging servant leaders to mature in Christ and faithfully fulfill their God-given purpose.'),
      p("With a deep love for God's Word and dependence upon the Holy Spirit, Karla communicates biblical truth with compassion, prophetic insight, and practical application."),
    ].join('\n'), { align: 'center' }),
  ], { align: 'center' })),

  section([
    eyebrow('A Call to Freedom'),
    h(2, 'Liberty to the Captives.'),
    p('Years ago, I received a prophetic word that used the picture of a songbird trapped in a cage. The door was closed, the song was within, but freedom, joy, hope, and expectancy seemed beyond reach.'),
    p('Then came these words:'),
    quote('"Just as I am going to swing open the door of that cage for you, I am going to through your life swing open the door of the cage that keeps them in."'),
    p('And the word concluded:'),
    quote('"Liberty to the captives."'),
    p('Those words have become increasingly clear throughout my journey with Christ.'),
    p("God's work in my life was never intended to end with me. As He has taught me to know Jesus more deeply, hear the Holy Spirit, walk in His truth, and experience His freedom, He has also given me a desire to help others do the same."),
    p('Through biblical teaching, prophetic ministry, mentoring, writing, and Spirit-led encouragement, my desire is to point people to Jesus Christ, the One who saves, heals, restores, and sets captives free.'),
    strong('The cage is not the end of the story.'),
    strong('There is freedom in Christ. There is hope again. And there is still a song within you.'),
    quote('"And you shall know the truth, and the truth shall make you free."', 'John 8:32'),
  ].join('\n')),

  section([
    eyebrow('Her Story'),
    h(2, 'Leadership beyond the pulpit.'),
    p("Karla's service has also extended into organizational leadership, education, community service, and professional administration. These experiences have strengthened her ability to communicate biblical truth with compassion, discernment, practical application, and an understanding of real-life leadership challenges."),
    p("Above all, Karla's desire is to strengthen and equip believers to live with faith, obedience, humility, freedom, and purpose."),
  ].join('\n')),
].join('\n\n'));

// Teach
const topicCard = group([
  blk('post-title', { level: 3, isLink: false }, null),
  blk('post-content', {}, null),
].join('\n'), { className: 'is-style-card krs-topic-card', layout: { type: 'constrained' } });
write('page-teach.php', {
  title: 'Teach page', slug: 'page-teach', desc: 'Full Teach page. Topic cards come from the Teaching Topics post type.',
  todo: ['Teach cards: only titles 01 to 03 are confirmed; her screenshot cut off before descriptions and any further cards. Add or edit under Teaching Topics once she confirms.'],
}, [
  hero('TEACH', 'Truth that leads to freedom.', "Karla teaches from a conviction that God's Word is alive, relevant, and transformational."),
  section([
    p('Her teaching combines biblical truth, prophetic insight, spiritual discernment, and practical application to help believers know Jesus more intimately, recognize the leading of the Holy Spirit, mature in faith, and walk in freedom and obedience.'),
    query({ postType: 'krs_topic', perPage: 50, cols: 3, className: 'krs-topics', empty: 'Teaching topics are coming soon.', card: topicCard }),
  ].join('\n')),
].join('\n\n'));

// Write
const bookCard = group([
  blk('post-terms', { term: 'krs_book_status', className: 'krs-status' }, null),
  blk('post-title', { level: 3, isLink: false }, null),
  blk('post-content', {}, null),
].join('\n'), { className: 'is-style-card krs-book-card', layout: { type: 'constrained' } });
write('page-write.php', { title: 'Write page', slug: 'page-write', desc: 'Full Write page. Book cards come from the Books post type.' }, [
  hero('WRITE', 'Truth made relevant for life.', 'Through books, reflections, and written teachings, Karla seeks to make biblical truth understandable, relevant, and applicable to everyday life.'),
  section([
    eyebrow("FROM KARLA'S DESK"),
    h(2, 'Books, teachings, reflections & resources.'),
    query({ postType: 'krs_book', perPage: 50, cols: 2, className: 'krs-books', empty: 'Books are coming soon.', card: bookCard }),
  ].join('\n')),
].join('\n\n'));

// Speak
write('page-speak.php', {
  title: 'Speak page', slug: 'page-speak', desc: 'Full Speak page with inquiry form.',
  todo: ['Speak form: message field and submit button are reasonable completions; her screenshot cut off after Phone (optional). Confirm the full field list.'],
}, [
  hero('INVITE KARLA', 'Truth. Freedom. Spiritual growth. Purpose.', 'Karla is available for appropriate churches, ministries, conferences, retreats, leadership gatherings, interviews, podcasts, and other speaking opportunities.'),
  section(columns([
    column([
      h(2, 'Areas of teaching.'),
      p('Knowing Jesus Christ • Hearing and Following the Holy Spirit • Truth &amp; Spiritual Freedom • Spiritual Growth &amp; Maturity • Biblical Truth for Everyday Life • Marriage &amp; Relationships • Purpose • Servant Leadership', 'krs-areas', true),
    ].join('\n')),
    column(form('speak')),
  ])),
].join('\n\n'));

// Resources
const resCard = group([
  blk('post-title', { level: 3, isLink: false }, null),
  blk('post-content', {}, null),
].join('\n'), { className: 'is-style-card krs-resource-card', layout: { type: 'constrained' } });
write('page-resources.php', {
  title: 'Resources page', slug: 'page-resources', desc: 'Full Resources page. Category cards come from the Resource Categories post type. Unlinked until real resources exist.',
}, [
  hero('RESOURCES', 'Resources for truth, growth & freedom.', 'A growing library of tools designed to help believers grow in faith, discernment, prayer, and biblical truth.'),
  section(query({ postType: 'krs_resource', perPage: 50, cols: 3, className: 'krs-resources', empty: 'Resources are coming soon.', card: resCard })),
].join('\n\n'));

// Connect
write('page-connect.php', { title: 'Connect page', slug: 'page-connect', desc: 'Full Connect page with contact form.' }, [
  hero('CONNECT', 'Connect with Karla.', "Whether you're reaching out about teaching, speaking, ministry, resources, or simply want to stay connected, we'd love to hear from you."),
  section(columns([
    column([
      h(2, 'Send a message.'),
      p('Speaking invitations should use the dedicated speaking inquiry. Fired-Up! Leaders organizational matters should be directed to Fired-Up! Leaders.'),
      buttons([
        { text: 'Speaking Inquiry', url: '/speak/', outline: true },
        { text: 'Fired-Up! Leaders', url: 'https://firedupleaders.org', outline: true },
      ]),
    ].join('\n')),
    column(form('connect')),
  ])),
].join('\n\n'));

// Support the Work
write('page-support.php', {
  title: 'Support the Work page', slug: 'page-support', desc: 'Support the Work page (footer link only).',
  todo: ['Support button: exact Fired-Up! Leaders giving URL not provided. Currently points to https://firedupleaders.org. Edit the Button block link when she supplies it.'],
}, [
  section([
    eyebrow('SUPPORT THE WORK'),
    h(1, 'Helping Truth Reach Others'),
    lead("Karla's heart is to help people know Jesus, hear the Holy Spirit, grow in biblical truth, and walk in the freedom and purpose God has for their lives."),
  ].join('\n'), 'krs-hero'),
  section([
    p("Through biblical teaching, writing, mentoring, speaking, and the development of practical resources, Karla desires to make God's truth accessible, relevant, and applicable to everyday life."),
    p('If you have been encouraged by this ministry and would like to help make these teachings and resources available to others, you are warmly invited to support the work through Fired-Up! Leaders, a 501(c)(3) nonprofit ministry.'),
    p('Your tax-deductible contribution helps support the continued work of sharing biblical truth, equipping believers, developing resources, and encouraging people to grow in Christ and live lives of faith, freedom, and God-given purpose.'),
    p('Thank you for partnering with us and helping this work reach others.'),
    buttons([{ text: 'Support the Work', url: 'https://firedupleaders.org' }]),
    p('Contributions are made to and received by Fired-Up! Leaders, a 501(c)(3) nonprofit ministry.', 'krs-fineprint'),
  ].join('\n'), 'krs-narrow'),
].join('\n\n'));

console.log('patterns written to', root);
