// Generates karlarsmith/patterns/*.php (block markup) from one source so the
// hand-written block HTML stays valid and consistent.
// Structure and copy follow the client's reference files (index/about/teach/write/speak/resources.html)
// and karlarsmith-master-spec.md.
// Run: node tools/build-patterns.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'karlarsmith', 'patterns');
mkdirSync(root, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/&lt;br>/g, '<br>');
const attrs = (o) => (o && Object.keys(o).length ? ' ' + JSON.stringify(o) : '');
const blk = (name, a, html) =>
  html === null
    ? `<!-- wp:${name}${attrs(a)} /-->`
    : `<!-- wp:${name}${attrs(a)} -->\n${html}\n<!-- /wp:${name} -->`;
const cls = (...c) => c.filter(Boolean).join(' ');

const p = (text, className, raw = false) =>
  blk('paragraph', className ? { className } : {}, `<p${className ? ` class="${className}"` : ''}>${raw ? text : esc(text)}</p>`);
const eyebrow = (t) => p(t, 'is-style-eyebrow');
const lead = (t, raw = false) => p(t, 'is-style-lead', raw);
const strong = (t) => p(`<strong>${esc(t)}</strong>`, '', true);
const h = (level, text, className) => {
  const a = {};
  if (level !== 2) a.level = level;
  if (className) a.className = className;
  return blk('heading', a, `<h${level} class="${cls('wp-block-heading', className)}">${esc(text)}</h${level}>`);
};
const quote = (text, citation) =>
  blk('quote', {}, `<blockquote class="wp-block-quote">${p(text)}${citation ? `<cite>${esc(citation)}</cite>` : ''}</blockquote>`);
const button = (text, url, style) =>
  blk('button', style ? { className: `is-style-${style}` } : {},
    `<div class="${cls('wp-block-button', style && `is-style-${style}`)}"><a class="wp-block-button__link wp-element-button" href="${url}">${esc(text)}</a></div>`);
const buttons = (list) =>
  blk('buttons', {}, `<div class="wp-block-buttons">${list.map((b) => button(b.text, b.url, b.style)).join('\n')}</div>`);
const group = (inner, { className, layout = { type: 'constrained' }, tag } = {}) => {
  const a = {};
  if (tag) a.tagName = tag;
  if (className) a.className = className;
  if (layout) a.layout = layout;
  const t = tag || 'div';
  return blk('group', a, `<${t} class="${cls('wp-block-group', className)}">\n${inner}\n</${t}>`);
};
const column = (inner) => blk('column', {}, `<div class="wp-block-column">\n${inner}\n</div>`);
const columns = (cols, className) =>
  blk('columns', className ? { className } : {}, `<div class="${cls('wp-block-columns', className)}">\n${cols.join('\n')}\n</div>`);
const form = (name) => `<!-- wp:shortcode -->\n[krs_form form="${name}"]\n<!-- /wp:shortcode -->`;
const copy = (...items) => group(items.join('\n'), { className: 'krs-copy', layout: { type: 'default' } });

// Components
const arch = () => '<?php echo krs_arch_block(); ?>';
const section = (inner, extra) => group(inner, { className: cls('krs-section', extra) });
const pageHero = (...inner) => group(inner.join('\n'), { className: 'krs-page-hero' });
const twoCol = (left, right) => columns([column(left), column(right)], 'krs-two-col');
const pathway = (num, title, body, link) =>
  column(group([eyebrow(num), h(3, title), p(body), p(`<a href="${link[1]}">${esc(link[0])}</a>`, 'krs-card-link', true)].join('\n'),
    { className: 'krs-pathway', layout: { type: 'default' } }));
const band = (items) =>
  group(group(items.map((t) => p(t, 'krs-band__item')).join('\n'),
    { className: 'krs-band__inner', layout: { type: 'flex', flexWrap: 'wrap', justifyContent: 'center' } }), { className: 'krs-band' });

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

