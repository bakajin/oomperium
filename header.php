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
<!-- google maps api for footer -->
	<style type="text/css">
    	html, body, #map-canvas { height: 100%; margin: 0; padding: 0;}
    </style>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDenmsexxZoYPEwOpdIp1zCMl3mLo60J5U">
    </script>
    <script type="text/javascript">
      function initialize() {
      	jQuery("#map-canvas").css({ 
      		"width" : (window.innerWidth + "px"),
      		"height" : "600px"
      })
      	var mapstyle = [
  				{
    				featureType: 'landscape.man_made',
    				elementType: 'geometry.fill',
    				stylers: [
      					{ color: '#faeeee' }
    				]
  				},{
    				featureType: 'water',
    				elementType: 'geometry.fill',
    				stylers: [
      					{ color: '#edf0f5' }
    				]
  				},{
    				featureType: 'road.local',
    				stylers: [
      					{ color: '#ffffff' }
    				]
  				},{
    				featureType: 'transit.line',
    				stylers: [
      					{ color: '#D4C978' },
      					{ lightness: 56 }
    				]
  				},{
    				featureType: 'poi.park',
    				elementType: 'geometry.fill',
    				stylers: [
      					{ color: '#4ca984' },
      					{ lightness: 56 }
    				]	
  				}
			];

        var mapOptions = {
          center: { lat: 52.3670513, lng: 4.9024593}, 
          zoom: 15,
          styles : mapstyle,
          zoomControl: true,
    	  zoomControlOptions: {
        		position: google.maps.ControlPosition.RIGHT_TOP
    		}
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var marker = new google.maps.Marker({
  			position: { lat: 52.3728883, lng: 4.9024593},
  			map: map,
			}); //icon: iconBase + 'schools_maps.png'
      
      }
      	
      google.maps.event.addDomListener(window, 'load', initialize);

      /* google analytics */
      
  		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  		ga('create', 'UA-74607624-1', 'auto');
  		ga('send', 'pageview');

    </script>
<!-- Set the path to the theme base dir -->
<script>
		pageType = '<?php body_class(); ?>';
		themePath = "<?php echo get_stylesheet_directory_uri() . '/images/'; ?>"; 
		headerImg = "<?php header_image(); ?>";
	var logoImg;

	// lets find out which browser is being used 
		// object name, version, engine
	var browser = {name : "", version : "", engine : ""};
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

    //$menu_name = 'main-navigation';
    $menu_name = 'primary';
    $menuJsVars = "var menuItems = [";
    if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
		$menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
		//print_r(count($menu));
		$menu_items = wp_get_nav_menu_items($menu->term_id);
		
		foreach($menu_items as $menu_item){
			// the items for javascript var
					//this value is 0 for main top level menu items
					//print_r($menu_item->menu_item_parent); //print_r($menu_item->url); //print_r($menu_item->guid);
					$menuJsVars .= '{idx: "' . $menu_item->ID . '", title: "' . $menu_item->title . '", parent: "' . $menu_item->menu_item_parent . '", url: "'. $menu_item->url .'", guid:"'. $menu_item->guid .'"}, ';
		}
	
    } else {
		// fail
		$menuJsVars .= '{fail: "' . $menu_name . '"}, ';
	}
	$menuJsVars .= '{end: ""}];';
	echo $menuJsVars;
	?>
	
</script>
</head>

<body <?php body_class(); ?>>
<!-- header.php-->
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'oomperidev' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
	<div class="site-branding">
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>
		</div>
	<!-- OOMP custom header code, defined by inc/custom-header.php in functions.php -->
	<svg id="site-logo">
		<defs></defs>
	</svg>
	<script>
		// fire a load request for the post controls object (cloned later)
			loadPostControls();
		//get the logo for the header
			headerLogoInit();
	</script>
	<div class="main-navigation" id="menu">
		<button class="menu-toggle"></button>
		<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false ) ); ?>
		<svg id="svg-menu">
			<defs></defs>
		</svg>
		<script>
			menuInit("#svg-menu");
		</script>
	</div>	
	</header><!-- #masthead -->

	<div id="content" class="site-content">
