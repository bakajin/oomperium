/* OOMPERIUM interface snap-svg & jquery & textwrap, googlemap */
/* overwriting the wordpress wordpress */

/* version 2.0 by OOMP/ o.o@oomp.nl */

/* we want one file query for the snapsvg calls (with added jQuery) 
	functions in order of appearance
*/ 

/* global variables */ 
	//for some responsive love, chache initial window width
	var initialWidth = jQuery(window).width();
	// to store the page type we are one
	var pageType;
	// set the theme path to the path
	var themePath;
	//the ids array wordpress makes for posts, main menu, social menu
	var postIDs = new Array();
	var menuIDs = new Array();
	var socialIDs = new Array();

	//the svg container var
	var paper;
	//viewbox settings * not used right now *
	var viewBox;

	//var buttons, button
	var headerImg;
	
	var loadList;
	var assetObject;
	var assetCount;

	var headerAssets = new Array();
	var menuAssets;
	var postAssets = new Object();
	var socialAssets;
			
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
	function loadAssets(assetList, container) {
			
			console.log("load container ", container);
			var strippedContainerStr = container;
			if( jQuery.isNumeric(container.substr(container.lastIndexOf("-")+1)) )
				{
					strippedContainerStr = strippedContainerStr.substr(0, container.lastIndexOf("-"));
					console.log("multiple items: ", strippedContainerStr);
				}
			else
			{
				console.log("single item");
				//strippedContainerStr = container;
			}

			for(a = 0; a < assetList.length; a++) {	
					//Snap.load(assetList[a], onSVGLoaded);
					Snap.load(assetList[a], function(fragment) {
													switch(strippedContainerStr) {
														case "#site-logo":
																	paper = Snap(container);
																	//init the same function
																	headerLogoInit(container, fragment, a);


														break;

														case "#svg-menu":
																	//init the same function : container, assets, loaded
																	menuInit(container, fragment, a);

														break;
														
														case "#post":
																	//this never fires, but that is ok. The loadlist is empty
																//	postInit(container, fragment, a);
																	console.log("post!! loaded list ", a);
																	loadPostControls(fragment, a);

														break;

														case "#svg-gallery-controls":
																//dbl check if i m still using this
																console.log("svg-gallery-controls loaded list", a, container);
																//drawPostControls(container, fragment, a);
														break;
													}
													
					});

			}
			
	}

	/* ------------------------------------
			global event handlers
	   ------------------------------------ */ 

	jQuery(window).ready(function(){
	/*
		Document ready handler for the init
		
		position stuff, scale things, add handlers
	*/	
	// gues which device is requesting the page
		//phones and tablets in portrait are higher than wide
		// check the user agent
			//console.log("post ids", postIDs);
			//console.log("menu ids", menuIDs);
			//console.log("social ids", socialIDs);
			if(themePath) {
					//console.log("page type ", pageType);
					//console.log("theme path ", themePath);
			}
			//console.log("header img ", headerImg);
			//renderMenu("#svg-menu");
	});

	jQuery(window).resize(function(){
	/*
		Resize handler
		one resize is fired on load by the fluid video fix in header.php

		reposition stuff, scale things
	*/
			//lets double check this event is never fired on a mobile device
			if(jQuery(window).width() != initialWidth) {
  						//Do something
			}
	});

	jQuery(window).scroll(function(){
	/*
		Resize handler
		one resize is fired on load by the fluid video fix in header.php

		reposition stuff, scale things
	*/	
	});

