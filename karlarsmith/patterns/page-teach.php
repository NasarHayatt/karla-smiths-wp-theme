<?php
/**
 * Title: Teach page
 * Slug: karlarsmith/page-teach
 * Categories: karlarsmith-pages
 * Description: Full Teach page. Topic cards come from the Teaching Topics post type.
 * Viewport Width: 1280
 */
?>
<!-- wp:group {"className":"krs-page-hero","layout":{"type":"constrained"}} -->
<div class="wp-block-group krs-page-hero">
<!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow">Teaching</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Truth that leads to freedom.</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"is-style-lead"} -->
<p class="is-style-lead">Karla teaches from a conviction that God's Word is alive, relevant, and transformational.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"krs-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group krs-section">
<!-- wp:paragraph {"className":"krs-copy"} -->
<p class="krs-copy">Her teaching combines biblical truth, prophetic insight, spiritual discernment, and practical application to help believers know Jesus more intimately, recognize the leading of the Holy Spirit, mature in faith, and walk in freedom and obedience.</p>
<!-- /wp:paragraph -->
<!-- wp:query {"queryId":1,"query":{"perPage":50,"pages":0,"offset":0,"postType":"krs_topic","order":"asc","orderBy":"title","author":"","search":"","exclude":[],"sticky":"","inherit":false},"className":"krs-topics"} -->
<div class="wp-block-query krs-topics">
<!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
<!-- wp:group {"className":"is-style-card krs-topic-card","layout":{"type":"default"}} -->
<div class="wp-block-group is-style-card krs-topic-card">
<!-- wp:post-title {"level":3,"isLink":false} /-->
<!-- wp:post-content /-->
</div>
<!-- /wp:group -->
<!-- /wp:post-template -->
<!-- wp:query-no-results -->
<!-- wp:paragraph -->
<p>Teaching topics are coming soon.</p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results -->
</div>
<!-- /wp:query -->
</div>
<!-- /wp:group -->
