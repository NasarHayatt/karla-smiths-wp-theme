<?php
/**
 * Forms: Contact Form 7 forms are created automatically (once the plugin is
 * active) and rendered through [krs_form form="connect|speak|newsletter"].
 */
defined( 'ABSPATH' ) || exit;

function krs_field( $tag, $label, $type = 'text', $extra = '' ) {
	return '<div class="krs-field"><label><span class="screen-reader-text">' . esc_html( $label ) . '</span>[' . $type . ' ' . $tag . ' ' . $extra . ' placeholder "' . esc_attr( $label ) . '"]</label></div>';
}

function krs_honeypot() {
	return '<div class="krs-hp" aria-hidden="true"><label>Leave this field empty<input type="text" name="krs_website" tabindex="-1" autocomplete="off"></label></div>';
}

function krs_form_definitions() {
	$host = wp_parse_url( home_url(), PHP_URL_HOST );
	$from = '[_site_title] <wordpress@' . $host . '>';

	return array(
		'connect'    => array(
			'title'   => 'KRS Connect',
			'form'    => '<div class="krs-form-row">' . krs_field( 'your-name', 'Name', 'text*', 'autocomplete:name' ) . krs_field( 'your-email', 'Email', 'email*', 'autocomplete:email' ) . '</div>'
				. krs_field( 'your-subject', 'Subject', 'text*' )
				. krs_field( 'your-message', 'Message', 'textarea*' )
				. krs_honeypot()
				. '<div class="krs-submit">[submit "Send Message"]</div>',
			'subject' => '[_site_title] Connect: [your-subject]',
			'body'    => "From: [your-name] <[your-email]>\nSubject: [your-subject]\n\nMessage:\n[your-message]",
			'reply'   => '[your-email]',
		),
		'speak'      => array(
			'title'   => 'KRS Speaking Inquiry',
			'form'    => krs_field( 'your-name', 'Name', 'text*', 'autocomplete:name' )
				. krs_field( 'your-org', 'Organization / Ministry', 'text*', 'autocomplete:organization' )
				. '<div class="krs-form-row">' . krs_field( 'your-email', 'Email', 'email*', 'autocomplete:email' ) . krs_field( 'your-phone', 'Phone (optional)', 'tel', 'autocomplete:tel' ) . '</div>'
				. krs_field( 'your-message', 'Tell me about your event', 'textarea*' )
				. krs_honeypot()
				. '<div class="krs-submit">[submit "Send Speaking Inquiry"]</div>',
			'subject' => '[_site_title] Speaking inquiry: [your-org]',
			'body'    => "Name: [your-name]\nOrganization / Ministry: [your-org]\nEmail: [your-email]\nPhone: [your-phone]\n\nAbout the event:\n[your-message]",
			'reply'   => '[your-email]',
		),
		'newsletter' => array(
			'title'   => 'KRS Stay Connected',
			'form'    => '<div class="krs-form-row">' . krs_field( 'first-name', 'First Name', 'text*', 'autocomplete:given-name' ) . krs_field( 'your-email', 'Email Address', 'email*', 'autocomplete:email' ) . '</div>'
				. krs_honeypot()
				. '<div class="krs-submit">[submit "Stay Connected"]</div>',
			'subject' => '[_site_title] Stay Connected signup: [first-name]',
			'body'    => "New Stay Connected request.\n\nFirst name: [first-name]\nEmail: [your-email]",
			'reply'   => '[your-email]',
		),
		'from'       => $from,
	);
}

// Create the forms once Contact Form 7 exists. Safe to run repeatedly.
add_action( 'admin_init', function () {
	if ( ! class_exists( 'WPCF7_ContactForm' ) || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$ids   = get_option( 'krs_form_ids', array() );
	$defs  = krs_form_definitions();
	$from  = $defs['from'];
	$dirty = false;

	foreach ( array( 'connect', 'speak', 'newsletter' ) as $key ) {
		if ( ! empty( $ids[ $key ] ) && 'wpcf7_contact_form' === get_post_type( $ids[ $key ] ) && 'trash' !== get_post_status( $ids[ $key ] ) ) {
			continue;
		}
		$d             = $defs[ $key ];
		$cf            = WPCF7_ContactForm::get_template( array( 'title' => $d['title'] ) );
		$props         = $cf->get_properties();
		$props['form'] = $d['form'];
		$props['mail'] = array_merge( $props['mail'], array(
			'subject'            => $d['subject'],
			'sender'             => $from,
			'body'               => $d['body'],
			'recipient'          => '[_site_admin_email]',
			'additional_headers' => 'Reply-To: ' . $d['reply'],
			'use_html'           => false,
			'exclude_blank'      => true,
		) );
		$cf->set_properties( $props );
		$cf->save();
		$ids[ $key ] = $cf->id();
		$dirty       = true;
	}
	if ( $dirty ) {
		update_option( 'krs_form_ids', $ids );
	}
} );

add_shortcode( 'krs_form', function ( $atts ) {
	$atts = shortcode_atts( array( 'form' => '' ), $atts, 'krs_form' );
	$ids  = get_option( 'krs_form_ids', array() );
	if ( empty( $ids[ $atts['form'] ] ) ) {
		if ( current_user_can( 'edit_pages' ) ) {
			return '<p><em>Form not ready: install and activate Contact Form 7, then open any wp-admin page once.</em></p>';
		}
		return '';
	}
	return do_shortcode( '[contact-form-7 id="' . (int) $ids[ $atts['form'] ] . '" html_class="krs-form"]' );
} );

// Honeypot: any value in the hidden field marks the submission as spam.
add_filter( 'wpcf7_spam', function ( $spam ) {
	if ( ! empty( $_POST['krs_website'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return true;
	}
	return $spam;
} );
