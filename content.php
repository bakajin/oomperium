<?php
/**
 * @package oomperium
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
	<!-- content.php -->
		<script>
			postIDs.push(<?php the_ID(); ?>);
		</script>

		<?php 
			the_title( sprintf( '<h1 class="entry-title"><a href="%s" rel="ibase_blob_open(link_identifier, blob_id)okmark">', esc_url( get_permalink() ) ), '</a></h1>' ); 
			?>
		
		<?php if ( 'post' == get_post_type() ) : ?>
		<div class="entry-meta">
			<?php oomperium_posted_on(); ?>
		</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->
	
	<div class="entry-content">
		<!-- call a snap svg canvas for interactive animated svg masking -->
		<!-- Some custom gallery controls from snap -->
		<svg class="svg-gallery-controls" id="svg-gallery-controls-<?php the_ID(); ?>">
			<defs></defs>
		</svg>

		<?php
			/* translators: %s: Name of current post */
			/*
			the_excerpt(sprintf(
				__( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'oomperidev' ), 
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			));
*/
			the_content( sprintf(
				__( 'more %s <span class="meta-nav">&rarr;</span>', 'oomperidev' ), 
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			) );

			$galleryArray = get_post_gallery_ids($post->ID); 
			echo '<div id="gallery-cycler-' . $post->ID .'" class="gallery-cycler">';
			echo '<svg class="svg-post" id="svg-post-' . $post->ID .'"><defs></defs></svg>';
			$num = 0;
			foreach ($galleryArray as $id) { 
					//this should only be rendered for the index
    				if($num == 0) {
    						echo '<img id="feat-gallery-'. $id .'" class="active-img feat-gallery" src=' . wp_get_attachment_url( $id ) .'>';
    				} else {
    						echo '<img id="feat-gallery-'. $id .'" class="feat-gallery" src=' . wp_get_attachment_url( $id ) .'>';
    				}
    				$num++;

			}
			echo '</div>';

		?>

		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'oomperidev' ),
				'after'  => '</div>',
			) );
		?>
		<script>postInit("post-<?php the_ID(); ?>");</script>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php oomperium_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
