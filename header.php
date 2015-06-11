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
<!-- Set the path to the theme base dir -->
<script>
	var themePath = "<?php echo get_stylesheet_directory_uri() . '/images/'; ?>"; 
</script>
<!-- Type kit definition of fonts -->
<script src="//use.typekit.net/qbz6cuj.js"></script>
<script>try{Typekit.load();}catch(e){}</script>
<?php wp_head(); ?>
<!-- OOMP custom nav menu code !-->
<!-- send vars to external javascript files -->
<script>
	<?php 
	//lets send the navigation array to javascript
	// Get the nav menu based on $menu_name (same as 'theme_location' or 'menu' arg to wp_nav_menu)
    // This code based on wp_nav_menu's code to get Menu ID from menu slug

    $menu_name = 'primary';

    if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
	$menu = wp_get_nav_menu_object( $locations[ $menu_name ] );

	$menu_items = wp_get_nav_menu_items($menu->term_id);
		//print_r($menu_items);
		
		$menuJsVars = "var menuItems = [";
		foreach($menu_items as $menu_item){

			// the items for javascript var
					//print_r($menu_item->title);
					//this value is 0 for main top level menu items
					//print_r($menu_item->menu_item_parent);
					//print_r($menu_item->url);
					//print_r($menu_item->guid);
					$menuJsVars .= '{title: "' . $menu_item->title . '", parent: "' . $menu_item->menu_item_parent . '", url: "'. $menu_item->url .'", guid:"'. $menu_item->guid .'"}, ';
		}
	
    } else {
		// fail
	}
	$menuJsVars .= '{end: ""}];';
	echo $menuJsVars;
	?>
	/* send the post ids array object to the post-snap in content.php */ 
	var postIDs = new Array();

	//shapeWrapper jQuery refactor *deprecate*
/* 
	jQuery(function($){
		//select all articles and loop through each
		$("article").each(function(){
			// find p elements get width and height and number of lines
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
*/

			/*
			console.log("article: " + $(this).attr("id")); console.log("			lines: " + lineNum); console.log("			width: " + pWidth); console.log("			height: " + pHeight); 	console.log("			p first char: " + conCheck);
			*/
/*
			var factor = 0;
			var len = lineNum; // + (lineNum/2);
			for (var l = 0; l < len; l++) {
				// write divs left right to wrap text
				factor = Math.floor(100/len)*l;
				// oomp turned it off
				//str += '<div style="float:left;clear:left;height:' + pHeight / lineNum + 'px;width:' + 0 + 'px"></div>'; //background:red;border:solid 2px green;
				//str += '<div style="float:right;clear:right;height:' + pHeight / lineNum  + 'px;width:' + factor + '%"></div>'; //background:green;border:solid 2px red;
				
				//console.log("				counter: " + l + " 100/l: " + (100/l) + " actual width: " + factor);
			}
			//$(this).children("div.entry-content").first().before(str);
			
	});

});
*/
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

	<div class="main-navigation" id="menu">
		<button class="menu-toggle"></button>
		<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false ) ); ?>
		<svg id="svg-menu">
			<defs></defs>
		</svg>
	</div>	
	</header><!-- #masthead -->
	
	<script>
		//snap svg for logo and its background
		Snap.plugin( function( Snap, Element, Paper, global ) {
        var fragmentList = new Array, fragLoadedCount = 0;
       
        function addLoadedFrags( list ) { // This is called once all the loaded frags are complete
                for( var count = 0; count < list.length; count++ ) {
                        s.append( fragmentList[ count ] );
                        console.log("header load: " + count);
                        switch(count) {
                        	case 0:
                        			//logoGroup.append(fragmentList[ count ]);
                        	break;
                        	case 1:
                        			//bgGroup.append(fragmentList[ count ]);
                        			//bgGroup.transform('s3,0,0');
                        			buildLayout();
                        	break;
                        	default:
                        		//do nothing
                        	break;
                        	
                        }
                }
        }

        Paper.prototype.loadFilesDisplayOrdered = function( list ) {
                var image, fragLoadedCount = 0, listLength = list.length;

                        for( var count = 0; count < listLength; count++ ) {
                                (function() {
                                        var whichEl = count;
                                        image = Snap.load( list[ whichEl ], function ( loadedFragment ) {
                                                                       fragLoadedCount++;
                                                                        fragmentList[ whichEl ] = loadedFragment;
                                                                        if( fragLoadedCount >= listLength ) {
                                                                                addLoadedFrags( fragmentList );
                                                                        }
                                                                } );
                                })();

                        }

        };


});

	var s = Snap("#site-logo");
		// setting the viewbox for responsive love
		s.attr({ viewBox: "0 0 240 480" });
		var logoGroup = s.group();
     	var bgGroup = s.group();
	var myLoadList = [ "<?php echo get_stylesheet_directory_uri() . '/images/oomp_logo-bg.svg'; ?>", "<?php header_image(); ?>" ];
        s.loadFilesDisplayOrdered( myLoadList );

        function buildLayout() {
       			var logo = Snap.select('#oomp-logo');
        		var background = Snap.select('#bg-elem');
        			background.transform('s2'); 	
        }
    </script>

	<div id="content" class="site-content">