write('arch-portrait.php',
  { title: 'Arch portrait', slug: 'arch-portrait', desc: 'Arch-shaped portrait using the site portrait photo (Image block, Arch style).' },
  arch());

// Home
write('page-home.php', {
  title: 'Home page', slug: 'page-home', desc: 'Full Home page.',
  todo: [
    'Hero tagline: the short version (client reference files) is used. Her later written note asked for the longer "Know Jesus. Hear the voice of the Holy Spirit. Walk in His truth. Biblical teaching and encouragement to help you grow in faith and live God\'s Word." Confirm which she wants.',
    'The "Featured: Latest teaching & writing" block in her index.html is a designer placeholder (video feature area) and is intentionally left out until real content exists.',
    'Stay Connected form has no mailing-list service wired; submissions are emailed to the site admin.',
  ],
}, [
  group(columns([
    column([
      eyebrow('Bible Teacher • Equipper of Believers • Mentor of Leaders • Prophetic Voice'),
      h(1, "Welcome. I'm Karla."),
      p('Know Jesus. Hear the Holy Spirit. Walk in His Truth.', 'krs-tag'),
      p("I'm a Bible teacher, equipper of believers, mentor of leaders, and prophetic voice. My heart is to help you know Jesus more intimately, recognize the voice of the Holy Spirit, grow in biblical truth, and walk in the freedom and purpose God has for your life.", 'krs-hero-body'),
      buttons([{ text: 'Explore the Teaching', url: '/teach/' }, { text: 'About Karla', url: '/about/', style: 'outline' }]),
    ].join('\n')),
    column(arch()),
  ], 'krs-hero-cols'), { className: 'krs-home-hero' }),

  band(['Jesus', 'Truth', 'Holy Spirit', 'Freedom', 'Spiritual Maturity', 'Purpose']),

  section(twoCol(
    [eyebrow('A Place to Grow'), h(2, "Let's walk in truth together.")].join('\n'),
    copy(
      p("I believe God's Word is not simply something we study, it is truth we receive, live, and allow to transform us."),
      p('Whether you are growing in your relationship with Jesus, learning to recognize the voice of the Holy Spirit, seeking freedom, or stepping more fully into your purpose, my prayer is that what you find here will encourage you, strengthen you, and point you back to Christ.'),
      quote('"And you shall know the truth, and the truth shall make you free."', 'John 8:32'),
    ))),

  section([
    eyebrow('The Heart Behind the Call'),
    h(2, 'Truth spoken in love.<br>Freedom found in Christ.'),
    lead('I have a deep love for people and a particular burden for those who feel bound, fearful, wounded, discouraged, or hindered from becoming who God has called them to be.'),
    p('My desire is always to point people to Jesus Christ, the One who sets us free. Through biblical teaching, prophetic insight, prayer, writing, encouragement, and Spirit-led ministry, I want to help people recognize truth, respond to the Holy Spirit, grow in maturity, and move forward with hope, obedience, and purpose.', 'krs-copy'),
    buttons([{ text: "Read Karla's Story", url: '/about/' }]),
  ].join('\n'), 'krs-section--alt'),

  section([
    eyebrow('Come Along'),
    h(2, 'There are several ways we can grow together.'),
    columns([
      pathway('01', 'Teach', "Biblical teaching and prophetic insight to help believers know Christ, recognize truth, mature spiritually, and live God's Word.", ['Explore Teaching →', '/teach/']),
      pathway('02', 'Write', 'Books, reflections, and resources designed to make biblical truth relevant to everyday life.', ['Explore Writing →', '/write/']),
      pathway('03', 'Speak', 'Biblical teaching and Spirit-led ministry for churches, conferences, gatherings, podcasts, and retreats.', ['Invite Karla →', '/speak/']),
    ], 'krs-pathways'),
  ].join('\n')),

  section(twoCol(
    [eyebrow('Fired-Up! Leaders'), h(2, 'Serving together.')].join('\n'),
    [copy(
      p('Karla and her husband, Marvin, co-founded Fired-Up! in 1996 with a heart to develop, equip, and empower servant leaders who follow Jesus Christ.'),
      p("KarlaRSmith.com is the home of Karla's personal teaching, writing, speaking, and ministry voice, while Fired-Up! Leaders remains the organizational ministry founded and led by Marvin and Karla."),
    ), buttons([{ text: 'Visit Fired-Up! Leaders', url: 'https://firedupleaders.org', style: 'light' }])].join('\n'),
  ), 'krs-section--dark'),

  section(group([
    eyebrow('Stay Connected'),
    h(2, "I'd love to stay in touch."),
    p('Receive occasional teachings, reflections, resources, and ministry updates, shared to encourage your walk with Jesus.', 'krs-copy'),
    form('newsletter'),
  ].join('\n'), { className: 'krs-newsletter-inner', layout: { type: 'default' } }), 'krs-section--alt krs-newsletter'),
].join('\n\n'));

