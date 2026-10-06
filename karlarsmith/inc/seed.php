<?php
/**
 * Starter content. Pages and entries are only created when missing;
 * existing ones are never replaced here (see content.php for the one-time refresh).
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
		array( 'teach', 'Teaching', 'page-teach' ),
		array( 'write', 'Books & Writing', 'page-write' ),
		array( 'speak', 'Speaking', 'page-speak' ),
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
	// Privacy Policy and Terms: published with the drafted text; empty existing drafts are filled in.
	foreach ( array( array( 'privacy-policy', 'Privacy Policy', 'page-privacy' ), array( 'terms', 'Terms', 'page-terms' ) ) as $legal ) {
		$existing = get_page_by_path( $legal[0] );
		if ( ! $existing ) {
			wp_insert_post( array( 'post_type' => 'page', 'post_status' => 'publish', 'post_name' => $legal[0], 'post_title' => $legal[1], 'post_content' => wp_slash( krs_pattern_markup( $legal[2] ) ) ) );
		} elseif ( '' === trim( $existing->post_content ) ) {
			wp_update_post( array( 'ID' => $existing->ID, 'post_status' => 'publish', 'post_content' => wp_slash( krs_pattern_markup( $legal[2] ) ) ) );
		}
	}
	if ( ! empty( $ids['home'] ) && ! is_wp_error( $ids['home'] ) && 'page' !== get_option( 'show_on_front' ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $ids['home'] );
	}
}

/** Entries from the client's reference files: array( post type => rows of title, description, status ). */
function krs_entry_defs() {
	return array(
		'krs_book'     => array(
			array( 'Lessons Made Relevant for You!', "A developing collection of biblical lessons designed to help readers understand God's Word and apply His truth to everyday life.", 'Coming Soon' ),
			array( "Let's Be Honest About Marriage", 'A practical, biblical conversation about marriage, relationships, truth, and growth.', 'Coming Soon' ),
			array( "From Karla's Desk", 'Short teachings, reflections, and biblical insights will be added as the written library grows.', 'Reflections' ),
		),
		'krs_topic'    => array(
			array( 'Knowing Jesus', 'Teaching that draws believers into a deeper relationship with Christ.' ),
			array( 'Hearing the Holy Spirit', 'Biblical guidance for recognizing and responding to the Holy Spirit.' ),
			array( 'Truth & Freedom', "Understanding the truth of God's Word and how it dismantles bondage and deception." ),
			array( 'Spiritual Maturity', 'Growing in obedience, discernment, character, and consistent faith.' ),
			array( 'Relationships', 'Biblical truth made relevant to marriage, family, and relationships.' ),
			array( 'Purpose & Leadership', 'Equipping people to serve with humility and walk in God-given purpose.' ),
		),
		'krs_resource' => array(
			array( 'Teaching Notes', 'Companion notes and Scripture references for selected teachings.' ),
			array( 'Bible Studies', 'Focused studies for personal or group use.' ),
			array( 'Prayer Resources', 'Prayer guides and Spirit-led resources as they become available.' ),
		),
	);
}

/** Adds any missing entries and fills empty descriptions. Never overwrites text that exists. */
function krs_seed_entries() {
	foreach ( array( 'Coming Soon', 'Published', 'Reflections' ) as $term ) {
		if ( ! term_exists( $term, 'krs_book_status' ) ) {
			wp_insert_term( $term, 'krs_book_status' );
		}
	}
	foreach ( krs_entry_defs() as $type => $rows ) {
		foreach ( $rows as $i => $row ) {
			$found = get_posts( array( 'post_type' => $type, 'post_status' => 'any', 'title' => $row[0], 'numberposts' => 1 ) );
			$markup = '<!-- wp:paragraph --><p>' . esc_html( $row[1] ) . '</p><!-- /wp:paragraph -->';
			if ( $found ) {
				$id = $found[0]->ID;
				if ( '' === trim( $found[0]->post_content ) ) {
					wp_update_post( array( 'ID' => $id, 'post_content' => wp_slash( $markup ) ) );
				}
			} else {
				$id = wp_insert_post( array(
					'post_type'    => $type,
					'post_status'  => 'publish',
					'post_title'   => $row[0],
					'post_content' => wp_slash( $markup ),
					'menu_order'   => $i + 1,
				) );
			}
			if ( 'krs_book' === $type && $id && ! is_wp_error( $id ) && ! has_term( '', 'krs_book_status', $id ) ) {
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
