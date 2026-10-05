<?php
defined( 'ABSPATH' ) || exit;

add_action( 'after_setup_theme', function () {
	add_theme_support( 'editor-styles' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'responsive-embeds' );
	add_editor_style( 'style.css' );
} );

add_action( 'init', function () {
	register_block_style( 'core/paragraph', array( 'name' => 'eyebrow', 'label' => __( 'Eyebrow', 'karlarsmith' ) ) );
	register_block_style( 'core/paragraph', array( 'name' => 'lead', 'label' => __( 'Lead', 'karlarsmith' ) ) );
	register_block_style( 'core/group', array( 'name' => 'card', 'label' => __( 'Card', 'karlarsmith' ) ) );
	register_block_style( 'core/group', array( 'name' => 'arch', 'label' => __( 'Arch', 'karlarsmith' ) ) );
	register_block_style( 'core/button', array( 'name' => 'light', 'label' => __( 'Light (on dark)', 'karlarsmith' ) ) );
	register_block_style( 'core/image', array( 'name' => 'arch', 'label' => __( 'Arch', 'karlarsmith' ) ) );

	register_block_pattern_category( 'karlarsmith-pages', array( 'label' => __( 'Karla R. Smith pages', 'karlarsmith' ) ) );
} );

// Teach topics, books and resources display in a deliberate order (menu order, then title).
add_filter( 'query_loop_block_query_vars', function ( $query ) {
	$types = array( 'krs_topic', 'krs_book', 'krs_resource' );
	if ( isset( $query['post_type'] ) && in_array( $query['post_type'], $types, true ) ) {
		$query['orderby'] = array( 'menu_order' => 'ASC', 'title' => 'ASC' );
	}
	return $query;
} );

// Block themes do not load style.css by themselves.
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'karlarsmith', get_stylesheet_uri(), array(), filemtime( get_stylesheet_directory() . '/style.css' ) );
} );

// Motion: marks the page as JS-capable early (so reveal styles apply), then loads the small script.
add_action( 'wp_head', function () {
	echo "<script>document.documentElement.classList.add('krs-js');</script>\n";
}, 1 );

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_script( 'karlarsmith-theme', get_theme_file_uri( 'assets/js/theme.js' ), array(), filemtime( get_theme_file_path( 'assets/js/theme.js' ) ), array( 'in_footer' => true, 'strategy' => 'defer' ) );
} );

// The header menu always collapses into the mobile (hamburger) menu on small screens,
// even if the Site Editor copy of the header was saved with a different setting.
add_filter( 'render_block_data', function ( $block ) {
	if ( 'core/navigation' === $block['blockName'] && ! empty( $block['attrs']['className'] ) && false !== strpos( $block['attrs']['className'], 'krs-nav' ) ) {
		$block['attrs']['overlayMenu'] = 'mobile';
	}
	return $block;
} );