// About
write('page-about.php', { title: 'About page', slug: 'page-about', desc: 'Full About page.' }, [
  pageHero(
    eyebrow('About Karla'),
    h(1, 'Teacher. Builder.<br>Spiritual Mother. Equipper.'),
    lead('<strong>Bible Teacher • Equipper of Believers • Mentor of Leaders • Prophetic Voice</strong>', true),
    lead('Karla R. Smith is an ordained minister, Bible teacher, equipper of believers, mentor of leaders, and prophetic voice with a heart to see people know Jesus Christ, hear the voice of the Holy Spirit, walk in His truth, and experience the freedom found in Him.'),
  ),
  section(twoCol(
    arch(),
    [eyebrow('Her Ministry'), h(2, 'A life of teaching, equipping & service.'), copy(
      p('Ordained in 2005, Karla has faithfully served the Body of Christ through biblical teaching, prophetic ministry, mentoring, discipleship, prayer, and leadership development. As co-founder of Fired-Up! Leaders, she serves alongside her husband, Marvin, developing, equipping, and encouraging servant leaders to mature in Christ and faithfully fulfill their God-given purpose.'),
      p("With a deep love for God's Word and dependence upon the Holy Spirit, Karla communicates biblical truth with compassion, prophetic insight, and practical application."),
    )].join('\n'),
  )),
  section([
    eyebrow('A Call to Freedom'),
    h(2, 'Liberty to the Captives.'),
    copy(
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
    ),
    quote('"And you shall know the truth, and the truth shall make you free."', 'John 8:32'),
  ].join('\n'), 'krs-section--alt'),
  section([
    eyebrow('Her Story'),
    h(2, 'Leadership beyond the pulpit.'),
    copy(
      p("Karla's service has also extended into organizational leadership, education, community service, and professional administration. These experiences have strengthened her ability to communicate biblical truth with compassion, discernment, practical application, and an understanding of real-life leadership challenges."),
      p("Above all, Karla's desire is to strengthen and equip believers to live with faith, obedience, humility, freedom, and purpose."),
    ),
  ].join('\n')),
].join('\n\n'));

// Teach
const topicCard = group([
  blk('post-title', { level: 3, isLink: false }, null),
  blk('post-content', {}, null),
].join('\n'), { className: 'is-style-card krs-topic-card', layout: { type: 'default' } });
write('page-teach.php', { title: 'Teach page', slug: 'page-teach', desc: 'Full Teach page. Topic cards come from the Teaching Topics post type.' }, [
  pageHero(
    eyebrow('Teach'),
    h(1, 'Truth that leads to freedom.'),
    lead("Karla teaches from a conviction that God's Word is alive, relevant, and transformational."),
  ),
  section([
    p('Her teaching combines biblical truth, prophetic insight, spiritual discernment, and practical application to help believers know Jesus more intimately, recognize the leading of the Holy Spirit, mature in faith, and walk in freedom and obedience.', 'krs-copy'),
    query({ postType: 'krs_topic', perPage: 50, cols: 3, className: 'krs-topics', empty: 'Teaching topics are coming soon.', card: topicCard }),
  ].join('\n')),
].join('\n\n'));

