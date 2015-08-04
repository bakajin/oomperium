<?php
/**
 * oomperium functions and definitions
 *
 * @package oomperium
 */

/** Try to set the PHP.ini upload sizes */
	@ini_set( 'upload_max_size' , '64M' );
	@ini_set( 'post_max_size', '64M');
	@ini_set( 'max_execution_time', '300' );

/**
 * Add theme customizer page to the wp-admin area
 * OOMP edit
 * add_theme_page($page_title, $menu_title, $capability, $menu_slug, $function)
 */

function oomp_customizer_menu() {
	add_theme_page('Customize', 'Customize', 'edit_theme_options', 'customize.php');
}
add_action('admin_menu', 'oomp_customizer_menu');

/**
 * Add individual custom sections to the theme customiser 
 */
function oomp_customizer($wp_customize) {
	$wp_customize->add_section(
		'site-colours',
		array(
			'title' => 'Site colour palet',
			'description' => 'site colours: colours for backgrounds, foreground, interactivity, links',
			)
		);
	$wp_customize->add_setting(
		'colour_one',
		array(
			'default' => '#FFFFFF',
			'sanitize_callback' => 'sanitize_hex_color',
			)
		);
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'colour-one',
			array(
				'label' => 'background colour',
				'section' => 'site-colours',
				'settings' => 'colour_one',
			)
		)
	);
	$wp_customize->add_setting(
		'colour_two',
		array(
			'default' => '#000000',
			'sanitize_callback' => 'sanitize_hex_color',
			)
		);
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'colour-two',
			array(
				'label' => 'foreground colour',
				'section' => 'site-colours',
				'settings' => 'colour_two',
			)
		)
	);
}
add_action( 'customize_register', 'oomp_customizer');

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 1280; /* 640 pixels */
}

if ( ! function_exists( 'oomperidev_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function oomperidev_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on oomperium, use a find and replace
	 * to change 'oomperidev' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'oomperidev', get_template_directory() . '/languages' );
	/*
	 * Add a custom header image 
	 * OOMP Edit
	 * args : $defaults = array('default-image'          => '',
	 *							'width'                  => 0,
	 *							'height'                 => 0,
	 *							'flex-height'            => false,
	 *							'flex-width'             => false,
	 *							'uploads'                => true,
	 *							'random-default'         => false,
	 *							'header-text'            => true,
	 *							'default-text-color'     => '',
	 *							'wp-head-callback'       => '',
	 *							'admin-head-callback'    => '',
	 *							'admin-preview-callback' => '',);
	 */
	$headerargs = array(
		'default-image' => get_template_directory_uri() . '/images/logo-oomp-2.0.svg',
		'flex-width'	=> true,
		'width'			=> 33,
		'flex-height'	=> true,
		'height'		=> 33,

		);
	add_theme_support( 'custom-header', $headerargs );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 * OOMP edit feature turned on for featured images
	 */
	//add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location. But we will create our own MOM below
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'oomperidev' ),
	) );

	
	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link', 'gallery',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'oomperidev_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // oomperidev_setup
add_action( 'after_setup_theme', 'oomperidev_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function oomperidev_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'oomperidev' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'oomperidev_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function oomperidev_scripts() {
	wp_enqueue_style( 'oomperidev-style', get_stylesheet_uri() );

	wp_enqueue_script( 'oomperidev-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

	wp_enqueue_script( 'oomperidev-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

}
add_action( 'wp_enqueue_scripts', 'oomperidev_scripts' );

/** OOMP custom scripts */
function oomperidev_custom_scripts() {
	//modernizr
	wp_register_script('modernizr', get_template_directory_uri() . '/js/modernizr.custom.19667.js');
	wp_enqueue_script('modernizr');

	// snap library script to animate svgs
	wp_register_script('snap-svg', get_template_directory_uri() . '/js/snap.svg.js');
	wp_enqueue_script('snap-svg');
	
	// header snap svg	
	wp_register_script('header-logo-snap', get_template_directory_uri() . '/js/header-logo-snap.js');
	wp_enqueue_script('header-logo-snap');

	// snap svg main menu header menu
	wp_register_script('main-menu-snap', get_template_directory_uri() . '/js/main-menu-snap.js');
	wp_enqueue_script('main-menu-snap');

	// snap svg post snap
	wp_register_script('post-snap', get_template_directory_uri() . '/js/post-snap.js');
	wp_enqueue_script('post-snap');

	// snap svg social snap footer menu
	wp_register_script('social-menu-snap', get_template_directory_uri() . '/js/social-menu-snap.js');
	wp_enqueue_script('social-menu-snap');

	// script to clip paragraphs
	//wp_register_script('shapewrapper', get_template_directory_uri() . '/js/shapewrapper.js');
	//wp_enqueue_script('shapewrapper');

	//wp_register_script( 'bacon', get_template_directory_uri() . '/js/bacon.jquery.js');
	//wp_enqueue_script('bacon');
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );

}
add_action('wp_enqueue_scripts','oomperidev_custom_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';
