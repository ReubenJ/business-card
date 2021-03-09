<?php
/**
 * Plugin Name:     Business Card
 * Description:     A WP Gutenberg block that displays a photo, name, website, phone number, and address.
 * Version:         0.1.0
 * Author:          Reuben Gardos Reid
 * License:         MIT
 * Text Domain:     business-card
 *
 * @package         reubenj
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function reubenj_business_card_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "reubenj/business-card" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'reubenj-business-card-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'reubenj-business-card-block-editor', 'business-card');

	$editor_css = 'build/index.css';
	wp_register_style(
		'reubenj-business-card-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'reubenj-business-card-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'reubenj/business-card',
		array(
			'editor_script' => 'reubenj-business-card-block-editor',
			'editor_style'  => 'reubenj-business-card-block-editor',
			'style'         => 'reubenj-business-card-block',
		)
	);
}
add_action( 'init', 'reubenj_business_card_block_init' );