// Write
const bookCard = group([
  blk('post-terms', { term: 'krs_book_status', className: 'krs-status' }, null),
  blk('post-title', { level: 3, isLink: false }, null),
  blk('post-content', {}, null),
].join('\n'), { className: 'is-style-card krs-book-card', layout: { type: 'default' } });
write('page-write.php', { title: 'Write page', slug: 'page-write', desc: 'Full Write page. Cards come from the Books post type.' }, [
  pageHero(
    eyebrow('Write'),
    h(1, 'Truth made relevant for life.'),
    lead('Through books, reflections, and written teachings, Karla seeks to make biblical truth understandable, relevant, and applicable to everyday life.'),
  ),
  section([
    eyebrow("From Karla's Desk"),
    h(2, 'Books, teachings, reflections & resources.'),
    query({ postType: 'krs_book', perPage: 50, cols: 3, className: 'krs-books', empty: 'Books are coming soon.', card: bookCard }),
  ].join('\n')),
].join('\n\n'));

// Speak
write('page-speak.php', { title: 'Speak page', slug: 'page-speak', desc: 'Full Speak page with inquiry form.' }, [
  pageHero(
    eyebrow('Invite Karla'),
    h(1, 'Truth. Freedom.<br>Spiritual growth. Purpose.'),
    lead('Karla is available for appropriate churches, ministries, conferences, retreats, leadership gatherings, interviews, podcasts, and other speaking opportunities.'),
  ),
  section(twoCol(
    [h(2, 'Areas of teaching.'), copy(
      p('Knowing Jesus Christ • Hearing and Following the Holy Spirit • Truth & Spiritual Freedom • Spiritual Growth & Maturity • Biblical Truth for Everyday Life • Marriage & Relationships • Purpose • Servant Leadership'),
      p('Her ministry combines biblical teaching, prophetic insight, compassion, and practical application, with sensitivity to the leading of the Holy Spirit.'),
    )].join('\n'),
    form('speak'),
  )),
].join('\n\n'));

// Resources
const resCard = group([
  blk('post-title', { level: 3, isLink: false }, null),
  blk('post-content', {}, null),
].join('\n'), { className: 'is-style-card krs-resource-card', layout: { type: 'default' } });
write('page-resources.php', {
  title: 'Resources page', slug: 'page-resources', desc: 'Full Resources page. Category cards come from the Resource Categories post type. Unlinked until real resources exist.',
}, [
  pageHero(
    eyebrow('Resources'),
    h(1, 'Resources for truth, growth & freedom.'),
    lead('A growing library of tools designed to help believers grow in faith, discernment, prayer, and biblical truth.'),
  ),
  section(query({ postType: 'krs_resource', perPage: 50, cols: 3, className: 'krs-resources', empty: 'Resources are coming soon.', card: resCard })),
].join('\n\n'));

// Connect
write('page-connect.php', { title: 'Connect page', slug: 'page-connect', desc: 'Full Connect page with contact form.' }, [
  pageHero(
    eyebrow('Connect'),
    h(1, 'Connect with Karla.'),
    lead("Whether you're reaching out about teaching, speaking, ministry, resources, or simply want to stay connected, we'd love to hear from you."),
  ),
  section(twoCol(
    [h(2, 'Send a message.'), p('Speaking invitations should use the dedicated speaking inquiry. Fired-Up! Leaders organizational matters should be directed to Fired-Up! Leaders.', 'krs-copy'),
      buttons([
        { text: 'Speaking Inquiry', url: '/speak/', style: 'outline' },
        { text: 'Fired-Up! Leaders', url: 'https://firedupleaders.org', style: 'outline' },
      ])].join('\n'),
    form('connect'),
  )),
].join('\n\n'));

