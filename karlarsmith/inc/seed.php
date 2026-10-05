<?php
/**
 * One-time starter content on theme activation. Nothing is overwritten:
 * pages and entries are only created if they do not already exist.
 */
defined( 'ABSPATH' ) || exit;

function krs_pattern_markup( $slug ) {
	$file = get_theme_file_path( 'patterns/' . $slug . '.php' );
	if ( ! file_exists( $file ) ) {
		return '';
	}
	ob_start();
	include $file;
	return trim( ob_get_clean() );
}

function krs_seed_pages() {
	$pages = array(
		array( 'home', 'Home', 'page-home' ),
		array( 'about', 'About', 'page-about' ),
		array( 'teach', 'Teach', 'page-teach' ),
		array( 'write', 'Write', 'page-write' ),
		array( 'speak', 'Speak', 'page-speak' ),
		array( 'resources', 'Resources', 'page-resources' ),
		array( 'connect', 'Connect', 'page-connect' ),
		array( 'support-the-work', 'Support the Work', 'page-support' ),
	);
	$ids = array();
	foreach ( $pages as $i => $page ) {
		$existing = get_page_by_path( $page[0] );
		if ( $existing ) {
			$ids[ $page[0] ] = $existing->ID;
			continue;
		}
		$ids[ $page[0] ] = wp_insert_post( array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_name'    => $page[0],
			'post_title'   => $page[1],
			'post_content' => wp_slash( krs_pattern_markup( $page[2] ) ),
			'menu_order'   => $i,
		) );
	}
	// Privacy Policy and Terms stay drafts until the client supplies real text.
	foreach ( array( array( 'privacy-policy', 'Privacy Policy' ), array( 'terms', 'Terms' ) ) as $legal ) {
		if ( ! get_page_by_path( $legal[0] ) ) {
			wp_insert_post( array( 'post_type' => 'page', 'post_status' => 'draft', 'post_name' => $legal[0], 'post_title' => $legal[1] ) );
		}
	}
	if ( ! empty( $ids['home'] ) && ! is_wp_error( $ids['home'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $ids['home'] );
	}
}

function krs_seed_entries() {
	foreach ( array( 'Coming Soon', 'Published' ) as $term ) {
		if ( ! term_exists( $term, 'krs_book_status' ) ) {
			wp_insert_term( $term, 'krs_book_status' );
		}
	}
	$sets = array(
		'krs_book'     => array(
			array( 'Lessons Made Relevant for You!', "A developing collection of biblical lessons designed to help readers understand God's Word and apply His truth to everyday life.", 'Coming Soon' ),
			array( "Let's Be Honest About Marriage", 'A practical, biblical conversation about marriage, relationships, truth, and growth.', 'Coming Soon' ),
		),
		'krs_topic'    => array(
			array( 'Knowing Jesus', '' ),
			array( 'Hearing the Holy Spirit', '' ),
			array( 'Truth & Freedom', '' ),
		),
		'krs_resource' => array(
			array( 'Teaching Notes', 'Companion notes and Scripture references for selected teachings.' ),
			array( 'Bible Studies', 'Focused studies for personal or group use.' ),
			array( 'Prayer Resources', 'Prayer guides and Spirit-led resources as they become available.' ),
		),
	);
	foreach ( $sets as $type => $rows ) {
		if ( get_posts( array( 'post_type' => $type, 'post_status' => 'any', 'numberposts' => 1, 'fields' => 'ids' ) ) ) {
			continue;
		}
		foreach ( $rows as $i => $row ) {
			$content = $row[1] ? '<!-- wp:paragraph --><p>' . esc_html( $row[1] ) . '</p><!-- /wp:paragraph -->' : '';
			$id      = wp_insert_post( array(
				'post_type'    => $type,
				'post_status'  => 'publish',
				'post_title'   => $row[0],
				'post_content' => wp_slash( $content ),
				'menu_order'   => $i + 1,
			) );
			if ( 'krs_book' === $type && $id && ! is_wp_error( $id ) ) {
				wp_set_object_terms( $id, $row[2], 'krs_book_status' );
			}
		}
	}
}

add_action( 'after_switch_theme', function () {
	if ( get_option( 'krs_seeded' ) ) {
		return;
	}
	krs_seed_entries();
	krs_seed_pages();

	if ( in_array( get_option( 'blogdescription' ), array( '', 'Just another WordPress site' ), true ) ) {
		update_option( 'blogdescription', 'Know Jesus. Hear the Holy Spirit. Walk in His Truth.' );
	}
	update_option( 'krs_seeded', KRS_VERSION );
	flush_rewrite_rules();
} );
