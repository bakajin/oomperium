/* Fluid embedded videos hold the letterboxing */
/* reference link: https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php */

// Find all YouTube videos

var allVideos = jQuery("iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com']"),

    // The element that is fluid width
    fluidEl = jQuery("body");

// Figure out and save aspect ratio for each video
allVideos.each(function() {

  jQuery(this)
    .data('aspectRatio', this.height / this.width)

    // and remove the hard coded width/height
    .removeAttr('height')
    .removeAttr('width');

});

// When the window is resized
jQuery(window).resize(function() {

  var newWidth = fluidEl.width();

  // Resize all videos according to their own aspect ratio
  allVideos.each(function() {

    var el = jQuery(this);
    el
      .width(newWidth)
      .height(newWidth * el.data('aspectRatio'));

  });

// Kick off one resize to fix all videos on page load
}).resize();