// Support the Work
write('page-support.php', {
  title: 'Support the Work page', slug: 'page-support', desc: 'Support the Work page (footer link only).',
  todo: ['Support button: exact Fired-Up! Leaders giving URL not provided. Currently points to https://firedupleaders.org. Edit the Button block link when she supplies it.'],
}, [
  pageHero(
    eyebrow('Support the Work'),
    h(1, 'Helping Truth Reach Others'),
    lead("Karla's heart is to help people know Jesus, hear the Holy Spirit, grow in biblical truth, and walk in the freedom and purpose God has for their lives."),
  ),
  section([
    p("Through biblical teaching, writing, mentoring, speaking, and the development of practical resources, Karla desires to make God's truth accessible, relevant, and applicable to everyday life.", 'krs-copy'),
    p('If you have been encouraged by this ministry and would like to help make these teachings and resources available to others, you are warmly invited to support the work through Fired-Up! Leaders, a 501(c)(3) nonprofit ministry.', 'krs-copy'),
    p('Your tax-deductible contribution helps support the continued work of sharing biblical truth, equipping believers, developing resources, and encouraging people to grow in Christ and live lives of faith, freedom, and God-given purpose.', 'krs-copy'),
    p('Thank you for partnering with us and helping this work reach others.', 'krs-copy'),
    buttons([{ text: 'Support the Work', url: 'https://firedupleaders.org' }]),
    p('Contributions are made to and received by Fired-Up! Leaders, a 501(c)(3) nonprofit ministry.', 'krs-fineprint'),
  ].join('\n')),
].join('\n\n'));

// Legal pages (draft text written from what the site actually does; attorney review recommended)
const ul = (items) => blk('list', {}, `<ul class="wp-block-list">${items.map((t) => blk('list-item', {}, `<li>${esc(t)}</li>`)).join('\n')}</ul>`);
const legalPage = (file, slug, title, titleText, leadText, body, todo) =>
  write(file, { title, slug, desc: titleText + ' page.', todo }, [
    pageHero(eyebrow('Legal'), h(1, titleText), lead(leadText)),
    section(body.join('\n'), 'krs-narrow krs-legal'),
  ].join('\n\n'));
const contactLine = (what) => p(`Questions about ${what} can be sent through the <a href="/connect/">Connect page</a>.`, '', true);

