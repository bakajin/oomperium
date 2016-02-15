/* render the posts using snap svgs masks */ 

var loadClip = ["post-clip"];

var postClip;

var maskPolygon;
var paddingPolygon;

var loadCount = 0;

function postLayout(idx) {

	// get some globals
		// *** warning *** using outerheight seems to not ensure the margin is added
	var firstElemHeight = 0;//parseInt( jQuery("#post-" + idx + " .entry-content p:first-child").outerHeight() );
	var mediaHeight = 0;
	var lastElemHeight = 0;
	
	// var for positioning content
	var offset = 4 * 27;

	/* reset the position of div.slideshow-window 
			- p.outerheight,
			
	*/
	if(jQuery("#post-" + idx + " .entry-content div.slideshow-window").length) {
			firstElemHeight = (14 * 27) - (4 * 27); //num wrap lines
			//console.log("slideshow detected p-h: " + firstElemHeight );
			jQuery("#post-" + idx + " .entry-content div.slideshow-window").css({
				"top" : ( firstElemHeight * -1 ) + "px"
			});
		// the jetpack slideshow makes a window height out of padding	
		//for some reasone it calculates all over the place and needs offset values
		mediaHeight = (jQuery("#post-" + idx + " .entry-content div.slideshow-window").outerHeight() * 1.63); // * 1.63
	}
	/* reset the position of div.videowrapper (iframe) 
			- p.outerheight,
			
	*/
	if(jQuery("#post-" + idx + " .entry-content div iframe").length) {
			firstElemHeight = parseInt( jQuery("#post-" + idx + " .entry-content p:first-child").outerHeight() );
			//console.log("video detected p-h: " + firstElemHeight);
			jQuery("#post-" + idx + " .entry-content div.video-wrap").css({
				"top" : ( firstElemHeight * -1 + offset ) + "px"
			});

		mediaHeight = jQuery("#post-" + idx + " .entry-content div.video-wrap").outerHeight();
	}
	
	/* reset the position of .svg-post
			- p.outerheight,
			- div.slideshow-window.outerheight
			- div.videowrapper.outerheight (iframe) 
			- p a.more-link,
	*/

	//	compensating for more-link
	if(jQuery("#post-" + idx + " .entry-content p .more-link").length) {
			lastElemHeight += parseInt( jQuery("#post-" + idx + " .entry-content p .more-link").outerHeight() );

	}

	jQuery("#svg-post-" + idx).css({
				"top" : (( firstElemHeight + mediaHeight + lastElemHeight ) * -1 ) + "px"
			});

	/* reset the position of .svg-gallery-controls
			- p.outerheight,
			- div.slideshow-window.outerheight
			- div.videowrapper.outerheight (iframe) 
			- p a.more-link,
			- .svgpost.outerheight
	*/

	/* to the content (div.slideshow-window, div.videowrapper) add numlines (8 or text.wrap >= 80%) multiplied by lineheight (27px) */	
	//	compensating for more-link and svg-post
	console.log("firstElemHeight " + firstElemHeight + " mediaHeight " + mediaHeight + " lastElemHeight " + lastElemHeight);
	
	lastElemHeight += parseInt( jQuery("#svg-post-" + idx).outerHeight() );

	if(jQuery("#post-" + idx + " .entry-content div.slideshow-window").length) {
		mediaHeight *= 1; //1.83 //1.85
	}
	if(jQuery("#post-" + idx + " .entry-content div iframe").length) {
		mediaHeight *= 2.2;
	}
	jQuery("#svg-gallery-controls-" + idx).css({
				"top" : (( firstElemHeight + mediaHeight + lastElemHeight ) * -1 ) + "px",
			});

}

