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
	$content_width = 640; /* pixels */
}

if ( ! function_exists( 'oomperium_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function oomperium_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on oomperium, use a find and replace
	 * to change 'oomperium' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'oomperium', get_template_directory() . '/languages' );
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
		'default-image' => get_template_directory_uri() . '/images/oomp-logo.svg',
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
		'primary' => __( 'Primary Menu', 'oomperium' ),
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
	add_theme_support( 'custom-background', apply_filters( 'oomperium_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // oomperium_setup
add_action( 'after_setup_theme', 'oomperium_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function oomperium_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'oomperium' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'oomperium_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function oomperium_scripts() {
	wp_enqueue_style( 'oomperium-style', get_stylesheet_uri() );

	wp_enqueue_script( 'oomperium-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

	wp_enqueue_script( 'oomperium-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

}
add_action( 'wp_enqueue_scripts', 'oomperium_scripts' );

/** OOMP custom scripts */
function oomperium_custom_scripts() {
	// script to animate svgs
	wp_register_script('snap-svg', get_template_directory_uri() . '/js/snap.svg.js');
	wp_enqueue_script('snap-svg');

	// script to clip paragraphs
	//wp_register_script('shapewrapper', get_template_directory_uri() . '/js/shapewrapper.js');
	//wp_enqueue_script('shapewrapper');

	//wp_register_script( 'bacon', get_template_directory_uri() . '/js/bacon.jquery.js');
	//wp_enqueue_script('bacon');

}
add_action('wp_enqueue_scripts','oomperium_custom_scripts');

/* OOMP lets create our own menu MOM from scratch to introduce snap svg */
	// custom menu example @ http://digwp.com/2011/11/html-formatting-custom-menus/
function custom_nav_menus() {
	$menu_name = 'primary'; // specify custom menu slug
	if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
		$menu = wp_get_nav_menu_object($locations[$menu_name]);
		$menu_items = wp_get_nav_menu_items($menu->term_id);

		$menu_list = '<nav>' . "\n";
		$menu_list .= "\t\t\t" . '<svg id="svg-' . $menu_name .'">' . "\n\t\t\t\t\t" . '<defs></defs>' . "\n\t\t\t" . '</svg>';
		$menu_list .= "\t\t\t". '</nav>' ."\n";

		$menu_script = '<script>';
		$menu_script .= "\n\t\t\t";
		$menu_script .= 'var sNav = Snap("#svg-' .  $menu_name . '");';
		$menu_script .= 'sNav.attr({ viewBox: "0 0 695 100" });';
		$menu_script .= "\n\t\t\t";
		$menu_script .= 'var sButton;';
		$menu_script .= "\n\t\t\t";
		$menu_script .= 'Snap.load("' . get_stylesheet_directory_uri() . '/images/oomp-button.svg"' . ', function ( loadedItem ) {';
		$menu_script .= "\n\t\t\t\t\t\t";
		$menu_script .= 'g = loadedItem.select("#oomp-button");'; //g
		$menu_script .= "\n\t\t\t\t\t\t";
		$menu_script .= 'sButton = g;';//sNav.append (loadedItem); });';
		$menu_script .= "\n\t\t\t\t\t\t";
		$menu_script .= 'iterateMenu();';
		$menu_script .= "\n\t\t\t\t\t\t";
		$menu_script .= '});';
		$menu_script .= "\n\t\t\t";
		//$menu_script .= 'buttonClone = Snap.select("#oomp-button");';
		$menu_script .= 'function iterateMenu(){';
		$menu_script .= "\n\t\t\t\t\t\t";
		foreach ((array) $menu_items as $key => $menu_item) {
			$title = $menu_item->title;
			$url = $menu_item->url;
			//$menu_script .= 'buttonClone' . $key .' = buttonClone.clone();';
			$menu_script .= 'buttonClone' . $key .' = sButton.clone();';
			$menu_script .= "\n\t\t\t\t\t\t";
			$menu_script .= 'buttonClone' . $key .'.node = sButton.node.cloneNode(true);';
			$menu_script .= "\n\t\t\t\t\t\t";
			$menu_script .= 'sNav.append(buttonClone'. $key .');';
			$menu_script .= "\n\t\t\t\t\t\t";
			//$menu_script .= 'buttonClone' . $key .'.transform("t240,0");';
			//$menu_script .= "\n\t\t\t\t\t\t";
			//$menu_script .= "\t\t\t\t\t". '<a xlink:href="'. $url .'">'. $title .'</a>' ."\n";
		}
		$menu_script .= "\n\t\t\t\t\t\t";
		$menu_script .= '}';
		$menu_script .= '</script>';
		$menu_list .= $menu_script;
		
	} else {
		// $menu_list = '<!-- no list defined -->';
		//console.log
	}
	echo $menu_list;
}
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