//orientation change?

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

	function headerLogoInit(container, asset, loaded) {
			
			var pStr = "#site-logo";
			
			// if nothing is loaded, load the list.
			
			//loadList = [ themePath + 'oomp_logo-bg-0.svg', headerImg];
			
				loadList = [ themePath + 'logo-background.svg'];
			
			if(loaded < 1 || loaded == undefined) {
					
       				loadAssets(loadList, pStr);

       		} else if(loaded >= loadList.length) {
       			
       			paper = Snap(pStr);
       			paper.append(asset);
			
				// not setting the viewbox for responsive love, as we are using the straight svg and two viewboxes make everything weird
				/*
					paper.attr({ viewBox: "0 0 100 400" });
				*/

				//now lets check windowsize and scale and position the logo and its background
				repositionLogo(pStr);
			}
	}

	/* ------------------------------------
			header event handlers
	   ------------------------------------ */ 

	   function repositionLogo(container) {
			var windowWidth = jQuery(window).width();
			var windowHeight = jQuery(window).height();
			var devicePixelRatio = window.devicePixelRatio;

			console.log("w.h: ", windowWidth, windowHeight, devicePixelRatio)
			switch(windowWidth) {
				case windowWidth < 500: 

				break;
				case windowWidth > 500: 

				break;
				case windowWidth > 1000: 

				break;

			}

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
	function menuInit(container, asset, loaded) {
		/* select svg object string */	
		var mStr = "#svg-menu";

			loadList = [ themePath + 'button-main.svg'];
		//console.log("menu init ", loaded);
		if(loaded<1 || loaded == undefined) {
				/* load button svg */
       			loadAssets(loadList, mStr);
       		
		} else if(loaded => loadList.length) {
				/* select svg object */
       	
				paper = Snap(mStr);

       		
    	   	/* backgroundrender */
       		var pWidth = "100%", pHeight = "100%", pX = "0%", pY = "16%", calcY = 100 - 16 + "%"; 
			var bgRect = paper.rect(pX,pY,pWidth,calcY).attr({
								fill : "#EDF0F5"
							});
			var lineTop = paper.line(pX,pY, pWidth,pY).attr({
								fill : "none",
								stroke : "#D47878",
								strokeWidth : 0.25
							});
			var lineBottom = paper.line(pX,pHeight, pWidth,pHeight).attr({
									fill : "none",
									stroke : "#D47878",
									strokeWidth : 0.25
							});
			var bg = paper.group(bgRect, lineTop, lineBottom);

				
				//prepend menu bg
				paper.prepend(bg);
				
				renderMenuButtons(mStr, asset);
				
		}						
	}

	function renderMenuButtons(container, asset) {
		//render the menu (onready, onresize?)
		paper = Snap(container);
		//checking which menu to render
		//...
		
		//now lets setup the buttons
		//looping the menu object (set in header.php)
		
		var buttons = new Array();

		var mIter = 0;
		var sIter = 0;
		var lastIdx;

		for(b = 0; b < menuItems.length; b++) { 
				
				//console.log(menuItems[b].title + " : iter : " + b + " : " + menuItems[b].parent, menuItems[b].idx);
				//if parent == 0 it's a main menu item. Parent contains the parent idx
				if(menuItems[b].parent == 0) {
						//main menu
							//mainMenuIdx = menuItems[b].idx;	
							//console.log("kom op ", asset.id, " nou ", asset.x);
							//console.log("kom op ", asset.select("id=menu-button").attr("x"), " nou ");
							//asset.id = "button-" + menuItems[b].title;
							//asset.select("*").attr({id : "button-" + menuItems[b].title});
							//asset.select("svg").attr({id : "button-" + menuItems[b].title});

							asset.select("text#text-front").attr({
								text : menuItems[b].title

							});
							asset.select("text#text-back").attr({
								text : menuItems[b].title

							});
							asset.select("g").attr({
								id : "button-" + menuItems[b].idx,
								
							});
							
						var buttonAsset = asset.node.cloneNode(true);
							buttonAsset.id = "main-button-" + menuItems[b].idx;
						//	buttonAsset.addClass("main-menu-button");
							paper.append( buttonAsset ); //buttons.push( Snap(g.node.cloneNode(true)));
							
							paper.select("#" +buttonAsset.id).attr({
									x : (30 * mIter + 5 + "%"), class : "main-menu-button"
								});
							
							paper.select("#" +buttonAsset.id).mousedown(onMainMenu);
							paper.select("#" +buttonAsset.id).mouseup(onMainMenu);
							paper.select("#" +buttonAsset.id).mouseover(onMainMenu);
							paper.select("#" +buttonAsset.id).touchstart(onMainMenu);
							paper.select("#" +buttonAsset.id).touchend(onMainMenu);
							
							mIter++;

				} else if(menuItems[b].parent > 0) {
						//sub menu
						var subParent = menuItems[b].parent;
						var subIdx = menuItems[b].idx;
						
						var horizontal = 0;
						switch(subParent) {
							case "110":
									horizontal += 19;
							break;
							case "114":
									horizontal += 49;
							break;
							case "33":
									horizontal += 79;
							break;
						}
							horizontal += "%";
						
						//lets check if this is a new group of submenus and reset the iteration
						if(subParent !== lastIdx) {
								sIter = 0;
							}
						var vertical = 40 + (15 * sIter);
							vertical += "%";

						var subMenuTxt = paper.text(horizontal, vertical, menuItems[b].title);
							subMenuTxt.attr({
												fill : "#D47878",
												"font-size" : "104%",
												"font-family" : "cronos-pro",
												id : "sub-" + b
											});
							subMenuTxt.addClass("main-menu-sub");

						var	subMenuRect = paper.rect(horizontal, vertical, "10%", "3%").attr({
								fill : "#D47878",
								id : "sub-coll-" + b,
								opacity : 0
							});
							subMenuRect.transform("t0,-6");

						var subMenuItem = paper.group(subMenuRect, subMenuTxt);
							subMenuItem.attr({
								id : "sub-option-" + subIdx
							});
											
							paper.select( "#sub-option-" + subIdx ).click(onSubMenu);
							paper.select( "#sub-option-" + subIdx ).mouseover(onSubMenu);
							paper.select( "#sub-option-" + subIdx ).mouseout(onSubMenu);
											
								
							sIter++;
							lastIdx = subParent;			
				}
		}
		
	}

	function onMainMenu(event) {
			paper = Snap('#svg-menu');
			console.log("main menu event: ", event);
	}

	function onSubMenu(event) {
			console.log("submenu event: ", event);
	}

	function animComplete(event) {
			console.log("anim event: ", event);
	}


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

	function postInit(container, asset, loaded) {
		var stripIdx = container;
			stripIdx = stripIdx.substr(stripIdx.lastIndexOf("-") + 1);
		
		//for the load we strip the number of the post
		//console.log(stripIdx, "post: ", idx);

			wrapTextShape(stripIdx);
			fluidVideo(stripIdx);

			drawMask(stripIdx);

		//the only function which should load things
			//console.log("stripped idx: ", stripIdx, container);
			drawPostControls(container); // container, loaded

	}

	function loadPostControls(asset, loaded) {

			var pStr = "#post";
			//postControls = {asset.id : asset};
			if(loaded < 1 || loaded == undefined) {
				/* load button svg */
				loadList = [ 
						themePath + 'next-button.svg', 
						themePath + 'previous-button.svg', 
						themePath + 'play-button.svg', 
						themePath + 'more-button.svg', 
						themePath + 'paginator.svg'
						];

				postAssets['next-button'] = { "postAsset" : asset, "complete" : false };
				postAssets['previous-button'] = { "postAsset" : asset, "complete" : false };
				postAssets['play-button'] = { "postAsset" : asset, "complete" : false };
				postAssets['more-button'] = { "postAsset" : asset, "complete" : false };
				postAssets['paginator'] = { "postAsset" : asset, "complete" : false };

       			loadAssets(loadList, pStr);
       			console.log("loading " + loadList.length + " items " +  pStr);
       		
       		/* assets are loaded, put into a container */ 
			} else if(loaded > 0) {
				/* select svg object */
       			//cStr += "-";loadList.length
       			//cStr += container;
       			//postAssets += {asset.id : asset};
       			console.log("asset title and id ", asset.select("title").node.textContent,loaded);
       			postAssets[asset.select("title").node.textContent] = { "postAsset" : asset, "complete" : true };

       		}
       	
	}

	function postLayout(idx) {
		
		/*	fix layout per post											*
		 *												*
		 *	attach this to reposition the post layout	*
		 *	deprecate 									*/

		
		// lets reposition the first paragraph
		var subtractVal = jQuery("#svg-post-" + idx).height();
		
			jQuery("#post-" + idx + " .entry-content p:first").css({
					top : subtractVal * -1 + "px"
			});

			subtractVal += jQuery("#post-" + idx + " .entry-content p:first").height();

			jQuery("#post-" + idx + " .entry-content div.video-wrap").css({
					top : subtractVal * -0.75 + "px"
			});
			jQuery("#post-" + idx + " .entry-content div.slideshow-window").css({
					top : subtractVal * -1 + "px"
			});
			
			subtractVal += jQuery("#post-" + idx + " .entry-content div.video-wrap").height();
			subtractVal += jQuery("#post-" + idx + " .entry-content div.slideshow-window").height();

			jQuery("#svg-gallery-controls-" + idx).css({
					top : subtractVal * -1.5 + "px",

			});

			jQuery("#post-" + idx).css({
					height : "600px"
			});

			console.log("postLayout ", subtractVal, idx);
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
			paper = Snap('#svg-post-'+ idx);
			paper.attr({
				"viewBox" : "0 0 100 100"
			});

		//select the content, draw a mask polygon
		//draw some points
		var mPoints = [0,0, 0,90, 100,30, 100,0]; //0,0, 0,100, 100,50, 100,0, 0,0
		
			maskPolygon = paper.polygon(mPoints);								
			maskPolygon.mouseover(maskHandle);
			maskPolygon.mouseout(maskHandle);
			maskPolygon.mouseup(maskHandle);
			maskPolygon.touchstart(maskHandle);
			maskPolygon.touchend(maskHandle);
											
		maskPolygon.attr({
			fill : "#fff",
			id : "clips-" + idx,
		});

		paper.append(maskPolygon);

	}

	//asset, 
	function drawPostControls(container) {
		/* init */
		//get the id for the post
		var elemId = container.substr(container.lastIndexOf("-") + 1);
		
		/* select svg object string */	
		var cStr = "#svg-gallery-controls-";
			cStr += elemId;

		console.log("DRAWPOSTCONTROLS:: ", cStr, postAssets.length, " h: ", jQuery("#post-" + elemId).innerHeight());
		
		/* load up the assets for the first time */
		//console.log("menu init ", loaded);
				paper = Snap(cStr);
				paper.attr({
						width : "100%",
						height : jQuery("#post-" + elemId).innerHeight() + "px",

				});

		/* draw transparent hotspot overlay trigger post link */
				var transparentOverlay = paper.rect("0","0","100%","100%");
					transparentOverlay.attr({
						opacity : "0"
					});

				paper.append(transparentOverlay);

		/* draw white bottom rect */		
				var whiteOverlay = paper.rect("0","80%","100%","20%");
					whiteOverlay.attr({
						fill : "#ffffff"
					});

					paper.append(whiteOverlay);
				console.log("to be or not to be ", postAssets["more-button"]["complete"]);
					if(postAssets["paginator"]["complete"] == false || postAssets["play-button"]["complete"] == false || postAssets["more-button"]["complete"] == false || postAssets["next-button"]["complete"] == false || postAssets["previous-button"]["complete"] == false) {
													// keep looping
													console.log("timerloop ", cStr);
												//	drawPostControls(cStr);
												} else {
													/* if more make more button */
													paper.append(postAssets["more-button"]["postAsset"].node.cloneNode(true) );
													/* if slideshow make paginator and next previous buttons */
													paper.append(postAssets["paginator"]["postAsset"].node.cloneNode(true) );
													paper.append(postAssets["next-button"]["postAsset"].node.cloneNode(true) );
													paper.append(postAssets["previous-button"]["postAsset"].node.cloneNode(true) );
													/* if video make play button*/
													paper.append(postAssets["play-button"]["postAsset"].node.cloneNode(true) );
												}
		
					postLayout(elemId);
	}

	function wrapTextShape(idx) {
		/* wrap a paragraph diagonally using a series of div left and right */

		var postElem = jQuery("article#post-" + idx);
			
		if(jQuery("body").hasClass("blog")) {
			
				// find p elements get width and height and number of lines
				var lineNum = 0;

				var pWidth = postElem.width();
				var pHeight = 0;
					//check the first character in the p element to see what is in there. 
				var conCheck = '';

				postElem.children("div.entry-content").children("p").each(function(){
				//console.log("p-height: " + postElem.height());
				
				conCheck = postElem.html(); //str.charAt(0)
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
							lineNum += Math.floor(postElem.height() / parseInt(postElem.css("line-height").replace('px','')));
							pHeight += postElem.height(); 
					break;
				}
								
			});

			var str = '<div class="text-wrapper">';
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
				
			}
			str += '</div>';
			//stuff goes wrong here
			jQuery("article#post-" + idx + " div.entry-content p").first().before(str);
		
			}
	}

	function fluidVideo(idx) {

		/* Fluid embedded videos hold the letterboxing */
		/* reference link: https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php */
		// Find all YouTube & Vimeo§ videos

		var postVideo = jQuery("article#post-" + idx + " div.entry-content div.videowrap iframe[src^='//player.vimeo.com'], article#post-" + idx + " div.entry-content div.videowrap iframe[src^='//www.youtube.com']");

    	// The element that is fluid width
    	var fluidEl = jQuery("article#post-" + idx);

		// Figure out and save aspect ratio for each video
			postVideo.each(function() {
  				jQuery(this).data('aspectRatio', this.height / this.width)

    	// and remove the hard coded width/height
    			 .removeAttr('height')
   				 .removeAttr('width');
   				 console.log("videoresized ", this.height);

		});

		// When the window is resized
		//$(window).resize(function() {

  			var newWidth = fluidEl.width();

  		// Resize all videos according to their own aspect ratio
  			postVideo.each(function() {

    			var el = jQuery(this);
    				el
      					.width(newWidth)
      					.height(newWidth * el.data('aspectRatio'));

  			});

		
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
		