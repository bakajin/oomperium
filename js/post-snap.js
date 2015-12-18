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
						elem -= 100;
						console.log("entry height calc " + elem + " : " +  jQuery('article#post-' + idx + " .entry-content p iframe").height() );
			}
			elem += 250;
			jQuery('article#post-' + idx + ' .entry-content').height(elem);
			//elem = elem.first('');

		var heightValue;


	}

	function drawMask(idx) {
		/* dont worry we're just faking it */
		
		//select the content
		var articleContent = jQuery("#post-" + idx + " .entry-content");

		// select the svg object
		var s = Snap('#svg-post-'+ idx);
			s.attr({
				"viewBox" : "0 0 100 100"
			});
		//var s = Snap('#clip-'+ idx);
			//jQuery('#svg-post-'+ idx).height(articleContent.height());
		
		//draw some points
		//x,y 
		//var mPoints = [0,(articleContent.width()/2), (articleContent.width()),0, (articleContent.width()),(articleContent.width()), 0,(articleContent.width())];//[0,(articleContent.width()/2),100,0,articleContent.width(),100,0,100];
		// <polygon points="0 0 0 561.8 749.07 228.47 749.07 0 0 0"/>
		//var mPoints = [0,0, 0,articleContent.height(), (articleContent.width()),(articleContent.height()/2), articleContent.width(),0,0,0];
		var mPoints = [0,0, 0,100, 100,50, 100,0]; //0,0, 0,100, 100,50, 100,0, 0,0
		//var pPoints = [0,(articleContent.width()/2 - 20), (articleContent.width()),-20, (articleContent.width()),(articleContent.width()), 0,(articleContent.width())];//[0,(articleContent.width()/2),100,0,articleContent.width(),100,0,100];
		
		//maskPolygon = s.polyline(mPoints);
			maskPolygon = s.paper.polygon(mPoints);
		
											
		//maskPolygon.mouseover(maskHandle);
		//maskPolygon.mouseout(maskHandle);
		//maskPolygon.touchstart(maskHandle);
		//maskPolygon.touchend(maskHandle);
											
		maskPolygon.attr({
			fill : "#fff",
			id : "clips-" + idx,
		});

		s.append(maskPolygon);
		//clipPath : maskPolygon.clone()
		/*		
		var clipPathId = s.select("#clips-" + idx).attr("clip-path");
		var pos = clipPathId.indexOf("#");
			clipPathId = clipPathId.substr(pos);

			pos = clipPathId.length - 2;
			clipPathId = clipPathId.substr(0, pos);			 

			if(s.select(clipPathId) != null) {
					s.select(clipPathId).mouseover(maskHandle);
					s.select(clipPathId).mouseout(maskHandle);
				}
				*/

			//Snap(clipPathId).select("polygon").mouseover(maskHandle);
			//Snap(clipPathId).select("polygon").mouseout(maskHandle);
			
		//console.log( "::::  	clippath id " + clipPathId );
		/*
		s.attr({
			clipPath : maskPolygon.clone()
		});
		*/
		//	mask : maskPolygon.clone()
		
		/*
			paddingPolygon = s.paper.rect(0,0,"100%","55%");
			paddingPolygon.attr({fill : "#fff", id : ("padding-" + idx)	});
		*/

		// build check for content height and write to entry content.
		// how many exerpt lines, plus media height, make rest of text white

			//lets check for a gallery to clip
			var polyPoints;
			var topPos;

			var articleMedia = -1;
			/* set up a clip-path for chrome, safari and opera */
			if(articleContent.find("p a img").length > 0) {
				
				articleMedia = articleContent.find("p a img");
				polyPoints = "0% 33%, 100% 0%, 100% 100%, 0 100%";
				topPos = "-28rem";
				//console.log("found img ", articleMedia.outerHeight());
				controlsCheck =false;
			}
			if(articleContent.find("p iframe").length > 0) {
				articleMedia = articleContent.find("p iframe");
				polyPoints = "0% 50%, 100% 0%, 100% 200%, 0 200%";
				topPos = "-28rem";
				//console.log("found iframe ", articleMedia.outerHeight());
				controlsCheck = true;	
			}
			if(articleContent.children(".jetpack-slideshow").length > 0) {
				
				articleMedia = articleContent.children(".jetpack-slideshow");	
				polyPoints = "0% 38%, 100% 5%, 100% 200%, 0 200%";
				topPos = "-24rem";
				controlsCheck = true;
				//console.log("found jetpack", articleMedia.outerHeight());
			}
			if(articleContent.children(".tiled-gallery").length > 0) {
				
				articleMedia = articleContent.children(".tiled-gallery");
				polyPoints = "0% 50%, 100% 0%, 100% 200%, 0 200%";	
				topPos = "-24rem";
				controlsCheck = false;
				//console.log("found tiled", articleMedia.outerHeight());
			}

			if(articleMedia.length > 0) {
				//draw poly
				console.log(idx + "artgal: " + maskPolygon.attr('clipPath') );
				/*articleMedia.css({
									"clip-path" :  maskPolygon.attr('clipPath'),
									"transition" : "0.4s cubic-bezier(1, -1, 0, 2)",
									"-webkit-transition" : "-webkit-clip-path 0.4s cubic-bezier(1, -1, 0, 2)",
									"-webkit-clip-path" : "polygon(" + polyPoints + ")",
									"top" : topPos
								});*/

								//"clip-path" : s.attr('clipPath'), //"-webkit-clip-path" : "polygon(" + mPoints[0] + "px " + mPoints[1] + "px, " + mPoints[2] + "px " + mPoints[3] + "px, " + mPoints[4] + "px " + mPoints[5] + "px, " + mPoints[6] + "px " + mPoints[7] + "px)"
				
			} else {
				console.log("no articel media", idx);
				/*jQuery( "#svg-post-" + idx ).css({
													"display" : "none"
				 	 							});*/
			}
			
		// draw a mask and padding polygon
			//this way we can find the media in the post, 
			
	}
		
	function maskHandle(event) {
						console.log("mask: ", event);
	}

	if(postIDs.length) {
		//console.log("blog? ", jQuery("body").hasClass("blog"));
		if(jQuery("body").hasClass("blog")) {
			loopArticles();
			}
			//loadAssets(loadClip);
		}


});

