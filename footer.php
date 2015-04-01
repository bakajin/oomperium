<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package oomperium
 */
?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
	<svg id="svg-social-menu">
		<defs></defs>
	</svg>
	<hr/>
	<?php wp_nav_menu( array('menu' => 'social' )); ?>
		<ul class="footer-data">
			<li><a href="#">&copy; 2015</a></li>
			<li><a href="#">Olivier Oskamp Media Productions</a></li>
			<li><a href="#">Recht Boomssloot 33B</a></li>
			<li><a href="#">1011CS Amsterdam</a></li>
			<li><a href="#">+316 29407864</a></li>
		</ul>
		<div class="site-info">
			<a href="<?php echo esc_url( __( 'http://wordpress.org/', 'oomperium' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'oomperium' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( __( 'Theme: %1$s by %2$s.', 'oomperium' ), 'oomperium', '<a href="http://oomp.nl/" rel="designer">OOMP</a>' ); ?>
		</div><!-- .site-info -->
		<script>
			//load social buttons
			var socialNav = Snap("#svg-social-menu");
				socialNav.attr({ viewBox: "0 0 695 100" });
			
			var socialLoadList = array("facebook", "twitter", "linkedin", "vimeo", "skype");
			var socialButton;
				Snap.load("<?php echo get_stylesheet_directory_uri() . '/images/social-facebook.svg'; ?>", 
						function ( loadedItem ) {
													g = loadedItem.select("#oomp-button"); //g
													sButton = g;';//sNav.append (loadedItem); });';
													iterateMenu();
	
												});
						function iterateMenu(){
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
		</script>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
