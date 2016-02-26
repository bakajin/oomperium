/* OOMPERIUM snap-svg & jquery interface */
/* overwriting wordpress */

/* version 2.0 by OOMP/ Olivier */

/* we want one file query for the snapsvg calls (with added jQuery) 
	functions in order of appearance
*/ 

/* global variables */ 
	// set the theme path to the path
	console.log("post ids", postIDs);
	var path; 

	if(themePath) {
				path = themePath;
			}
	
	var s;
	var viewBox;

	var button;
	var loadList;

	var scaleFactor;
	var transFactor;
	var transMatrix;


	/*  ============================================================================
	gloabal functions
		init
		resize
		handlers	

			
			load assets in order
			/resize function
			/scroll function
			/dom complete?
	---------------------------------------------------------------------------- */

/* load an asset list and return it as a named object */
	function loadAssets(assetList) {
					for(a = 0; a < assetList.length; a++) {	
						Snap.load((path + assetList[a] + ".svg"), onSVGLoaded);

					}
		}

	function onSVGLoaded(loaded) {
			var assetObject;
				assetObject.push(loaded.select("svg"));
				//	g = 
			return assetObject;	
		}
	
	/* global event handlers */ 
	jQuery(window).ready(function(){
	/*
		Document ready handler for the init
		
		position stuff, scale things, add handlers
	*/	
	
	
	});

	jQuery(window).resize(function(){
	/*
		Resize handler
		one resize is fired on load by the fluid video fix in header.php

		reposition stuff, scale things
	*/	
	
	
	});

	jQuery(window).scroll(function(){
	/*
		Resize handler
		one resize is fired on load by the fluid video fix in header.php

		reposition stuff, scale things
	*/	
	
	});

/*  ============================================================================
	header logo functions
		init
		resize
		handlers	

			
			load assets in order
			scroll minify
			resize 
			animate elements
	---------------------------------------------------------------------------- */

	function renderHeaderLogo() {
			
			s = Snap("#site-logo");
			// setting the viewbox for responsive love
			s.attr({ viewBox: "0 0 100 400" });
		
		//var logoGroup = s.group();
    	//var bgGroup = s.group();
		loadList = [ (path + 'oomp_logo-bg-0.svg'), headerImg];
        	//s.loadFilesDisplayOrdered( myLoadList );

	}


/*  ============================================================================
	main menu functions
		init
		resize
		handlers	

			mouse & touch touch events
			scroll minify 
			resize
			mobile menu
	---------------------------------------------------------------------------- */

/* render the main menu using snap svgs */ 
//the list to preload
function initMenu() {
	var baseShape = "oomp-button-3"; //["social-menu-button.svg"];
	var backgroundShape = "oomp-button-bg"; 
	
		loadList = [backgroundShape, baseShape];

	var menuOptions;
	
// cause this is a menu, load the button base shape and it's events
	//container for getting sizes in the document
	var drawingSurface = jQuery("#menu");

	var iterate = 0;
	var mainMenuIterate = 0;

	//select svg object
	s = Snap('#svg-menu');
	
	/* backgroundrender */

	/*	submenu render */

	/* 	main menu render */
}

	
				
										
		// may be not on the page load?
		/*if(menuItems.length) {
			loadAssets(menuLoadObj, baseShape);
		}*/
	
	/* event handlers	*/

	function onMainMenu(event) {
						s = Snap('#svg-menu');
	}

	function onSubMenu(event) {

	}

	function animComplete(event) {
			console.log("anim: ", event)
	}

});

/*  ============================================================================
	post functions
		init
		resize
		handlers

			mask image
			text wrap
			position content
			render gallery controls

	---------------------------------------------------------------------------- */

/* render the posts using snap svgs masks */ 


var postClip;

var maskPolygon;
var paddingPolygon;

