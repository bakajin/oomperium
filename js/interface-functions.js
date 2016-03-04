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

	var externalAssets = new Object(); 
	var parentAsset = new Object();
	//the svg container var
	var paper;
	//viewbox settings * not used right now *
	var viewBox;

	var headerImg = new Array();
	
	var loadList;
	var assetObject;
	var assetCount;

	var headerAssets = new Array();
	var menuAssets;
	var postAssets = new Object();
	var socialAssets = new Object();
			
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

	/* preload all external assets into the the structured object */
	function loadExternalAssets() {

			var containerKey;

			externalAssets["svg-menu"] = {};
			externalAssets["post"] = {};
			externalAssets["svg-social-menu"] = {};
			
			containerKey = "site-logo";

			externalAssets[containerKey] = {};
			loadList = ["logo", "logo-background"];

			for (i = 0; i < loadList.length; i++) {
				externalAssets[containerKey][loadList[i]] = { asset : "", loadstate : "start" };

				parentAsset[loadList[i]] = containerKey;
			}
			
			containerKey = "svg-menu";
			externalAssets[containerKey] = {};
			loadList = ["button-main"];
			
			for (i = 0; i < loadList.length; i++) {

					externalAssets[containerKey][loadList[i]] = { asset : "", loadstate : "start" };
					parentAsset[loadList[i]] = containerKey;
			}
			
			containerKey = "post";
			externalAssets[containerKey] = {};
			loadList = ['previous-button', 'play-button', 'more-button', 'paginator'];
			
			for (i = 0; i < loadList.length; i++) {

					externalAssets[containerKey][loadList[i]] = { asset : "", loadstate : "start" };
					parentAsset[loadList[i]] = containerKey;
			}
			
			containerKey = "svg-social-menu";
			externalAssets[containerKey] = {};
			loadList = [ "social-facebook", "social-twitter", "social-linkedin", "social-behance", "social-vimeo", "social-pinterest", "social-skype" ];

			for (i = 0; i < loadList.length; i++) {

					externalAssets[containerKey][loadList[i]] = { asset : "", loadstate : "start" };
					parentAsset[loadList[i]] = containerKey;
			}
			console.log("object ", externalAssets);
			
			/* with the object defined lets start loading the assets */
			loadAssets();
	}

	/* load an asset list and return it as a named object */
	function loadAssets() {
			
			for(mod in externalAssets) {
					console.log("module: ", mod);
					for(ass in externalAssets[mod]) {
							//console.log("	assets: ", themePath + ass + ".svg");
							
						//lets start loading assets
							//Snap.load(themePath + ass + ".svg", function(fragment) {
							Snap.load(themePath + ass + ".svg", loadEvent) 
								//ok now lets insert the completed asset back into the object
								
							//});
					
					}
			}

	}

	function loadEvent(fragment) {
						externalAssets[parentAsset[fragment.node.id]][ fragment.node.id ]["asset"] = fragment;
						externalAssets[parentAsset[ fragment.node.id ]][ fragment.node.id ]["loadstate"] = "complete";
								//console.log("	assets: ", ass, mod, it);
								console.log("frag: ", fragment.node.id, parentAsset[fragment.node.id]);
								
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
					console.log("page type ", pageType);
					console.log("theme path ", themePath);
					console.log("done: ", externalAssets);
			}
			//console.log("header img ", headerImg);
			//renderMenu("#svg-menu");
			//rerenderHeaderLogo();
			
			console.log("buglist: headerlogoBG looadstate, clean rendermenu func" );
			headerLogoInit();

			renderMenuButtons("svg-menu", externalAssets["svg-menu"]['button-main']['asset']);
			renderGoogleMap();
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
			//console.log("done: ", externalAssets);
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

	function headerLogoInit() {
			
			var pStr = "site-logo";
		       	
       			paper = Snap("#" + pStr);
       			paper.attr({ viewBox: "0 0 300 489" }); //400

       		//					paper.append(headerImg[0].node.cloneNode(true));
       		//					paper.append(headerImg[1].node.cloneNode(true));
       		for(ass in externalAssets[pStr]) {
       			console.log("header asset: ", ass, externalAssets[pStr][ass]["loadstate"]);
       				paper.append(externalAssets[pStr][ass]["asset"]);		
       		}
       		
			
				// not setting the viewbox for responsive love, as we are using the straight svg and two viewboxes make everything weird
				
				
				//now lets check windowsize and scale and position the logo and its background
				repositionLogo(pStr);
			//}
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
		var mStr = "svg-menu";

				/* select svg object */
       	
				paper = Snap("#" + mStr);

       		
    	   	/* backgroundrender */
       		var pWidth = "100%", pHeight = "100%", pX = "0%", pY = "17%", calcY = 100 - 17 + "%"; 
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
				paper.append(bg);
			//	console.log("do menu? ", externalAssets[mStr]['button-main']['loadstate']);
			//renderMenuButtons(mStr, externalAssets[mStr]['button-main']['asset']);
				
								
	}

	function renderMenuButtons(container, asset) {
		//render the menu (onready, onresize?)
		paper = Snap("#" + container);
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
							
							asset.select("#text-front text").attr({
								text : menuItems[b].title

							});
							asset.select("#text-back text").attr({
								text : menuItems[b].title

							});
							asset.select("g").attr({
								id : "button-" + menuItems[b].idx,
								
							});
							asset.select("#quarter-button-bg").attr({
								"display" : "none"
							});
							asset.select("#mobile-collapse").attr({
								"display" : "none"
							});
							
						var buttonAsset = asset.node.cloneNode(true);
							buttonAsset.id = "main-button-" + menuItems[b].idx;
						
							paper.append( buttonAsset ); 
							
							paper.select("#" + buttonAsset.id).attr({
									x : (30 * mIter + 5 + "%"),
									width : "22%",
									class : "main-menu-button"
								});
							
							paper.select("#" +buttonAsset.id).mousedown(onMainMenu);
							paper.select("#" +buttonAsset.id).mouseup(onMainMenu);
							
							//select the cover to prevent multiple fires of the event and animation problems
							paper.select("#" +buttonAsset.id + " #button-" + menuItems[b].idx + " #hit-cover").mouseover(onMainMenu);
							paper.select("#" +buttonAsset.id).mouseout(onMainMenu);
							paper.select("#" +buttonAsset.id).touchstart(onMainMenu);
							paper.select("#" +buttonAsset.id).touchend(onMainMenu);
							
							mIter++;

				} else if(menuItems[b].parent > 0) {
						//sub menu
						var subParent = menuItems[b].parent;
						var subIdx = menuItems[b].idx;
						
						var horizontal = 0;
						console.log("num: ",subParent);
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
							//copy paste from here
							case "286":
									horizontal += 19;
							break;
							case "42":
									horizontal += 49;
							break;
							case "39":
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
												"font-size" : "104%",
												"font-family" : "cronos-pro",
												id : "sub-" + b
											});
							subMenuTxt.addClass("main-menu-sub");

						var	subMenuRect = paper.rect(horizontal, vertical, "10%", "3%").attr({
								id : "sub-coll-" + b,
								opacity : 0
							});
							subMenuRect.transform("t0,-6");

						var subMenuItem = paper.group(subMenuRect, subMenuTxt);
							subMenuItem.attr({
								id : "sub-option-" + subIdx,
								fill : "#D47878"
							});
											
							paper.select( "#sub-option-" + subIdx ).click(onSubMenu);
							paper.select( "#sub-option-" + subIdx ).mouseover(onSubMenu);
							paper.select( "#sub-option-" + subIdx ).mouseout(onSubMenu);
							paper.select( "#sub-option-" + subIdx ).touchstart(onSubMenu);
							paper.select( "#sub-option-" + subIdx ).touchend(onSubMenu);
											
								
							sIter++;
							lastIdx = subParent;			
				}
		}
		
	}


		function onMainMenu(event) {
						console.log("event: ", event);
							paper = Snap("#svg-menu");
						var parentId = event.target.nearestViewportElement.id;
						var parent = paper.select("#" + parentId);

						var elem;

						switch(event.type) {
							case "mouseover":
									
									elem = parent;
									//elem.unmouseover(onMainMenu);

									elem = elem.select("#half-button-bg");//+ event.target.nearestViewportElement.childNodes[1].childNodes[1].id
									elem.animate({
											"stroke-width" : "11"
									}, 161, mina.easein, animComplete);
									
									 
							break;

							case "mouseout":
								//console.log("out ", event.target.nearestViewportElement.id);
								//	elem = paper.select("#" + event.target.nearestViewportElement.id);
								//	elem.mouseover(onMainMenu);
									
								//	elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[1].id);
								//	elem.animate({
								//			"stroke-width" : "0.25"
								//	}, 500, mina.easin, animComplete);
								//	console.log("out: ", parentId);
									elem = parent;
									//elem.unmouseover(onMainMenu);

									elem = elem.select("#half-button-bg");//+ event.target.nearestViewportElement.childNodes[1].childNodes[1].id
									elem.animate({
											"stroke-width" : "0.25"
									}, 231, mina.easeout, animComplete);
									
							break;

							case "mousedown":
									console.log("down ", event.type);
									elem = paper.select("#" + event.target.nearestViewportElement.id);
									//elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[5].id);
									//elem.transform('t-5 -5 r180');
							break;
							case "mouseup":
									console.log("up ",  event.target.nearestViewportElement.children[2].children[3].children[0].innerHTML );
									elem = paper.select("#" + event.target.nearestViewportElement.id);
									//elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[5].id);
									//elem.transform('t0 0 r0');

									jQuery("a:contains(" + event.target.nearestViewportElement.children[2].children[3].children[0].innerHTML  + ")")[0].click();
							break;

							case "touchstart":
									console.log("touch start", event.type);
							break;

							case "touchend":
									console.log("touch end", event.type);
							break;

							case "click":
									/* use mouse up instead */
									//console.log("click ", event.type, parent.select("#text-front").node.firstChild.data);

									jQuery("a:contains(" + parent.select("#text-front").node.firstChild.data + ")")[0].click();
							break;

							default:
									console.log("default ", event);
							break;


						}
		}


	function onSubMenu(event) {
				console.log("submenu event: ", event);
				switch(event.type) {
							case "mouseover":
									console.log("over ", event.type);
									this.attr({
										fill : "#a15b5b"
									});
						
							break;

							case "mouseout":
									console.log("out ", event.type);
									this.attr({
										fill : "#d47878"
									});
							break;

							case "touchstart":
									console.log("touch ", event.type);
							break;

							case "touchend":
									console.log("touch ", event.type);
							break;

							case "click":
									console.log("click ", event.type, event.target.firstChild.data);
									jQuery("a:contains(" + event.target.firstChild.data	 + ")")[0].click();
							break;

							default:
									console.log("default ", event);
							break;


						}
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

	function postLayout(idx) {
		
		/*	fix layout per post											*
		 *												*
		 *	attach this to reposition the post layout	*
		 *	deprecate 									*/

		
		// lets reposition the first paragraph
		var subtractVal = jQuery("#svg-post-" + idx).height();
		
		jQuery("#svg-gallery-controls-" + idx).css({
					top : subtractVal * -1 + "px",
					"overflow-x" : "overlay"

			});

			subtractVal += jQuery("#svg-gallery-controls-" + idx).height();

			jQuery("#post-" + idx + " .entry-content p:first").css({
					top : subtractVal * -1 + "px"
			});

			subtractVal += jQuery("#post-" + idx + " .entry-content p:first").height();

			jQuery("#post-" + idx + " .entry-content div.video-wrap").css({
					top : subtractVal * -0.9 + "px"
			});
			jQuery("#post-" + idx + " .entry-content div.slideshow-window").css({
					top : subtractVal * -0.9 + "px"
			});
			
			subtractVal += jQuery("#post-" + idx + " .entry-content div.video-wrap").innerHeight();
			subtractVal += jQuery("#post-" + idx + " .entry-content div.slideshow-window").innerHeight();

			//console.log("ratio 2.33333 ", jQuery("#post-" + idx).innerWidth());
			var wRatio = jQuery("#post-" + idx).innerWidth() * 1.61; //2.1
				wRatio = Math.ceil(wRatio / 10) * 10;

			jQuery("#post-" + idx).css({
					height :  wRatio + "px"
			});
			jQuery("#post-" + idx + " .entry-content").css({
					height : wRatio * 0.9 + "px"
			});

			//console.log("postLayout ", subtractVal, idx);
		// get some globals
			// *** warning *** using outerheight seems to not ensure the margin is added
		
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
			/*
			maskPolygon.mouseover(maskHandle);
			maskPolygon.mouseout(maskHandle);
			maskPolygon.mouseup(maskHandle);
			maskPolygon.touchstart(maskHandle);
			maskPolygon.touchend(maskHandle);
			*/								
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

		//console.log("DRAWPOSTCONTROLS:: ", cStr, postAssets.length, " h: ", jQuery("#post-" + elemId).innerHeight());
		
		/* load up the assets for the first time */
		//console.log("menu init ", loaded);
				paper = Snap(cStr);
				paper.attr({
					viewBox : "0 0 300 470",
					width : "100%"
				});//500
				/*paper.attr({
						width : "100%",
						height : jQuery("#post-" + elemId).innerHeight() + "px",

				});
*/
				/* draw white bottom rect */		
				var whiteOverlay = paper.rect("-0.5%","60%","101%","26%");
					whiteOverlay.attr({
						fill : "#ffffff"
					});

					paper.append(whiteOverlay);

		/* draw transparent hotspot overlay trigger post link */
				var transparentOverlay = paper.rect("0","0","100%","80%");
					transparentOverlay.attr({
						opacity : "0"
					});

					transparentOverlay.mouseover(postHandle);
					transparentOverlay.mouseout(postHandle);
					transparentOverlay.mousedown(postHandle);
					transparentOverlay.mouseup(postHandle);
					transparentOverlay.touchstart(postHandle);
					transparentOverlay.touchend(postHandle);
		
				paper.append(transparentOverlay);

				//console.log("to be or not to be ", postAssets["more-button"]["complete"]);
													/* if more make more button */
					for(ass in externalAssets["post"]) {
									
									//postAssets["more-button"]["postAsset"].select("g").transform("s0.61");
									
									console.log("asset: ", externalAssets["post"][ass]['loadstate']);
									/*
									if(externalAssets["post"][ass]['loadstate'] == 'complete') {
										paper.append(externalAssets["post"][ass]['asset'].node.cloneNode(true));	
									}	
									*/
					}
					
					
													//postAssets["more-button"]["postAsset"].mouseup(postHandle);
													//paper.append(postAssets["more-button"]["postAsset"].node.cloneNode(true) );
													/* if slideshow make paginator and next previous buttons */
													//paper.append(postAssets["paginator"]["postAsset"].node.cloneNode(true) );
													//paper.append(postAssets["next-button"]["postAsset"].node.cloneNode(true) );
													//paper.append(postAssets["previous-button"]["postAsset"].node.cloneNode(true) );
													/* if video make play button*/
													//paper.append(postAssets["play-button"]["postAsset"].node.cloneNode(true) );
											
					console.log("elemId? ", elemId);
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
			var len = 14;///14 /lineNum; // + (lineNum/2);
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
   				 //console.log("videoresized ", this.height);

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
		var idx = event.target.farthestViewportElement.id;
		//concat the last idx string from the id
			idx = idx.substr(idx.lastIndexOf("-")+1);

			console.log("ev: ", idx, event.target.farthestViewportElement.id);
			var mask = Snap("#clips-" + idx);	

		switch(event.type) {
			case "mouseover":
					/* animate to off :: clipping mask */
					mask.animate(
  					{ points: [0,0, 0,20, 100,20, 100,0] },
  					61, mina.easeout);
  					
					/* animate to off :: text-wrap divs */

					/* animate to visible :: post control buttons */
			break;
			case "mouseout":

					/* animate to on :: clipping mask */
					mask.animate(
  					{ points: [0,0, 0,80, 100,20, 100,0] },
  					161, mina.easein);
  					
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
  					61, mina.easeout);
  					
					//console.log("mask mouseover: ", event.target.farthestViewportElement.id);
			break;
			
			case "touchend":
					/* 
						click() the link in ::
							article > header.entry-header > h1.entry-title > a
			
					*/
					mask.animate(
  					{ points: [0,0, 0,80, 100,20, 100,0] },
  					161, mina.easein);
					
					jQuery("#post-" + idx + " .entry-header .entry-title a")[0].click();
					
			break;
			default:

			break;
		}
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
var socialIter = 0;

	function loadSocialMenuFooter(asset, loaded){
		
		var sStr = "svg-social-menu";
							renderSocialMenu(sStr);	
       	
	}

	function renderSocialMenu(container) {
							paper = Snap.select("#" + container);
					
						//var bgRect = paper.rect( (window.innerWidth * -2),50,(window.innerWidth * 4),5).attr({
						var bgRect = paper.rect( 0,10,(window.innerWidth * 4),5).attr({
								fill : "#e6dcdc",
								id : "background-line"
						});
						
						//paper.append(bgR)
						//var coverRect = paper.rect( (window.innerWidth * -2),0,(window.innerWidth * 4),130).attr({
						var coverRect = paper.rect( 0,0,(window.innerWidth * 4),30).attr({
							fill : "#ffffff",
							opacity : "0",
							id : "background-cover"
						});
						//console.log("socialAssets ", socialAssets.length);
						
						var bIter = 0;

						for(social in externalAssets[container]) {
							//console.log("socialAssets:: ", socialAssets[social]["socialAsset"].node.id, bIter);

								// socialAssets[social]["socialAsset"].select("svg").attr({
								// 			x : 10 * bIter + "%"
							
								// });
								paper.append(externalAssets[container][social]["asset"]);

							var socialButtonAsset = paper.select("#" + externalAssets[container][social]["asset"].node.id);
								socialButtonAsset.addClass("social-menu-button");
								socialButtonAsset.attr({ x : -42 + (13 * bIter) + "%" });
							
								socialButtonAsset.select("g").mouseover(socialMenuHandle);
								socialButtonAsset.select("g").mouseout(socialMenuHandle);
								socialButtonAsset.select("g").mousedown(socialMenuHandle);
								socialButtonAsset.select("g").mouseup(socialMenuHandle);
								socialButtonAsset.select("g").touchstart(socialMenuHandle);
								socialButtonAsset.select("g").touchend(socialMenuHandle);
		
							bIter++;
						}



	}

	function renderGoogleMap() {

      	jQuery("#map-canvas").css({ 
      		"width" : (window.innerWidth + "px"),
      		"height" : "600px"
      	});
      	
      	var mapstyle = [
  				{
    				featureType: 'landscape.man_made',
    				elementType: 'geometry.fill',
    				stylers: [
      					{ color: '#faeeee' }
    				]
  				},{
    				featureType: 'water',
    				elementType: 'geometry.fill',
    				stylers: [
      					{ color: '#edf0f5' }
    				]
  				},{
    				featureType: 'road.local',
    				stylers: [
      					{ color: '#ffffff' }
    				]
  				},{
    				featureType: 'transit.line',
    				stylers: [
      					{ color: '#D4C978' },
      					{ lightness: 56 }
    				]
  				},{
    				featureType: 'poi.park',
    				elementType: 'geometry.fill',
    				stylers: [
      					{ color: '#4ca984' },
      					{ lightness: 56 }
    				]	
  				}
			];

        var mapOptions = {
          center: { lat: 52.3670513, lng: 4.9024593}, 
          zoom: 15,
          styles : mapstyle,
          zoomControl: true,
    	  zoomControlOptions: {
        		position: google.maps.ControlPosition.RIGHT_TOP
    		}
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var marker = new google.maps.Marker({
  			position: { lat: 52.3728883, lng: 4.9024593 },
  			map: map,
			}); //icon: iconBase + 'schools_maps.png'
      
      }

	/* social button event handler */ 
	function socialMenuHandle(event) {
			
				paper = Snap("#" + event.target.farthestViewportElement.id);
				var elem = paper.select("#" + event.target.nearestViewportElement.id);
				//console.log("over social ", event.target.nearestViewportElement.id);
				switch(event.type) {
							case "mouseover":
								//console.log("over social ", event.target.farthestViewportElement.id);
								//console.log("over social ", event.target.nearestViewportElement.id);
								elem.select("#circleback").transform("s1.5");
								elem.select("#circlefront").transform("s1.3");
							break;

							case "mouseout":
								elem.select("#circleback").transform("s1");
								elem.select("#circlefront").transform("s1");
							break;

							case "mousedown":
								elem.select("#circleback").transform("s1.5");
								elem.select("#circlefront").transform("s1.5");
							break;
							case "mouseup":
								elem.select("#circleback").transform("s1.6");
								elem.select("#circlefront").transform("s1");
								console.log("click ", event.path[2].id);
								jQuery("a[title='" + event.path[2].id + "']")[0].click();
									
							break;
							case "touchstart":
								elem.select("#circleback").transform("s1.5");
								elem.select("#circlefront").transform("s1.5");
							break;

							case "touchend":
								elem.select("#circleback").transform("s1.6");
								elem.select("#circlefront").transform("s1");
							break;

							default:
									console.log("default ", event);
							break;

				}
	}
		