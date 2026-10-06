<?php
/**
 * Content helpers: portrait photo, query safety net, one-time page refresh.
 */
defined( 'ABSPATH' ) || exit;

/**
 * Attachment ID of Karla's portrait. Stored in the krs_portrait_id option.
 * First run looks it up in the Media Library by its file name.
 */
function krs_portrait_id() {
	$id = (int) get_option( 'krs_portrait_id' );
	if ( $id && 'attachment' === get_post_type( $id ) ) {
		return $id;
	}
	global $wpdb;
	$id = (int) $wpdb->get_var( $wpdb->prepare(
		"SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_wp_attached_file' AND meta_value LIKE %s ORDER BY post_id DESC LIMIT 1",
		'%' . $wpdb->esc_like( 'WhatsApp-Image-2026-09-30-at-12.56.38-AM' ) . '%'
	) );
	if ( $id ) {
		update_option( 'krs_portrait_id', $id );
	}
	return $id;
}

/** Arch-shaped portrait as an Image block. Empty when no photo exists yet (no placeholder is shown). */
function krs_arch_block() {
	$id  = krs_portrait_id();
	$url = $id ? wp_get_attachment_image_url( $id, 'large' ) : '';
	if ( ! $url ) {
		return '';
	}
	$url = esc_url( $url );
	return '<!-- wp:image {"id":' . $id . ',"sizeSlug":"large","linkDestination":"none","className":"is-style-arch"} -->' . "\n"
		. '<figure class="wp-block-image size-large is-style-arch"><img src="' . $url . '" alt="Karla R. Smith" class="wp-image-' . $id . '"/></figure>' . "\n"
		. '<!-- /wp:image -->';
}

// Safety net: the card lists always read from their own post type, whatever the saved block says.
add_filter( 'render_block_data', function ( $block ) {
	if ( 'core/query' !== $block['blockName'] || empty( $block['attrs']['className'] ) ) {
		return $block;
	}
	$map = array(
		'krs-topics'    => 'krs_topic',
		'krs-books'     => 'krs_book',
		'krs-resources' => 'krs_resource',
	);
	foreach ( $map as $class => $type ) {
		if ( false !== strpos( $block['attrs']['className'], $class ) ) {
			$block['attrs']['query']['postType'] = $type;
			$block['attrs']['query']['inherit']  = false;
		}
	}
	return $block;
} );

// One-time refresh of the starter pages to the current patterns (adds missing pages too).
// Only pages that still carry the theme's own markup (krs-section) are replaced.
add_action( 'admin_init', function () {
	$version = 9;
	if ( (int) get_option( 'krs_content_version' ) >= $version || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	krs_reset_template_parts();
	krs_seed_entries();
	krs_seed_pages();
	krs_rename_pages();
	$map = array(
		'home' => 'page-home', 'about' => 'page-about', 'teach' => 'page-teach', 'write' => 'page-write',
		'speak' => 'page-speak', 'resources' => 'page-resources', 'connect' => 'page-connect', 'support-the-work' => 'page-support',
	);
	foreach ( $map as $slug => $pattern ) {
		$page = get_page_by_path( $slug );
		if ( $page && false !== strpos( $page->post_content, 'krs-section' ) ) {
			wp_update_post( array( 'ID' => $page->ID, 'post_content' => wp_slash( krs_pattern_markup( $pattern ) ) ) );
		}
	}
	update_option( 'krs_content_version', $version );
} );

/** Removes Site Editor copies of the header and footer so the theme's files apply (the logo is a site setting and stays). */
function krs_reset_template_parts() {
	$parts = get_posts( array(
		'post_type'   => 'wp_template_part',
		'post_status' => 'any',
		'numberposts' => -1,
		'tax_query'   => array( array( 'taxonomy' => 'wp_theme', 'field' => 'name', 'terms' => get_stylesheet() ) ),
	) );
	foreach ( $parts as $part ) {
		if ( in_array( $part->post_name, array( 'header', 'footer' ), true ) ) {
			wp_delete_post( $part->ID, true );
		}
	}
}

/** Page titles follow the client's naming: Teaching, Books & Writing, Speaking (URLs stay the same). */
function krs_rename_pages() {
	$names = array( 'teach' => array( 'Teach', 'Teaching' ), 'write' => array( 'Write', 'Books & Writing' ), 'speak' => array( 'Speak', 'Speaking' ) );
	foreach ( $names as $slug => $pair ) {
		$page = get_page_by_path( $slug );
		if ( $page && $page->post_title === $pair[0] ) {
			wp_update_post( array( 'ID' => $page->ID, 'post_title' => $pair[1] ) );
		}
	}
}