var loadCount = 0;

	function postLayout(idx) {
		var loadClip = ["post-clip"];
			loadList = loadClip;
	
		// get some globals
			// *** warning *** using outerheight seems to not ensure the margin is added
		var firstElemHeight = 0;//parseInt( jQuery("#post-" + idx + " .entry-content p:first-child").outerHeight() );
		var mediaHeight = 0;
		var lastElemHeight = 0;
	
		// var for positioning content
		var offset = 4 * 27;
	
		/* reset the position of .svg-post
			- p.outerheight,
			- div.slideshow-window.outerheight
			- div.videowrapper.outerheight (iframe) 
			- p a.more-link,
		*/

		/* reset the position of .svg-gallery-controls
			- p.outerheight,
			- div.slideshow-window.outerheight
			- div.videowrapper.outerheight (iframe) 
			- p a.more-link,
			- .svgpost.outerheight
		*/

		/* to the content (div.slideshow-window, div.videowrapper) add numlines (8 or text.wrap >= 80%) multiplied by lineheight (27px) */	
	}

	function drawMask(idx) {
		/* dont worry we're just faking it */

		// select the svg object
			s = Snap('#svg-post-'+ idx);
			s.attr({
				"viewBox" : "0 0 100 100"
			});

		//select the content, draw a mask polygon
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

		//reposition elements in the post
		drawPostControls(idx)
		//postLayout(idx);
	}
	
	function drawPostControls(idx) {
		/* init */

		// paragraph heights + div height + svgpost
		
		/* draw transparent hotspot overlay trigger post link */
		/* draw white bottom rect */
		/* if more make more button */
		/* if slideshow make paginator and next previous buttons */
		/* if video make play button*/
	}

	function wrapTextShape(idx) {
		//console.log(jQuery("body").hasClass("blog"));
		if(jQuery("body").hasClass("blog")) {
			
			//jQuery("article").each(function(){
				// find p elements get width and height and number of lines
				var lineNum = 0;

				var pWidth = $(this).width();
				var pHeight = 0;
					//check the first character in the p element to see what is in there. 
				var conCheck = '';

			jQuery(this).children("div.entry-content").children("p").each(function(){
				//console.log("p-height: " + $(this).height());
				conCheck = jQuery(this).html(); //str.charAt(0)
				conCheck = conCheck.charAt(0);
				switch(conCheck) {
					case '<':
							// do nothing when imagetag or non tekst html is found
							//console.log("found <");
							conCheck = '';
						break;
					case '&':
							// do nothing when non breaking space is found
							//console.log("found &");
							conCheck = '';
						break;
					default:
							//console.log("p-content:" + conCheck);
							lineNum += Math.floor(jQuery(this).height() / parseInt(jQuery(this).css("line-height").replace('px','')));
							pHeight += jQuery(this).height(); 
					break;
				}
								
			});
			var str = '';

			//console.log("article: " + $(this).attr("id")); 
			//console.log("			lines: " + lineNum); console.log("			width: " + pWidth); 
			//console.log("			height: " + pHeight); 	console.log("			p first char: " + conCheck);
			
			var factor = 0;
			var len = 14;//lineNum; // + (lineNum/2);
			for (var l = 0; l < len; l++) {
				// write divs left right to wrap text
				factor = Math.floor(100/10)*l;

				if(l < 4) {
					factor = 0;
					//console.log("one two three");
				}
				str += '<div class="text-wrap" style="float:left;clear:left;height:' + pHeight / lineNum + 'px;width:' + 0 + 'px"></div>'; //background:red;border:solid 2px green;
				str += '<div class="text-wrap" style="float:right;clear:right;height:' + pHeight / lineNum  + 'px;width:' + factor + '%"></div>'; //background:green;border:solid 2px red;
				
				//console.log("				counter: " + l + " 100/l: " + (100/l) + " actual width: " + factor);
			}
			//stuff goes wrong here
			//$(this).children("div.entry-content").first().before(str);
			jQuery(this).children("div.entry-content p").first().before(str);
			
		}
	}

	function postHandle(event) {
		/* 
				the handler for the post cover :: svg-gallery-controls 
		*/ 
		
		/* control text clipping wrap? */
		
	}

	function maskHandle(event) {
		/* 
				the handler for the post cover :: deprecated?
		*/ 
		
		
	}

/*  ============================================================================
	footer & social menu functions
		init
		resize
		handlers

			render buttons
			button events
			resize
			render map
	---------------------------------------------------------------------------- */
/* render the social footer menu using snap svgs */ 
//the list to preload
//<?php echo get_stylesheet_directory_uri() . '/images/social-facebook.svg'; ?>

//this is the ex ready function
	function renderSocialMenuFooter(){
		loadList = ["facebook", "twitter", "linkedin", "behance", "vimeo", "pinterest", "skype", "background"];

		iterate = 0;
	
		s = Snap('#svg-social-menu');
		s.attr({ viewBox: "0 0 100 100" });
		
	}

	/* button event handler */ 
	function socialMenuHandle(event) {
			
			var elem;

				switch(event.type) {
							case "mouseover":
							break;

							case "mouseout":
							break;

							case "touchstart":
							break;

							case "touchend":
							break;

							case "mouseup":
							break;

							default:
									console.log("default ", event);
							break;

				}
	}
		