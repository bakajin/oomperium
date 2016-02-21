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
	var postAssets;
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
			
			
			for(a = 0; a < assetList.length; a++) {	
					//Snap.load(assetList[a], onSVGLoaded);
					Snap.load(assetList[a], function(loaded) {
													switch(container) {
														case "#site-logo":
																	paper = Snap(container);
																	//init the same function
																	headerLogoInit(container, loaded, 1);


														break;

														case "#svg-menu":
																	//init the same function : container, assets, loaded
																	menuInit(container, loaded, 1);

														break;
														
														case "#svg-post":
																	//select container
																	paper = Snap(container);
																var asset = loaded;//.select("svg");//svg
																	paper.append(asset);
																	//console.log("loaded list ");

														break;

														case "#svg-gallery-controls":
																//dbl check if i m still using this
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
			console.log("post ids", postIDs);
			console.log("menu ids", menuIDs);
			console.log("social ids", socialIDs);
			if(themePath) {
					console.log("page type ", pageType);
					console.log("theme path ", themePath);
			}
			console.log("header img ", headerImg);
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
			
			//loadList = [ themePath + 'oomp_logo-bg-0.svg', headerImg];
			console.log("menu init ", loaded);
			if(loaded<1 || loaded == undefined) {
					loadList = [ themePath + 'logo-background.svg'];
       				loadAssets(loadList, pStr);
       		} else if(loaded > 0) {
       			
       			paper = Snap(pStr);
       			paper.append(asset);
				// not setting the viewbox for responsive love, as we are using the straight svg and two viewboxes make everything weird
				/*paper.attr({ viewBox: "0 0 100 400" });*/

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

		console.log("menu init ", loaded);
		if(loaded<1 || loaded == undefined) {
				/* load button svg */
				loadList = [ themePath + 'button-main.svg'];
       			loadAssets(loadList, mStr);
       			console.log("loading stuff pls wait ");
       		
		} else if(loaded > 0) {
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
				
				console.log("load done now draw it to screen ");
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
				
				console.log(menuItems[b].title + " : iter : " + b + " : " + menuItems[b].parent, menuItems[b].idx);
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
							
							paper.append( buttonAsset ); //buttons.push( Snap(g.node.cloneNode(true)));
							paper.select("#" +buttonAsset.id).attr({x : (30 * mIter + 5 + "%")})
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
								opacity : 0.5
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
			s = Snap('#svg-menu');
	}

	function onSubMenu(event) {

	}

	function animComplete(event) {
			console.log("anim: ", event)
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
	function postInit(idx) {
		console.log("post: ", idx);
	}

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
		