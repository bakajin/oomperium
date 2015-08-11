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
			<?php oomperidev_posted_on(); ?>
		</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->
	
	<div class="entry-content">
		<?php
			/* translators: %s: Name of current post */
			/*
			the_excerpt(sprintf(
				__( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'oomperidev' ), 
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			));
*/
			the_content( sprintf(
				__( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'oomperidev' ), 
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			) );
		?>

		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'oomperidev' ),
				'after'  => '</div>',
			) );
		?>
		<!-- Some custom gallery controls from snap -->
		<svg class="svg-gallery-controls" id="svg-gallery-controls-<?php the_ID(); ?>">
			<defs></defs>
		</svg>
		<!-- call a snap svg canvas for interactive animated svg masking -->
		<svg class="svg-post" id="svg-post-<?php the_ID(); ?>">
			<defs></defs>
		</svg>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php oomperidev_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
