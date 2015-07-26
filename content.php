<?php
/**
 * @package oomperium
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<script>
			postIDs.push(<?php the_ID(); ?>);
		</script>
		<?php the_title( sprintf( '<h1 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>

		<?php if ( 'post' == get_post_type() ) : ?>
		<div class="entry-meta">
			<?php oomperium_posted_on(); ?>
		</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->
	
	<div class="entry-content">
		<?php
			/* translators: %s: Name of current post */
			the_content( sprintf(
				__( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'oomperium' ), 
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			) );
		?>

		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'oomperium' ),
				'after'  => '</div>',
			) );
		?>
		<!-- call a snap svg canvas for interactive animated svg masking -->
		<svg class="svg-post" id="svg-post-<?php the_ID(); ?>">
			<defs></defs>
		</svg>
		<svg class="svg-gallery-controls" id="svg-gallery-controls-<?php the_ID(); ?>">
			<defs></defs>
		</svg>
		<script>
		/* snap svg script */
		/* clip the post image */
			//var sClip = Snap("#svg-post-<?php the_ID(); ?>");
			//var g = sClip.group();
			//var tux = Snap.load("<?php echo get_stylesheet_directory_uri() . '/images/clip-diagonal-left-right.svg'; ?>", function ( loadedFragment ) {
              //                                  g.append( loadedFragment );
                //                                g.hover( hoverover, hoverout );
                  //                              g.text(300,100, 'hover over me');
                    //                    } );

			//var hoverover = function() { g.animate({ transform: 's2r45,150,150' }, 1000, mina.bounce ) };
			//var hoverout = function() { g.animate({ transform: 's1r0,150,150' }, 1000, mina.bounce ) };
		</script>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php oomperium_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
