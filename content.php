<?php
/**
 * @package oomperium
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( sprintf( '<h1 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>

		<?php if ( 'post' == get_post_type() ) : ?>
		<div class="entry-meta">
			<?php oomperium_posted_on(); ?>
		</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->
	<!-- load text wrapper -->
	<!-- line height 
	<script type="text/javascript">
		shapeWrapper("post-<?php the_ID(); ?>","18","0,0,0|5,0,5|10,0,10|15,0,15|20,0,20|25,0,25|30,0,30|35,0,35|40,0,40|45,0,45|50,0,50|55,0,55|60,0,60|65,0,65|70,0,70|75,0,75|80,0,80|85,0,85|90,0,90|95,0,95|100,0,100|");
	</script>
	-->
	<div class="entry-content">
	<svg id="svg-post-<?php the_ID(); ?>">
		<defs></defs>
	</svg>
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
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php oomperium_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
