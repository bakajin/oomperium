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
	<?php wp_nav_menu( array('menu' => 'social', 'container' => false )); ?>
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
		
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
