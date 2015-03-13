<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package oomperium
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<!-- Type kit definition of fonts -->
<script src="//use.typekit.net/qbz6cuj.js"></script>
<script>try{Typekit.load();}catch(e){}</script>
<?php wp_head(); ?>
<script>
	//shapeWrapper jQuery refactor
	jQuery(function($){
		//select all articles and loop through each
		$("article").each(function(){
			// find p elements get width and height and number of lines
				//lineNumber
			var lineNum = 0;

			var pWidth = $(this).width();
			var pHeight = 0;
				//check the first character in the p element to see what is in there. 
			var conCheck = '';

			$(this).children("div.entry-content").children("p").each(function(){
				//console.log("p-height: " + $(this).height());
				conCheck = $(this).html(); //str.charAt(0)
				conCheck = conCheck.charAt(0);
				switch(conCheck) {
					case '<':
							// do nothing when imagetag or non tekst html is found
							//console.log("found <");
							conCheck = '';
						break;
					case '&':
							// do nothing when non breaking space is found
							//console.log("found &");
							conCheck = '';
						break;
					default:
							//console.log("p-content:" + conCheck);
							lineNum += Math.floor($(this).height() / parseInt($(this).css("line-height").replace('px','')));
							pHeight += $(this).height(); 
						break;
				}
								
			});
			var str = '';
			/*
			console.log("article: " + $(this).attr("id"));
			console.log("			lines: " + lineNum);
			console.log("			width: " + pWidth);
			console.log("			height: " + pHeight);
			console.log("			p first char: " + conCheck);
			*/

			var factor = 0;
			var len = lineNum; // + (lineNum/2);
			for (var l = 0; l < len; l++) {
				// write divs left right to wrap text
				factor = Math.floor(100/len)*l;
				str += '<div style="float:left;clear:left;height:' + pHeight / lineNum + 'px;width:' + 0 + 'px"></div>'; //background:red;border:solid 2px green;
				str += '<div style="float:right;clear:right;height:' + pHeight / lineNum  + 'px;width:' + factor + '%"></div>'; //background:green;border:solid 2px red;
				
				console.log("				counter: " + l + " 100/l: " + (100/l) + " actual width: " + factor);
			}
			$(this).children("div.entry-content").first().before(str);
			
	});

});
</script>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'oomperium' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
	<div class="site-branding">
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>
		</div>
	<!-- OOMP custom header code, defined by inc/custom-header.php in functions.php -->
	<svg id="site-logo">
		<defs></defs>
	</svg>
	<img src="<?php header_image(); ?>" height="<?php echo get_custom_header()->height; ?>%" width="<?php echo get_custom_header()->width; ?>%" alt="logo" class="header-logo" />
		<nav id="site-navigation" class="main-navigation" role="navigation">
			<button class="menu-toggle"><?php _e( 'Primary Menu', 'oomperium' ); ?></button>
			<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