legalPage('page-privacy.php', 'page-privacy', 'Privacy Policy page', 'Privacy Policy',
  'How KarlaRSmith.com handles the information you share with us.', [
  p('Last updated: October 5, 2026', 'krs-fineprint'),
  h(2, 'Who we are'),
  p('KarlaRSmith.com is the personal website of Karla R. Smith, a Bible teacher, equipper of believers, mentor of leaders, and prophetic voice. Fired-Up! Leaders is a separate organizational ministry founded by Marvin and Karla Smith and is not operated through this website.'),
  h(2, 'Information we collect'),
  p('We collect only what you choose to send us through the forms on this site:'),
  ul([
    'Connect form: your name, email address, subject, and message.',
    'Speaking inquiry form: your name, organization or ministry, email address, optional phone number, event name, date, location, type of event, and a description of your event.',
    'Stay Connected form: your first name and email address.',
  ]),
  p('Like most websites, our hosting provider may automatically record technical information such as your IP address, browser type, and the pages you visit, for security and to keep the site running.'),
  h(2, 'Cookies'),
  p('This website uses only the cookies needed for it to work, such as those WordPress and its form tools use for security and spam protection. We do not currently use advertising or marketing cookies. If analytics or similar tools are added in the future, this policy will be updated.'),
  h(2, 'How we use your information'),
  ul([
    'To respond to your message or inquiry.',
    'To consider and arrange speaking, teaching, and ministry opportunities.',
    'To send occasional teachings, reflections, resources, and ministry updates if you ask to stay connected.',
    'To protect the site from spam and misuse.',
  ]),
  h(2, 'Sharing your information'),
  p('We do not sell or rent your personal information. We may share it only with the service providers who help run this website, such as hosting and email delivery, and only as needed for them to do so. We may also disclose information if the law requires it.'),
  h(2, 'Email updates'),
  p('If you sign up through Stay Connected, we will use your email address to send occasional updates. You can ask to be removed at any time by contacting us, and updates will include a way to unsubscribe.'),
  h(2, 'Giving and links to other sites'),
  p('This website does not collect payments or financial information. The Support the Work page directs you to Fired-Up! Leaders, a 501(c)(3) nonprofit ministry, which receives contributions through its own giving method and is responsible for its own privacy practices. This site may also link to other websites that we do not control.'),
  h(2, 'Keeping your information'),
  p('We keep messages and inquiries only as long as needed to respond and to keep reasonable records. We take sensible steps to protect your information, but no website or email can be guaranteed completely secure.'),
  h(2, 'Children'),
  p('This website is intended for adults and is not directed to children under 13. We do not knowingly collect information from children.'),
  h(2, 'Your choices'),
  p('You may ask what information we hold about you, ask us to correct or delete it, or ask to stop receiving updates by writing to us through the Connect page.'),
  h(2, 'Changes to this policy'),
  p('We may update this policy from time to time. The date at the top shows when it was last changed.'),
  h(2, 'Contact'),
  contactLine('this policy'),
], [
  'Draft written from the site as built (forms, no payments, no analytics, no ad cookies). Confirm those facts, add a contact email if wanted, and have it reviewed before launch.',
]);

legalPage('page-terms.php', 'page-terms', 'Terms page', 'Terms',
  'The terms for using KarlaRSmith.com.', [
  p('Last updated: October 5, 2026', 'krs-fineprint'),
  h(2, 'Using this website'),
  p('By using KarlaRSmith.com you agree to these terms. If you do not agree, please do not use the site.'),
  h(2, 'Purpose of the content'),
  p('The teaching, writing, and resources on this site are offered for biblical encouragement, education, and spiritual growth. They are not a substitute for professional medical, legal, financial, or mental health advice or care. Please seek qualified help for those needs.'),
  h(2, 'Ownership and permitted use'),
  p('Unless noted otherwise, the content on this site, including text, teaching, design, and images, belongs to Karla R. Smith and is protected by copyright. You may read, share a link to, and quote short portions of it for personal, non-commercial use with clear credit to Karla R. Smith and a link back to the site. Please ask before reproducing, republishing, or selling any of it. Scripture quotations remain the property of their respective publishers.'),
  h(2, 'Messages and forms'),
  p("When you use the forms on this site, please give accurate information and do not send unlawful, harmful, or abusive content, or spam. Sending a message does not create a ministry, counseling, or professional relationship. Speaking and teaching invitations are considered at Karla's discretion and are not confirmed until agreed with you directly."),
  h(2, 'Giving'),
  p('Contributions are made to and received by Fired-Up! Leaders, a 501(c)(3) nonprofit ministry, through its own giving method. This website does not process donations.'),
  h(2, 'Links to other sites'),
  p('This site may link to other websites, including Fired-Up! Leaders. We do not control those sites and are not responsible for their content or practices.'),
  h(2, 'No warranties and limits of liability'),
  p('This website and its content are provided as is, without promises that they will be uninterrupted, error free, or suited to your particular needs. To the fullest extent the law allows, Karla R. Smith is not liable for any loss or damage arising from your use of the site or reliance on its content.'),
  h(2, 'Changes'),
  p('We may update these terms from time to time. Continued use of the site after a change means you accept the updated terms.'),
  h(2, 'Contact'),
  contactLine('these terms'),
], [
  'Draft written for a ministry website. Add the governing state and any other details with an attorney before launch.',
]);

console.log('patterns written to', root);
