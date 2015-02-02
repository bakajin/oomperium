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
	<!-- load text and image clipper -->
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:3px;"></div>
	<div class="lW" style="width:1px;"></div>
	<div class="rW" style="width:24px;"></div>
	<div class="lW" style="width:1px;"></div>
	<div class="rW" style="width:46px;"></div>
	<div class="lW" style="width:1px;"></div>
	<div class="rW" style="width:67px;"></div>
	<div class="lW" style="width:1px;"></div>
	<div class="rW" style="width:88px;"></div>
	<div class="lW" style="width:1px;"></div>
	<div class="rW" style="width:109px;"></div>
	<div class="lW" style="width:1px;"></div>
	<div class="rW" style="width:130px;"></div>
	<div class="lW" style="width:1px;"></div>
	<div class="rW" style="width:152px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:173px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:194px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:215px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:236px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:258px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:279px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:300px;"></div>
	<div class="lW" style="width:0px;"></div>
	<div class="rW" style="width:0px;"></div>
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
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php oomperium_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
