<?php
/**
 * Title: Write page
 * Slug: karlarsmith/page-write
 * Categories: karlarsmith-pages
 * Description: Full Write page. Cards come from the Books post type.
 * Viewport Width: 1280
 */
?>
<!-- wp:group {"className":"krs-page-hero","layout":{"type":"constrained"}} -->
<div class="wp-block-group krs-page-hero">
<!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow">Books &amp; Writing</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Truth made relevant for life.</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"is-style-lead"} -->
<p class="is-style-lead">Through books, reflections, and written teachings, Karla seeks to make biblical truth understandable, relevant, and applicable to everyday life.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"krs-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group krs-section">
<!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow">From Karla's Desk</p>
<!-- /wp:paragraph -->
<!-- wp:heading -->
<h2 class="wp-block-heading">Books, teachings, reflections &amp; resources.</h2>
<!-- /wp:heading -->
<!-- wp:query {"queryId":1,"query":{"perPage":50,"pages":0,"offset":0,"postType":"krs_book","order":"asc","orderBy":"title","author":"","search":"","exclude":[],"sticky":"","inherit":false},"className":"krs-books"} -->
<div class="wp-block-query krs-books">
<!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
<!-- wp:group {"className":"is-style-card krs-book-card","layout":{"type":"default"}} -->
<div class="wp-block-group is-style-card krs-book-card">
<!-- wp:post-terms {"term":"krs_book_status","className":"krs-status"} /-->
<!-- wp:post-title {"level":3,"isLink":false} /-->
<!-- wp:post-content /-->
</div>
<!-- /wp:group -->
<!-- /wp:post-template -->
<!-- wp:query-no-results -->
<!-- wp:paragraph -->
<p>Books are coming soon.</p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results -->
</div>
<!-- /wp:query -->
</div>
<!-- /wp:group -->
