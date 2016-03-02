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

/* load an asset list and return it as a named object */
	function loadAssets(assetList, container) {
			
			//console.log("load container ", container);
			var strippedContainerStr = container;
			if( jQuery.isNumeric(container.substr(container.lastIndexOf("-")+1)) )
				{
					strippedContainerStr = strippedContainerStr.substr(0, container.lastIndexOf("-"));
					//console.log("multiple items: ", strippedContainerStr);
				}
			else
			{
				//console.log("single item");
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
																	//console.log("post!! loaded list ", a);
																	loadPostControls(fragment, a);

														break;

														case "#svg-gallery-controls":
																//dbl check if i m still using this
																//console.log("svg-gallery-controls loaded list", a, container);
																//drawPostControls(container, fragment, a);
														break;
														case "#svg-social-menu":
																//dbl check if i m still using this
																console.log("svg-social menu loaded list", a, container);
																	loadSocialMenuFooter(fragment, a);
														break;
														default:
																console.log("not caught: ",strippedContainerStr);
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
					console.log("page type ", pageType);
					console.log("theme path ", themePath);
			}
			//console.log("header img ", headerImg);
			//renderMenu("#svg-menu");
			rerenderHeaderLogo();
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
				loadList = [ 
						themePath + 'logo.svg',
						themePath + 'logo-background.svg'
						];
			
			console.log("logoload ", loaded, loadList.length);// asset.node.id

			
			if(loaded < 1 || loaded == undefined) {
					
       				loadAssets(loadList, pStr);

       		} else if(loaded > loadList.length) {
       			paper.attr({ viewBox: "0 0 300 489" }); //400

       			paper = Snap(pStr);
       			console.log("asset id: ", asset.node.id)
       			switch(asset.node.id) {
       				case "logo-background":

       						headerImg[0] = asset;
       						//paper.append(asset);
       						if(headerImg.length > 1) {
       							//paper.g(headerImg);
       							paper.append(headerImg[0]);
       							paper.append(headerImg[1]);
       						}
       				break;
       				case "logo":
       						headerImg[1] = asset;
       						//paper.prepend(asset);
       						if(headerImg.length > 1) {
       							//paper.g(headerImg);
       							paper.append(headerImg[0]);
       							paper.append(headerImg[1]);
       						}
       				break;
       				default:
       						//paper.append(asset);
       				break;
       			}
       			
       			
			
				// not setting the viewbox for responsive love, as we are using the straight svg and two viewboxes make everything weird
				
				
				//now lets check windowsize and scale and position the logo and its background
				repositionLogo(pStr);
			}
	}
	function rerenderHeaderLogo(){
			var lStr = "#site-logo";
				paper = Snap.select(lStr);
			
				console.log("add to header : ", headerImg.length, lStr);
			for(b = 0; b < headerImg.length; b++) { 
				paper.append(headerImg[b]);
				console.log("added to header : ", b);
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
       		
		} else if(loaded >= loadList.length) {
				/* select svg object */
       	
				paper = Snap(mStr);

       		
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
       			//console.log("asset title and id ", asset.select("title").node.textContent,loaded);
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
					if(postAssets["paginator"]["complete"] == false || postAssets["play-button"]["complete"] == false || postAssets["more-button"]["complete"] == false || postAssets["next-button"]["complete"] == false || postAssets["previous-button"]["complete"] == false) {
													// keep looping
													console.log("timerloop ", cStr);
												//	drawPostControls(cStr);
												} else {
													/* if more make more button */
													postAssets["more-button"]["postAsset"].select("g").transform("s0.61");
													//postAssets["more-button"]["postAsset"].mouseup(postHandle);
													paper.append(postAssets["more-button"]["postAsset"].node.cloneNode(true) );
													/* if slideshow make paginator and next previous buttons */
													//paper.append(postAssets["paginator"]["postAsset"].node.cloneNode(true) );
													//paper.append(postAssets["next-button"]["postAsset"].node.cloneNode(true) );
													//paper.append(postAssets["previous-button"]["postAsset"].node.cloneNode(true) );
													/* if video make play button*/
													//paper.append(postAssets["play-button"]["postAsset"].node.cloneNode(true) );
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
		loadList = ["facebook", "twitter", "linkedin", "behance", "vimeo", "pinterest", "skype"];
		//iterate = 0;
		//paper.attr({ viewBox: "0 0 100 100" });

		var sStr = "#svg-social-menu";
			//postControls = {asset.id : asset};
			if(loaded < 1 || loaded == undefined) {
				/* load button svg */
				loadList = [ 
						themePath + 'social-facebook-n.svg',
						themePath + 'social-twitter-n.svg',
						themePath + 'social-linkedin-n.svg',
						themePath + 'social-behance-n.svg',
						themePath + 'social-vimeo-n.svg',
						themePath + 'social-pinterest-n.svg',
						themePath + 'social-skype-n.svg',
						];

				socialAssets['social-facebook-n'] = { "socialAsset" : asset, "complete" : false };
				socialAssets['social-twitter-n'] = { "socialAsset" : asset, "complete" : false };
				socialAssets['social-linkedin-n'] = { "socialAsset" : asset, "complete" : false };
				socialAssets['social-behance-n'] = { "socialAsset" : asset, "complete" : false };
				socialAssets['social-vimeo-n'] = { "socialAsset" : asset, "complete" : false };
				socialAssets['social-pinterest-n'] = { "socialAsset" : asset, "complete" : false };
				socialAssets['social-skype-n'] = { "socialAsset" : asset, "complete" : false };

       			loadAssets(loadList, sStr);
       			console.log("loading " + loadList.length + " items " +  sStr);
       		
       		/* assets are loaded, put into a container */ 
			} else if(loaded > 0) {
				/* select svg object */
       			//cStr += "-";loadList.length
       			//cStr += container;
       			//postAssets += {asset.id : asset};
       			//console.log("asset title and id ", asset.select("title").node.textContent,loaded);
       			socialAssets[asset.select("title").node.textContent] = { "socialAsset" : asset, "complete" : true };
       			// console.log("wtf:    ", socialAssets.length, asset.select("title").node.textContent);
       			if(socialIter >= (loadList.length-1) ) {
       						renderSocialMenu(sStr);	
       			}
       			//ugly solution
       			socialIter++;
       		}
		
	}

	function renderSocialMenu(container) {
							paper = Snap.select(container);
					
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
						for(social in socialAssets) {
							//console.log("socialAssets:: ", socialAssets[social]["socialAsset"].node.id, bIter);

								// socialAssets[social]["socialAsset"].select("svg").attr({
								// 			x : 10 * bIter + "%"
							
								// });

							paper.append(socialAssets[social]["socialAsset"]);

							var socialButtonAsset = paper.select("#" + socialAssets[social]["socialAsset"].node.id);
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
		