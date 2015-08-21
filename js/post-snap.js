/* render the posts using snap svgs masks */ 

var loadClip = ["post-clip"];

var postClip;

var maskPolygon;
var paddingPolygon;

var loadCount = 0;

jQuery(document).ready(function(){
	// set the theme path to the path
	console.log("post ids", postIDs);
	if(themePath) {
				path = themePath;
			}

	function loopArticles() {
		for(var pNum = 0; pNum < postIDs.length; pNum++) {
				drawMask(postIDs[pNum]);
				setPostHeight(postIDs[pNum]);
			}
	}

	function setPostHeight(idx) {
		//set height entry content
			//check image top or div top y + height
			var elem;
			
			if(jQuery('article#post-' + idx + " .entry-content p a img").length) {
						elem = jQuery('article#post-' + idx + " .entry-content p a img").height();
						elem = parseInt(elem, 10);
						
						console.log("entry height calc " + elem + " : " +  jQuery('article#post-' + idx + " .entry-content p a img").height() );
			}
			if(jQuery('article#post-' + idx + " .entry-content div.slideshow-window").length) {
						elem = jQuery('article#post-' + idx + " .entry-content div.slideshow-window").height();
						elem = parseInt(elem, 10);
						console.log("entry height calc " + elem + " : " +  jQuery('article#post-' + idx + " .entry-content div.slideshow-window").height() );
			}
			if(jQuery('article#post-' + idx + " .entry-content div.tiled-gallery").length) {
						elem = jQuery('article#post-' + idx + " .entry-content div.tiled-gallery").height();
						elem = parseInt(elem, 10);
						console.log("entry height calc " + elem + " : " +  jQuery('article#post-' + idx + " .entry-content div.tiled-gallery").height() );
			}
			if(jQuery('article#post-' + idx + " .entry-content p iframe").length) {
						elem = jQuery('article#post-' + idx + " .entry-content p iframe").height();
						elem = parseInt(elem, 10);
						console.log("entry height calc " + elem + " : " +  jQuery('article#post-' + idx + " .entry-content p iframe").height() );
			}
			elem += 250;
			jQuery('article#post-' + idx + ' .entry-content').height(elem);
			//elem = elem.first('');

		var heightValue;


	}

	

	function drawMask(idx) {
		//var art = 
		var articleContent = jQuery("#post-" + idx + " .entry-content");

			var s = Snap('#svg-post-'+ idx);
			//jQuery('#svg-post-'+ idx).height(articleContent.height());
		
		var mPoints = [0,(articleContent.width()/2), (articleContent.width()),0, (articleContent.width()),(articleContent.width()), 0,(articleContent.width())];//[0,(articleContent.width()/2),100,0,articleContent.width(),100,0,100];

		var pPoints = [0,(articleContent.width()/2 - 20), (articleContent.width()),-20, (articleContent.width()),(articleContent.width()), 0,(articleContent.width())];//[0,(articleContent.width()/2),100,0,articleContent.width(),100,0,100];
		
		maskPolygon = s.polyline(mPoints);
		maskPolygon.attr({
			fill : "none"
		});
		
		s.attr({
			clipPath : maskPolygon.clone(),
			mask : maskPolygon.clone()
		});

		paddingPolygon = s.paper.rect(0,0,"100%","55%");
		paddingPolygon.attr({fill : "#fff", id : ("padding-" + idx)	});

		// build check for content height and write to entry content.
		// how many exerpt lines, plus media height, make rest of text white

			//lets check for a gallery to clip
			var polyPoints;
			var topPos;

			if(articleContent.find("p a img").length > 0) {
				
				articleMedia = articleContent.find("p a img");
				polyPoints = "0% 33%, 100% 0%, 100% 100%, 0 100%";
				topPos = "-56rem";
				//console.log("found img ", articleMedia.outerHeight());
				controlsCheck =false;
			}
			if(articleContent.find("p iframe").length > 0) {
				articleMedia = articleContent.find("p iframe");
				polyPoints = "0% 50%, 100% 0%, 100% 200%, 0 200%";
				topPos = "-58rem";
				//console.log("found iframe ", articleMedia.outerHeight());
				controlsCheck = true;	
			}
			if(articleContent.children(".jetpack-slideshow").length > 0) {
				
				articleMedia = articleContent.children(".jetpack-slideshow");	
				polyPoints = "0% 38%, 100% 5%, 100% 200%, 0 200%";
				topPos = "-46rem";
				controlsCheck = true;
				//console.log("found jetpack", articleMedia.outerHeight());
			}
			if(articleContent.children(".tiled-gallery").length > 0) {
				
				articleMedia = articleContent.children(".tiled-gallery");
				polyPoints = "0% 50%, 100% 0%, 100% 200%, 0 200%";	
				topPos = "-60rem";
				controlsCheck = false;
				//console.log("found tiled", articleMedia.outerHeight());
			}

			if(articleMedia.length > 0) {
				//draw poly
				//console.log(idx + "artgal: ");
				articleMedia.css({
									"clip-path" : s.attr('clipPath'),
									"transition" : "0.4s cubic-bezier(1, -1, 0, 2)",
									"-webkit-clip-path" : "polygon(" + polyPoints + ")",
									"top" : topPos
								});//"-webkit-clip-path" : "polygon(" + mPoints[0] + "px " + mPoints[1] + "px, " + mPoints[2] + "px " + mPoints[3] + "px, " + mPoints[4] + "px " + mPoints[5] + "px, " + mPoints[6] + "px " + mPoints[7] + "px)"
				
			}
			
		// draw a mask and padding polygon
			//this way we can find the media in the post, 
			
	}
	if(postIDs.length) {
			loopArticles();
			//loadAssets(loadClip);
		}

});

