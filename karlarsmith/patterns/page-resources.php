<?php
/**
 * Title: Resources page
 * Slug: karlarsmith/page-resources
 * Categories: karlarsmith-pages
 * Description: Full Resources page. Category cards come from the Resource Categories post type. Unlinked until real resources exist.
 * Viewport Width: 1280
 */
?>
<!-- wp:group {"className":"krs-page-hero","layout":{"type":"constrained"}} -->
<div class="wp-block-group krs-page-hero">
<!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow">Resources</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Resources for truth, growth &amp; freedom.</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"is-style-lead"} -->
<p class="is-style-lead">A growing library of tools designed to help believers grow in faith, discernment, prayer, and biblical truth.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"krs-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group krs-section">
<!-- wp:query {"queryId":1,"query":{"perPage":50,"pages":0,"offset":0,"postType":"krs_resource","order":"asc","orderBy":"title","author":"","search":"","exclude":[],"sticky":"","inherit":false},"className":"krs-resources"} -->
<div class="wp-block-query krs-resources">
<!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
<!-- wp:group {"className":"is-style-card krs-resource-card","layout":{"type":"default"}} -->
<div class="wp-block-group is-style-card krs-resource-card">
<!-- wp:post-title {"level":3,"isLink":false} /-->
<!-- wp:post-content /-->
</div>
<!-- /wp:group -->
<!-- /wp:post-template -->
<!-- wp:query-no-results -->
<!-- wp:paragraph -->
<p>Resources are coming soon.</p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results -->
</div>
<!-- /wp:query -->
</div>
<!-- /wp:group -->