jQuery(window).load(function(){
	// set the theme path to the path
	console.log("post ids", postIDs);
	if(themePath) {
				path = themePath;
			}

	function loopArticles() {
		for(var pNum = 0; pNum < postIDs.length; pNum++) {
				drawMask(postIDs[pNum]);
				//setPostHeight(postIDs[pNum]);
			}
	}

	function drawMask(idx) {
		/* dont worry we're just faking it */
		
		//select the content
		
		// draw a mask polygon
			
		// select the svg object
		var s = Snap('#svg-post-'+ idx);
			s.attr({
				"viewBox" : "0 0 100 100"
			});

		//draw some points
		var mPoints = [0,0, 0,80, 100,20, 100,0]; //0,0, 0,100, 100,50, 100,0, 0,0
		
			maskPolygon = s.paper.polygon(mPoints);								
			maskPolygon.mouseover(maskHandle);
			maskPolygon.mouseout(maskHandle);
			maskPolygon.mouseup(maskHandle);
			maskPolygon.touchstart(maskHandle);
			maskPolygon.touchend(maskHandle);
											
		maskPolygon.attr({
			fill : "#fff",
			id : "clips-" + idx,
		});

		s.append(maskPolygon);

		//now lets draw a transparent overlay for the event listener and to cover modes of interaction
			//mPoints = [0,80, 0,100, 100,100, 100,20];
			mPoints = [0,0, 0,100, 100,100, 100,0];
			paddingPolygon = s.paper.polygon(mPoints);
			paddingPolygon.mouseover(maskHandle);
			paddingPolygon.mouseout(maskHandle);
			maskPolygon.mouseup(maskHandle);
			paddingPolygon.touchstart(maskHandle);
			paddingPolygon.touchend(maskHandle);
		
		paddingPolygon.attr({
			fill : "#000",
			id : "overlays-" + idx,
			opacity : "0",
		});

		s.append(paddingPolygon);
		//reposition elements in the post
		drawPostControls(idx)
		//postLayout(idx);
	}
	
	function drawPostControls(idx) {
		/* set up */

		// paragraph heights + div height + svgpost
		var posY = 0;	//756;
			jQuery("#post-" + idx + " .entry-content p").each(function(index) {
				posY -= jQuery("#post-" + idx + " .entry-content p").outerHeight();
				//console.log(index + " par num ", jQuery("#post-" + idx + " .entry-content p").outerHeight());
			});
			
			if(jQuery("#post-" + idx + " .entry-content div iframe")) {
				posY -= jQuery("#post-" + idx + " .entry-content div iframe").outerHeight();	
			}
			if(jQuery("#post-" + idx + " .entry-content div.jetpack-slideshow")) {
				posY -= jQuery("#post-" + idx + " .entry-content div.jetpack-slideshow div:first-child").outerHeight();	
				//console.log("a slideshow :: ", jQuery("#post-" + idx + " .entry-content div.jetpack-slideshow div:first-child").outerHeight());	
			}
			//posY += jQuery("#post-" + idx + " .entry-content .svg-post").outerHeight();
			
		console.log("pos:" + posY);

		var s = Snap('#svg-gallery-controls-'+ idx);
			/*s.attr({
				"viewBox" : "0 0 100 100"
			});*/

		jQuery("#svg-gallery-controls-" + idx).css({
				"height" : "56rem" 
				
			});//"height" : (posY * -1.5) + "px" 
			//"top" : posY + "px" //"height" : jQuery("#post-" + idx + " .entry-content").innerHeight()

		var coverRect = s.paper.rect( "0%","0%","100%","66%").attr({
							fill : "#ffffff",
							opacity : "0",
							id : "post-cover"
						});

			coverRect.mouseover(postHandle);
			coverRect.mouseout(postHandle);
			coverRect.mousedown(postHandle);
			coverRect.mouseup(postHandle);
			coverRect.touchstart(postHandle);
			coverRect.touchend(postHandle);
		
		var bgRect = s.paper.rect( "0%","66%","100%","20%").attr({
							fill : "#ffffff",
							id : "post-bg"
						});
		/* draw transparent hotspot overlay trigger post link */
		/* draw white bottom rect */
		/* if more make more button */
		/* if slideshow make paginator and next previous buttons */
		/* if video make play button*/
	}

	function postHandle(event) {
		/* 
				the handler for the post cover :: svg-gallery-controls 

		*/ 
		
		/* control text clipping wrap? */
		
		var idx = event.target.farthestViewportElement.id;
		//concat the last idx string from the id
			idx = idx.substr(idx.lastIndexOf("-")+1);

			//console.log("ev: ", idx, event.target.farthestViewportElement.id);
			var mask = Snap("#clips-" + idx);	

		switch(event.type) {
			case "mouseover":
					/* animate to off :: clipping mask */
					mask.animate(
  					{ points: [0,0, 0,20, 100,20, 100,0] },
  					100, mina.easeout);
  					
					/* animate to off :: text-wrap divs */

					/* animate to visible :: post control buttons */
			break;
			case "mouseout":

					/* animate to on :: clipping mask */
					mask.animate(
  					{ points: [0,0, 0,80, 100,20, 100,0] },
  					200, mina.easein);
  					
					/* animate to on :: text-wrap divs */

					/* animate to invisible :: post control buttons */
			break;
			case "mouseup":
					/* 
						click() the link in ::
							article > header.entry-header > h1.entry-title > a
			
					*/
					jQuery("#post-" + idx + " .entry-header .entry-title a")[0].click();
					console.log("the post cover: ", event);
			break;
			case "touchstart":
					mask.animate(
  					{ points: [0,0, 0,20, 100,20, 100,0] },
  					100, mina.easeout);
  					
					//console.log("mask mouseover: ", event.target.farthestViewportElement.id);
			break;
			
			case "touchend":
					/* 
						click() the link in ::
							article > header.entry-header > h1.entry-title > a
			
					*/
					mask.animate(
  					{ points: [0,0, 0,80, 100,20, 100,0] },
  					200, mina.easein);
					
					jQuery("#post-" + idx + " .entry-header .entry-title a")[0].click();
					
			break;
			default:

			break;
		}
	}

	function maskHandle(event) {
		
		
		var ida = event.target.farthestViewportElement.id;
			ida = ida.substr(ida.lastIndexOf("-")+1);
		
		console.log("ev: " + ida);
		var mask = Snap("#clips-" + ida);	
		var over = Snap("#overlays-" + ida);	
		//animate the points on rollover or touchstart
		switch(event.type) {
			case "mouseover":
					//console.log("mask mouseover: ", event.target.farthestViewportElement.id);
					mask.animate(
  					{ points: [0,0, 0,20, 100,20, 100,0] },
  					100, mina.easeout);
  					
			break;
			case "mouseout":
					//console.log("mask mouseover: ", event.target.farthestViewportElement.id);
					mask.animate(
  					{ points: [0,0, 0,80, 100,20, 100,0] },
  					200, mina.easein);
  					
			break;
			
			case "mouseup":
					
					console.log(ida + " mask click: ", event.target.id);
					jQuery( "article#post-" + ida + " header.entry-header h1.entry-title a").trigger( "click" );
  					
			break;
			
			case "touchstart":
					mask.animate(
  					{ points: [0,0, 0,20, 100,20, 100,0] },
  					100, mina.easeout);
  					
					//console.log("mask mouseover: ", event.target.farthestViewportElement.id);
			break;
			case "touchend":
					mask.animate(
  					{ points: [0,0, 0,80, 100,20, 100,0] },
  					200, mina.easein);
					//console.log("mask mouseover: ", event.target.farthestViewportElement.id);
			break;
			
			case "default":
					console.log("mask default: ", event);
			break;
		}
	}

	if(postIDs.length) {
		//console.log("blog? ", jQuery("body").hasClass("blog"));
		if(jQuery("body").hasClass("blog")) {
			loopArticles();
			}
			//loadAssets(loadClip);
		}


});

jQuery(window).resize(function(){
	/*
		one resize is fired on load by the fluid video fix in header.php
	*/	
	
	if(postIDs.length) {
		//console.log("blog? ", jQuery("body").hasClass("blog"));
		if(jQuery("body").hasClass("blog")) {
				for(var pNum = 0; pNum < postIDs.length; pNum++) {
					//fix the post layouts				
					postLayout(postIDs[pNum]);
				}
			}
			//loadAssets(loadClip);
		}

	});

