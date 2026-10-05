<?php
defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	$common = array(
		'public'              => false,
		'publicly_queryable'  => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_rest'        => true,
		'exclude_from_search' => true,
		'has_archive'         => false,
		'rewrite'             => false,
		'supports'            => array( 'title', 'editor', 'page-attributes' ),
	);

	register_post_type( 'krs_book', array_merge( $common, array(
		'labels'        => array(
			'name'          => __( 'Books', 'karlarsmith' ),
			'singular_name' => __( 'Book', 'karlarsmith' ),
			'add_new_item'  => __( 'Add New Book', 'karlarsmith' ),
			'edit_item'     => __( 'Edit Book', 'karlarsmith' ),
		),
		'menu_icon'     => 'dashicons-book-alt',
		'menu_position' => 21,
	) ) );

	register_post_type( 'krs_topic', array_merge( $common, array(
		'labels'        => array(
			'name'          => __( 'Teaching Topics', 'karlarsmith' ),
			'singular_name' => __( 'Teaching Topic', 'karlarsmith' ),
			'add_new_item'  => __( 'Add New Teaching Topic', 'karlarsmith' ),
			'edit_item'     => __( 'Edit Teaching Topic', 'karlarsmith' ),
		),
		'menu_icon'     => 'dashicons-welcome-learn-more',
		'menu_position' => 22,
	) ) );

	register_post_type( 'krs_resource', array_merge( $common, array(
		'labels'        => array(
			'name'          => __( 'Resource Categories', 'karlarsmith' ),
			'singular_name' => __( 'Resource Category', 'karlarsmith' ),
			'add_new_item'  => __( 'Add New Resource Category', 'karlarsmith' ),
			'edit_item'     => __( 'Edit Resource Category', 'karlarsmith' ),
		),
		'menu_icon'     => 'dashicons-portfolio',
		'menu_position' => 23,
	) ) );

	register_taxonomy( 'krs_book_status', 'krs_book', array(
		'labels'             => array(
			'name'          => __( 'Book Status', 'karlarsmith' ),
			'singular_name' => __( 'Book Status', 'karlarsmith' ),
		),
		'public'             => false,
		'publicly_queryable' => false,
		'show_ui'            => true,
		'show_in_rest'       => true,
		'show_admin_column'  => true,
		'hierarchical'       => true,
		'rewrite'            => false,
	) );
} );
