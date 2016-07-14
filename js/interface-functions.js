/* OOMPERIUM interface snap-svg & jquery & textwrap, googlemap */
/* overwriting the wordpress wordpress */

/* version 2.0 by OOMP/ o.o@oomp.nl */

/* we want one file query for the snapsvg calls (with added jQuery) 
	functions in order of appearance
*/ 

/* global variables */ 
	//for some responsive love, chache initial window width
	var initialWidth = jQuery(window).width();
	var initialHeight = jQuery(window).height();
	var deviceOrientation;
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
	var assetWaitForLoad = new Array();
	var fIdx = 0;
	//var loadFailLoop;
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
	var fluidMenuTimer;

	var postAssets = new Object();
	var socialAssets = new Object();
	
	var postControlsViewBoxStr = "0 0 300 350"; //470
	//featured gallery post specific counter
	var gIter = {};

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
			
			containerKey = "svg-menu";
			externalAssets[containerKey] = {};
			loadList = ["button-main", "vertical-menu"];
			
			for (i = 0; i < loadList.length; i++) {

					externalAssets[containerKey][loadList[i]] = { asset : "", loadstate : "start" };
					parentAsset[loadList[i]] = containerKey;
			}
			
			containerKey = "post";
			externalAssets[containerKey] = {};
			loadList = ['previous-button', 'next-button', 'play-button', 'more-button', 'paginator'];
			
			for (i = 0; i < loadList.length; i++) {

					externalAssets[containerKey][loadList[i]] = { asset : "", loadstate : "start" };
					parentAsset[loadList[i]] = containerKey;
			}
			containerKey = "site-logo";

			externalAssets[containerKey] = {};
			loadList = ["logo-background", "logo"];

			for (i = 0; i < loadList.length; i++) {
				externalAssets[containerKey][loadList[i]] = { asset : "", loadstate : "start" };

				parentAsset[loadList[i]] = containerKey;
			}// logo-background / logo-bg-tst
			
			containerKey = "svg-social-menu";
			externalAssets[containerKey] = {};
			loadList = [ "social-facebook", "social-twitter", "social-linkedin", "social-behance", "social-vimeo", "social-pinterest", "social-skype" ];

			for (i = 0; i < loadList.length; i++) {

					externalAssets[containerKey][loadList[i]] = { asset : "", loadstate : "start" };
					parentAsset[loadList[i]] = containerKey;
			}
			//console.log("object ", externalAssets);
			
			/* with the object defined lets start loading the assets */
			loadAssets();

			// lets check what device we re dealing with
			setDeviceDimensions();
	}

	/* load an asset list and return it as a named object */
	function loadAssets() {
			
			for(mod in externalAssets) {
					// ("module: ", mod);
					for(ass in externalAssets[mod]) {
						//console.log("	assets: ", themePath + ass + ".svg");
							
						//lets start loading assets
							Snap.load(themePath + ass + ".svg", loadEvent) 
					
					}
			}

	}

	function loadEvent(fragment) {
		//console.log("frag: ", fragment.node.id, parentAsset[fragment.node.id]);
						externalAssets[parentAsset[fragment.node.id]][ fragment.node.id ]["asset"] = fragment;
						externalAssets[parentAsset[ fragment.node.id ]][ fragment.node.id ]["loadstate"] = "complete";
								
								
								
	}

	function setDeviceDimensions() {
		if(jQuery(window).height() > jQuery(window).width()) {
				//console.log("portrait");
				deviceOrientation = "portrait";

			} else if (jQuery(window).width() > jQuery(window).height()) {
				//console.log("landscape");
				deviceOrientation = "landscape";
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
					//console.log("done: ", externalAssets);
			}
			//console.log("header img ", headerImg);
			//renderMenu("#svg-menu");
			//rerenderHeaderLogo();
			
			//console.log("buglist: headerlogoBG looadstate, clean rendermenu func" );
			headerLogoInit();

			renderMenuButtons("svg-menu", externalAssets["svg-menu"]['button-main']['asset']);
			renderVerticalMenu("svg-vertical-menu", externalAssets["svg-menu"]['vertical-menu']['asset']);
			renderGoogleMap();

			//console.log("WARNING:: ", assetWaitForLoad.length);
			for(f = 0; f < assetWaitForLoad.length; f++) {
				//console.log("WARNING:: ", assetWaitForLoad[f].asset, assetWaitForLoad[f].container, assetWaitForLoad[f].id, fIdx);
				switch(assetWaitForLoad[f].container)	{
					case "post":
					//externalAssets[pStr][ass]["loadstate"]
						//console.log("WARNING:: post/paginator ", assetWaitForLoad[f].asset, assetWaitForLoad[f].container, assetWaitForLoad[f].id, fIdx);
							drawPostControls(assetWaitForLoad[f].container + "-" + assetWaitForLoad[f].id);
							fIdx = 0;
					break;
					case "site-logo":
							//console.log("WARNING:: !site-logo found ", assetWaitForLoad[f].asset, assetWaitForLoad[f].container, fIdx);
							headerLogoInit();
					break;
					case "svg-social-menu":
							renderSocialMenu(assetWaitForLoad[f].container);
							//console.log("WARNING:: svg-social-menu ", assetWaitForLoad[f].asset, assetWaitForLoad[f].container, assetWaitForLoad[f].id, fIdx);
							fIdx = 0;
					break;
					default:
							//console.log("WARNING:: ", assetWaitForLoad[f].asset, assetWaitForLoad[f].container, assetWaitForLoad[f].id, fIdx);
					break;

				}
				
			}

			fluidHeaderLogo("load");
			horizontalFluidMenu();
	});

	jQuery(window).resize(function(){
	/*
		Resize handler
		one resize is fired on load by the fluid video fix in header.php

		reposition stuff, scale things
	*/
	setDeviceDimensions();
			//lets double check this event is never fired on a mobile device
			if(jQuery(window).width() != initialWidth) {
  						//Do something
			}
			//console.log("done: ", externalAssets);
			fluidHeaderLogo("resize");
			horizontalFluidMenu();

	});

	var scrollValue = 0;
	
	jQuery(window).scroll(function(){
	/*
		Resize handler
		one resize is fired on load by the fluid video fix in header.php

		reposition stuff, scale things
	*/
		var newScroll = jQuery(this).scrollTop();

		var direction;
		if (newScroll > scrollValue){
		//write the codes related to down-ward scrolling here
			direction = "down"
     	} else {
     	//write the codes related to upward-scrolling here
     		direction = "up"
     	}

     	scrollValue = newScroll;
		 //scrollValue += 1;
	// minify menu horizontally
		verticalFluidMenu(direction);
		fluidHeaderLogo(direction);
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
       			//console.log("header asset: ", ass, externalAssets[pStr][ass]["loadstate"]);
       				if(externalAssets[pStr][ass]["loadstate"] == "complete") {
							//externalAssets[pStr][ass]["asset"].transform("s5");
							paper.append(externalAssets[pStr][ass]["asset"]);
						//	paper.select("#" + ass).transform("s5");
							
					} else {
							//console.log("WARNING INTERVAL:: ", ass, externalAssets[pStr][ass]["loadstate"], fIdx);
							assetWaitForLoad[fIdx] =  { "asset" : ass, "container" : pStr };
							fIdx++;
							
							setTimeout(logoLoadWait, 4000);

					}	
       		}
       			
				
	}

	/* ------------------------------------
			header event handlers
	   ------------------------------------ */ 
	function logoLoadWait() {
	   			//	console.log("TIMERLOOP");
	   				headerLogoInit();
	   				fluidHeaderLogo("load");
	   				
	   }


	function fluidHeaderLogo(type) {
			//console.log("logo event ", type);
			
			/* set up the header logo for mobile and portrait modes */
				// bg y = -172 logo y = -61
				//console.log("what sort of resolution are we at:: ", initialWidth, initialHeight);
			/* set up the header logo for desktop and landscape modes */
			
			var windowWidth = jQuery(window).width();
			var windowHeight = jQuery(window).height();
			//var devicePixelRatio = window.devicePixelRatio;
			
			var logoPos;
			var logoBgPos
			switch(deviceOrientation) {
				case "portrait":
						//console.log("portrait", deviceOrientation);
						logoPos = { x : "73", y : "-181" };
						logoBgPos = { x : "-62", y : "-281" };
				break;
				case "landscape":
						//x = windowiwdth / 33?
						logoPos = { x : (windowWidth / 33), y : "56" };
						//x = windowiwdth / 15?
						logoBgPos = { x : (windowWidth / -15), y : "-52" };
						//console.log("landscape", deviceOrientation);
				break;
			}
			var opacityVal = 1;
			var logoPaper = Snap("#site-logo");

			var logoBg = logoPaper.select("#logo-background");
			//var logoBg = logoPaper.select("#logo-bg-tst");
			var logo = logoPaper.select("svg#logo");

			var coverShards = logoPaper.select("#cover");
			var yellowShard = logoPaper.select("#shard-yellow");
			var yellowShard2 = logoPaper.select("#shard-yellow-2");
			var greenShard = logoPaper.select("#shard-green");
			var blueShard = logoPaper.select("#shard-blue");
			var blackShard = logoPaper.select("#shard-black");
			var redShard = logoPaper.select("#shard-red");

			var logoOOMP = logoPaper.select("#oo");
			var logoMP = logoPaper.select("#mp");

			var transformStr;
				logoPaper.attr({ width : "300", height : "489"});
				//console.log("logo calls: ", type);
				
				if(logo == null) {
								//console.log("No LOGO ");
				} else {
								logo.attr({ x : logoPos.x, y : logoPos.y});
				}
							
				if (logoBg == null) {
								//console.log("no logo BG ");	
				} else {
								logoBg.attr({ x : logoBgPos.x, y : logoBgPos.y, width : "1200", height : "1200"});
				}

			switch(type) {
				case "load":
								//logo.attr({ x : logoPos.x, y : logoPos.y});
								//logoBg.attr({ x : logoBgPos.x, y : logoBgPos.y, width : "1200", height : "1200"});
				break;
				case "down":
							//logo.animate({ transform : "s3" }, 61);
							logoOOMP.animate({ transform : "t0 -42 s0.61 0.61" }, 61);
							logoMP.animate({ transform : "t0 -62 s0.66 0.66" }, 61);
							
										transformStr = { cover : "t0,-130", yellow : "t0,-70", green : "t0,-100", blue : "t0,-130", black : "t0,-260", red :"t0,-90" };
							
							if(jQuery(window).scrollTop() > 350) {
										transformStr = { cover : "t0,-160", yellow : "t0,-100", green : "t0,-130", blue : "t0,-160", black : "t0,-290", red :"t0,-120" };
							}

							if(jQuery(window).scrollTop() > 550) {
										transformStr = { cover : "t0,-290", yellow : "t0,-230", green : "t0,-260", blue : "t0,-290", black : "t0,-420", red :"t0,-250" };
							}

							if (logoBg == null) {
									//console.log("no BG LOGO ");	
							} else {
									coverShards.animate({transform : transformStr.cover, opacity : "0" }, 61);
						
									yellowShard2.animate({ opacity : "0.35" }, 61);
									// temporary removal of multiply for firefox
									yellowShard2.removeClass("background-logo-cls-3");
									// temporary removal of multiply for firefox
									yellowShard.removeClass("background-logo-cls-3");
									yellowShard.animate({transform : transformStr.yellow, opacity : "0.35" }, 61);
									//greenShard.animate({transform : "s1,0.72,0,130", opacity : "0.35" }, 61);
									// temporary removal of multiply for firefox
									greenShard.removeClass("background-logo-cls-3");
									greenShard.animate({transform : transformStr.green, opacity : "0.35" }, 61);
									//blueShard.animate({transform : "s1,0.72,0,130", opacity : "0.35" }, 61);
									blueShard.removeClass("background-logo-cls-3");
									blueShard.animate({transform : transformStr.blue, opacity : "0.35" }, 61);
									//blackShard.animate({transform : "s1,0.72,0,130", opacity : "0.35" }, 61);
									blackShard.removeClass("background-logo-cls-3");
									blackShard.animate({transform : transformStr.black, opacity : "0.35" }, 61);
									//redShard.animate({transform : "s1,0.72,0,130", opacity : "0.35" }, 61);
									redShard.removeClass("background-logo-cls-3");
									redShard.animate({transform : transformStr.red, opacity : "0.35" }, 61);
						
							}
							
							
						//console.log("logo scroll down " + jQuery(window).scrollTop() );
						
				break;
				case "up":
						
						//console.log("logo scroll up " + jQuery(window).scrollTop() );
						//	logo.animate({ transform : "s2" }, 61);
							logoOOMP.animate({ transform : "t0 0 s1 1" }, 61);
							logoMP.animate({ transform : "t0 0 s1 1" }, 61);
							
							if (logoBg == null) {
									//console.log("no BG LOGO ");	
							} else {
									if(jQuery(window).scrollTop() < 500) {
										coverShards.animate({transform : "t0,0", opacity : "1" }, 201);
									
										yellowShard2.animate({ opacity : "1" }, 201);
										yellowShard2.addClass("background-logo-cls-3");
										yellowShard.animate({transform : "t0,0", opacity : "1" }, 201);
										yellowShard.addClass("background-logo-cls-3");
										greenShard.animate({transform : "t0,0", opacity : "1" }, 201);
										greenShard.addClass("background-logo-cls-3");
										blueShard.animate({transform : "t0,0", opacity : "1" }, 201);
										blueShard.addClass("background-logo-cls-3");
										blackShard.animate({transform : "t0,0", opacity : "1" }, 201);
										blackShard.addClass("background-logo-cls-3");
										redShard.animate({transform : "t0,0", opacity : "1" }, 201);
										redShard.addClass("background-logo-cls-3");
								}
							}
							


				break;
				case "time":

						//console.log("logo timer " );
				break;
				case "resize":
							//console.log("logo resize " + windowWidth, windowHeight);
							//checking to see if the logo is complete when we try animate
							if(logo == null) {
								//console.log("No LOGO ");
							} else {
								logo.attr({ x : logoPos.x, y : logoPos.y});
							}
							
							if (logoBg == null) {
									//console.log("no logo BG ");	
							} else {
									logoBg.attr({ x : logoBgPos.x, y : logoBgPos.y, width : "1200", height : "1200"});
							}
							
							
												
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


	function menuInit(container, asset, loaded) {
		/* render the main menu using snap svgs */ 

		/* select svg object string */	
		var mStr = "svg-menu";
				/* select svg object */
			paper = Snap("#" + mStr);	
			


    	   	/* backgroundrender */
       		var pWidth = 1000, pHeight = 100, pX = 0, pY = 21; 
			
			paper.attr({
				"viewBox" : pX + " " + pX + " " + pWidth + " " + pHeight
			});
			var bgRect = paper.rect(pX,pY,pWidth,pHeight).attr({
								fill : "#EDF0F5",
								id : "menu-bg-rect"
							});
			
			var lineTop = paper.line(pX,pY, pWidth,pY).attr({
								fill : "none",
								stroke : "#D47878",
								strokeWidth : 0.25,
								id : "menu-bg-line-top"
							});

			var lineBottom = paper.line(pX,pHeight + pY, pWidth,pHeight + pY).attr({
									fill : "none",
									stroke : "#D47878",
									strokeWidth : 0.25,
									id : "menu-bg-line-bottom"
							});
			var bg = paper.group(bgRect, lineTop, lineBottom).attr({
					id : "menu-bg"
			});

			//lets add some handlers to the background to expand the menu on mouseover
				bg.mouseover(verticalFluidMenu);
				bg.mouseout(verticalFluidMenu);
				bg.touchstart(verticalFluidMenu);
				bg.touchend(verticalFluidMenu);
				
				//prepend menu bg
				paper.append(bg);
			////console.log("SEE ME ONCE? do menu? ", externalAssets[mStr]['button-main']['loadstate']);
			//renderMenuButtons(mStr, externalAssets[mStr]['button-main']['asset']);
			
			// lets collapse the menu after a while 
			fluidMenuTimer = setTimeout(function(){ verticalFluidMenu("down"); }, 10000);
					
	}

	function renderVerticalMenu(container, asset) {
		//render the vertical menu ()
			paper = Snap("#" + container);
			
			var buttons = new Array();

			var mIter = 0;
			var sIter = 0;

			var lastIdx;

			//check the lazy loader first	
			if(externalAssets["svg-menu"]["vertical-menu"]["loadstate"] == "complete") {
				var menuAsset = asset;
					
					paper.append( menuAsset ); 

					for(b = 0; b < menuItems.length; b++) { 			
					//if parent == 0 it's a main menu item. Parent contains the parent idx
						if(menuItems[b].parent == 0) {
							console.log("main-menu", menuItems[b].title);
							var buttonGroup = paper.select("#main-button-group").clone();
								buttonGroup.select("text").attr({
									"text" : menuItems[b].title,
								});

								buttonGroup.transform("t0," + (50 * b));


							//main menu
								// clone asset & append to stage
							
								//buttonAsset.id = "main-button-" + menuItems[b].idx;
								
								

									//"portfolio"
								
								paper.select("svg#vertical-menu g g#vertical-menu-group g#menu g#vertical-menu").append(buttonGroup);

						} else if(menuItems[b].parent > 0) {
							//sub menu
							console.log("sub-menu");
						}
					
					}
				
				
					paper.select("svg#vertical-menu g g#vertical-menu-group g#menu g#vertical-menu g#menu-expand-button g#main-button-group").attr("display", "none");

			} else {
			//console.log("TIMEOUT FOR MENU");
				setTimeout(menuButtonLoadWait, 3000, container, "vertical-menu");
		}


	}

	function renderMenuButtons(container, asset) {
		//render the menu ()
			paper = Snap("#" + container);
		//checking which menu to render
		//now lets setup the buttons
		//looping the menu object (set in header.php)
		
				var buttons = new Array();

				var mIter = 0;
				var sIter = 0;
				var lastIdx;


				
			//check the lazy loader first	
				if(externalAssets[container]["button-main"]["loadstate"] == "complete") {

					for(b = 0; b < menuItems.length; b++) { 			
					//if parent == 0 it's a main menu item. Parent contains the parent idx
						if(menuItems[b].parent == 0) {
						//main menu
		
							//set the button text
								asset.select("#text-front text").attr({
								text : menuItems[b].title
								});
							
								asset.select("#text-back text").attr({
									text : menuItems[b].title
								});
							
							// lets give it an id so we can find it later
								asset.select("g").attr({
									id : "button-" + menuItems[b].idx,
									"class" : "button-text-group"
								
								});

							//hide mobile menu assets parts for now
								asset.select("#quarter-button-bg").attr({
									"display" : "none"
								});

								asset.select("#mobile-collapse").attr({
									"display" : "none"
								});

							// clone asset & append to stage
							var buttonAsset = asset.node.cloneNode(true);
								buttonAsset.id = "main-button-" + menuItems[b].idx;
								
								

									//"portfolio"
								paper.append( buttonAsset ); 
							
							// tweak asset display on stage
							if(menuItems[b].title == "CASES") {	
								paper.select("#" + buttonAsset.id).attr({
										x : (300 * mIter + 50),
										y : -5,
										class : "main-menu-button active"
									});
							} else {
								paper.select("#" + buttonAsset.id).attr({
										x : (300 * mIter + 50),
										y : -5,
										class : "main-menu-button"
									});
							}
							//add handlers for functionality
								paper.select("#" + buttonAsset.id).mousedown(onMainMenu);
								paper.select("#" + buttonAsset.id).mouseup(onMainMenu);
							
							//select the cover to prevent multiple fires of the event and animation problems
								paper.select("#" + buttonAsset.id + " #button-" + menuItems[b].idx + " #hit-cover").mouseover(onMainMenu);
								paper.select("#" + buttonAsset.id).mouseout(onMainMenu);
								paper.select("#" + buttonAsset.id).touchstart(onMainMenu);
								paper.select("#" + buttonAsset.id).touchend(onMainMenu);
							
								mIter++;

					} else if(menuItems[b].parent > 0) {
							//sub menu
							var subParent = menuItems[b].parent;
							var subIdx = menuItems[b].idx;
							
							if(paper.select("#submenu-group-" + subParent) == undefined) {
								var subParentGroup = paper.group();
									subParentGroup.attr({
														"id" : "submenu-group-" + subParent,
														"class" : "submenu-group"
									});
							}
							var horizontal = 0;
							var horizontalOffset = 0;
								//console.log("subparent num: ",subParent);
							switch(subParent) {
								case "110":
										horizontal += 141; //19
										horizontalOffset = horizontal;
								break;
								case "114":
										horizontal += 451; // 49
										horizontalOffset = horizontal / 1.3;
								break;
								case "33":
										horizontal += 761; //79%
										horizontalOffset = horizontal / 1.3;
								break;
								//copy paste from here
								case "286":
										horizontal += 141; //19%
										horizontalOffset = horizontal;
								break;
								case "42":
										horizontal += 451; //49%
										horizontalOffset = horizontal / 1.3;
								break;
								case "39":
										horizontal += 761; //79
										horizontalOffset = horizontal / 1.3;
								break;
								case "211":
										horizontal += 761; //79
										horizontalOffset = horizontal / 1.3;
								break;
								case "573":
										horizontal += 761; //79
										horizontalOffset = horizontal / 1.3;
								break;
							}
								//horizontal += "%";
								//horizontalOffset += "%";
						
							//lets check if this is a new group of submenus and reset the iteration
							if(subParent !== lastIdx) {
									sIter = 0;
								}

							var vertical = 56 + (21 * sIter);
							//	vertical += "%";

							var subMenuTxt = paper.text(0, vertical, menuItems[b].title);
								subMenuTxt.attr({
													"font-weight" : "400",
													"font-family" : "Source Sans Pro, sans-serif",
													id : "sub-" + b
												}); //"font-size" : "2rem",
								subMenuTxt.addClass("main-menu-sub");

							var	subMenuRect = paper.rect(0, vertical, 90, 9).attr({
									id : "sub-coll-" + b,
									opacity : 0
								}); //subMenuRect.transform("t0,-6");

							var subMenuItem = paper.group(subMenuRect, subMenuTxt);
								subMenuItem.attr({
									id : "sub-option-" + subIdx,
									"class" : "sub-option",
									fill : "#D47878"
								});

								paper.select("g#submenu-group-" + subParent).append(subMenuItem);
								//paper.select("#submenu-group-" + subParent).transform("t" + horizontal + ",0");
								paper.selectAll("g#submenu-group-" + subParent + " g.sub-option > text").attr({ "x" : horizontal });
								paper.selectAll("g#submenu-group-" + subParent + " g.sub-option > rect").attr({ "x" : horizontal + 53 });

								paper.select( "#sub-option-" + subIdx ).click(onSubMenu);
								paper.select( "#sub-option-" + subIdx ).mouseover(onSubMenu);
								paper.select( "#sub-option-" + subIdx ).mouseout(onSubMenu);
								paper.select( "#sub-option-" + subIdx ).touchstart(onSubMenu);
								paper.select( "#sub-option-" + subIdx ).touchend(onSubMenu);
											
								
								sIter++;
								lastIdx = subParent;			
						}
					}
						////console.log("WARN menu bg corrected in renderMenuButtons ");
					var menubg = paper.select("#menu-bg");
						menubg.transform("s1,1,0");
		
		} else {
			//console.log("TIMEOUT FOR MENU");
					setTimeout(menuButtonLoadWait, 3000, container, "button-main");//menuButtonLoadWait(container,asset); //container	
		}
		
	}

	function menuButtonLoadWait(container, asset) {
		//	console.log("WARN MENU LOAD LOOP ", container, asset );
			renderMenuButtons(container,externalAssets[container][asset]["asset"]);
	}

	function verticalFluidMenu(val) {
		

		
		if(val.target !== undefined) {
			//console.log("responsive minify vertical ", val.target);
			val = "mouse";
		}

		/* on scroll, on timer, on mouseover!, on touchstart! */
		/* collapse the menu, scale down tekst, crossfade to bars */
		/* scale bg vertical */
		paper = Snap("#svg-menu");
		var background;
		var subMenu;
		switch(val) {
			case "mouse":
						background = paper.select("#menu-bg");
						background.animate({transform : "s1,1,0,26" }, 21);
					
						//subMenu = paper.selectAll("#svg-menu g.sub-option");
						subMenu = paper.selectAll("#svg-menu g.submenu-group");
						
						switch(deviceOrientation) {
							case "portrait":
												subMenu.animate({ transform : "t-190,80s1.25,1.23,110,52" }, 18);
							break;
							case "landscape":
											for(el = 0; el < subMenu.length; el++) {
												if(el >= 0) {
													subMenu[el].animate({ transform : "t0s1,1" }, 21);	
												}
												if(el >= 31) {
													subMenu[el].animate({ transform : "t0s1,1" }, 21);	
												}
												if(el >= (subMenu.length - 1)) {
													subMenu[el].animate({ transform : "t0s1,1" }, 21);	
												}
											}

							break;
						}

						subMenu = paper.selectAll("#svg-menu g.sub-option text").animate({
							opacity : "1"
						}, 21);
						subMenu = paper.selectAll("#svg-menu g.sub-option rect").animate({
							opacity : "0"
						}, 21);
						
						//console.log("fluidmenutimer ", fluidMenuTimer);
						fluidMenuTimer = setTimeout(function(){ verticalFluidMenu("down"); }, 10000);
			break;

			case "down":
				// lets scale the menu-bg as a whole
						background = paper.select("#menu-bg");
						background.animate({transform : "s1,0.5,0,26" }, 18);

					//	background = paper.select("#menu-bg-line-bottom");
					//	background.attr({"y1" : "99%", "y2" : "99%"}, 21);

						//subMenu = paper.selectAll("#svg-menu g.sub-option");
						subMenu = paper.selectAll("#svg-menu g.submenu-group");
						switch(deviceOrientation) {
							case "portrait":
												subMenu.animate({ transform : "t-190,80s1.25,1.23,110,52" }, 18);
							break;
							case "landscape":
												for(el = 0; el < subMenu.length; el++) {
															if(el >= 0) {
																		subMenu[el].animate({ transform : "t0s0.35,0.33,110,52" }, 18);	
															}
															if(el >= 1) {
																		subMenu[el].animate({ transform : "t190s0.35,0.33,110,52" }, 18);
								
															}
															if(el >= (subMenu.length -1)) {
																		//console.log("WARNING THIS 2 BREAKS THE 3rd MENU with more than 3 options")
																		subMenu[el].animate({ transform : "t380s0.35,0.33,110,52" }, 18);
									
															}
												}
						
							break;
						}

							
						subMenu = paper.selectAll("#svg-menu g.sub-option text").animate({
							opacity : "0"
						}, 18);
						subMenu = paper.selectAll("#svg-menu g.sub-option rect").animate({
							opacity : "1"
						}, 18);
					
						
			break;
		}
		
	}

	function horizontalFluidMenu() {

		/* on portrait screen and touch capable */
							
		paper = Snap("#svg-menu");

		switch(deviceOrientation) {
			case "portrait":
							/* set menu viewbox */
							paper.attr({
										"viewBox" : "0 0 1000 500"
							});

							paper.select("#menu-bg rect").animate({
																	"height" : 500,
																	"x" : 120,
							}, 161, mina.easein);
							paper.select("#menu-bg line#menu-bg-line-bottom").animate({
																						"x1" : 120,
																						"y1" : 516,
																						"y2" : 516
							}, 161, mina.easein);

							//#mobile-collapse to block
							
							paper.selectAll("svg.main-menu-button g#mobile-collapse").attr({
																							"display" : "block"
							});

							//#half-button-bg display to none
							paper.selectAll("svg.main-menu-button g path#half-button-bg").attr({
																								"display" : "none"
							});
							
							//#quarter-button-bg display to block
							paper.selectAll("svg.main-menu-button g path#quarter-button-bg").attr({
																									"display" : "block"
							});
							/* show only one option */
							//also set up rollover anim and visited
							var allOptions = paper.selectAll("svg.main-menu-button");

							/* move button and unhide in accordance */
							// svg#main-button-idx x = -25


							allOptions.animate({
												"x" : 250
							}, 161, mina.easein);

							var trackIndex = 0;
							for(all = 0; all < allOptions.length; all++) {
									var index = allOptions[all].attr("id").substr(allOptions[all].attr("id").lastIndexOf("-") + 1);
									
									//console.log("active? " + allOptions[all].attr("id"), jQuery("svg#" + allOptions[all].attr("id")).hasClass("active"), index);
									if(jQuery("svg#" + allOptions[all].attr("id")).hasClass("active")){
										//
										allOptions[all].attr({ "opacity" : 1 });
										paper.select("#submenu-group-" + index).attr({ "opacity" : 1});
										trackIndex = all;
									} else {
										allOptions[all].attr({ "opacity" : 0 });
										paper.select("#submenu-group-" + index).attr({ "opacity" : 0});
									}

							}

							paper.selectAll("svg.main-menu-button g.button-text-group").animate({
																								"transform" : "s6,6"
							}, 161, mina.easein);
							
							
						
							paper.selectAll("g.submenu-group g.sub-option > text").animate({
																			"x" : 750
							}, 161, mina.easein);
							paper.selectAll("g.submenu-group g.sub-option > rect").animate({
																			"x" : 753
							}, 161, mina.easein);

							paper.selectAll("g.submenu-group").animate({
																			"transform" : "t0,200s4,4"
							}, 161, mina.easein);
		
							
			break;
			case "landscape":
					/* put it all back */
					paper.attr({
										"viewBox" : "0 0 1000 130"
							});

							paper.select("#menu-bg rect").animate({
																	"height" : 100,
																	"x" : 0,
							}, 161, mina.easein);
							paper.select("#menu-bg line#menu-bg-line-bottom").animate({
																						"x1" : 0,
																						"y1" : 121,
																						"y2" : 121
							}, 161, mina.easein);

							paper.selectAll("svg.main-menu-button g#mobile-collapse").attr({
																							"display" : "none"
							});
		
							paper.selectAll("svg.main-menu-button g path#half-button-bg").attr({
																								"display" : "block"
							});
	
							paper.selectAll("svg.main-menu-button g path#quarter-button-bg").attr({
																									"display" : "none"
							});
/*
							paper.selectAll("svg.main-menu-button").animate({
																			//"x" : 250,
							}, 161, mina.easein);
		
							paper.selectAll("svg.main-menu-button g.button-text-group").animate({
																								"transform" : "s1,1"
							}, 161, mina.easein);
							
							paper.selectAll("g.submenu-group").animate({
																			"transform" : "t760,180s3.5,3.5",
							}, 161, mina.easein);
		
*/
			break;
		}
		//console.log("responsive minify horizontal: dont forget to turn the vertical fluid resize back on ", deviceOrientation);
		

	}

	function onMainMenu(event) {
						//console.log("event: ", event);
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
								
								//	console.log("out: ", parentId);
									elem = parent;
								
									elem = elem.select("#half-button-bg");//+ event.target.nearestViewportElement.childNodes[1].childNodes[1].id
									elem.animate({
											"stroke-width" : "0.25"
									}, 231, mina.easeout, animComplete);
									
							break;

							case "mousedown":
								//	console.log("down ", event.type);
									elem = paper.select("#" + event.target.nearestViewportElement.id);
									//elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[5].id);
									//elem.transform('t-5 -5 r180');
							break;
							case "mouseup":
								//	console.log("up ",  event.target.nearestViewportElement.children[2].children[3].children[0].innerHTML );
									elem = paper.select("#" + event.target.nearestViewportElement.id);
									//elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[5].id);
									//elem.transform('t0 0 r0');

									jQuery("a:contains(" + event.target.nearestViewportElement.children[2].children[3].children[0].innerHTML  + ")")[0].click();
							break;

							case "touchstart":
									//console.log("touch start", event.type);
							break;

							case "touchend":
								//	console.log("touch end", event.type);
									elem = paper.select("#" + event.target.nearestViewportElement.id);
									jQuery("a:contains(" + event.target.nearestViewportElement.children[2].children[3].children[0].innerHTML  + ")")[0].click();
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
				//console.log("submenu event: ", event);
				switch(event.type) {
							case "mouseover":
									//console.log("over ", event.type);
									this.attr({
										fill : "#a15b5b"
									});
						
							break;

							case "mouseout":
									//console.log("out ", event.type);
									this.attr({
										fill : "#d47878"
									});
							break;

							case "touchstart":
									//console.log("touch ", event.type);
							break;

							case "touchend":
									//console.log("touch ", event.type);
									jQuery("a:contains(" + event.target.firstChild.data	 + ")")[0].click();
							break;

							case "click":
									//console.log("click ", event.type, event.target.firstChild.data);
									jQuery("a:contains(" + event.target.firstChild.data	 + ")")[0].click();
							break;

							default:
									console.log("default ", event);
							break;


						}
		}

	function animComplete(event) {
		//	console.log("anim event: ", event);
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
		if(jQuery("body").hasClass("blog")) {
			wrapTextShape(stripIdx);
			fluidVideo(stripIdx);

			drawMask(stripIdx);

			// make a featured gallery slideshow
			featuredGallery(stripIdx);
			
		//the only function which should load things
			//console.log("stripped idx: ", stripIdx, container);

			drawPostControls(container); // container, loaded
		} else if(jQuery("body").hasClass("category")) {
			//console.log("category page! ")
			wrapTextShape(stripIdx);
			//fluidVideo(stripIdx);

			drawMask(stripIdx);

			// make a featured gallery slideshow
			featuredGallery(stripIdx);
			
		//the only function which should load things
			//console.log("stripped idx: ", stripIdx, container);

			drawPostControls(container); // container, loaded

		} else {
			console.log("unrecognised page! ")
			//hide the featured gallery
				jQuery("article#post-" + stripIdx + " div.entry-content img.feat-gallery").each(function( index, element ) {
				//jQuery("article#post-" + idx + " div.entry-content img.feat-gallery")[img].height;
				
					jQuery( element ).css({
						"display" : "none"
					});


				});
		}
	}

	function postLayout(idx) {
		
		/*	fix layout per post											*
		 *												*
		 *	attach this to reposition the post layout	*
		 *			 									*/

		//first lets make the container the height of only the text
		
		// a variable where various element heights and positions are collected to position content in the post
		var subtractVal = jQuery("article#post-" + idx + " div.entry-content div.paragraph-container").outerHeight();//jQuery("#svg-post-" + idx).height();
		
		var galleryPos = jQuery("article#post-" + idx + " div.entry-content div.paragraph-container div.text-wrapper div.text-wrap").length / 4; // gives us 7 lines
			//multiply with lineheight
			galleryPos *= parseInt(jQuery("article#post-" + idx + " div.entry-content div.paragraph-container p").css("line-height"));
		
			//setting the height to limit the text overflow and larger p messing up positions
			jQuery("article#post-" + idx + " div.entry-content div.paragraph-container").css({
						height : galleryPos + "px"
				});

			//for firefox use the svg and position it
		/*	jQuery("article#post-" + idx + " div.entry-content #svg-paragraph-cover-" + idx).css({ 
						"position" : "relative",
						"top" : (jQuery("article#post-" + idx + " div.entry-content div.paragraph-container p").outerHeight() * -1) + "px" });
		*/	
			//add a clip path to hide the text overflow
			jQuery("article#post-" + idx + " div.entry-content div.paragraph-container p").css({
						"-webkit-clip-path" : "polygon(0% 0%, 0% " + galleryPos + "px, 100% " + galleryPos + "px, 100% 0%)",
						"clip-path" : "polygon(0% 0%, 0% " + galleryPos + "px, 100% " + galleryPos + "px, 100% 0%)"
						
					});
					//"clip-path" : "url(#svg-paragraph-cover-" + idx + ")",
						
					//"mask" : "url(#paragraph-mask-" + idx + ")"


			//jQuery("article#post-" + idx + " div.entry-content div.paragraph-container p").outerHeight()

			//divide by two
			galleryPos /= 1.9;
			//console.log("line height::: ", jQuery("article#post-" + idx + " div.entry-content div.paragraph-container p").css("line-height"), jQuery("article#post-" + idx + " div.entry-content div.paragraph-container div.text-wrapper div.text-wrap").length);
		
			jQuery("article#post-" + idx + " div.entry-content div#gallery-cycler-" + idx).css({
					"top" : galleryPos * -1
				});
			
			//console.log("active image height:: " + jQuery("article#post-" + idx + " div.entry-content div#gallery-cycler-" + idx + " img.active-img").height() * -1 + "px");

			subtractVal = parseInt( jQuery("article#post-" + idx + " div.entry-content div.paragraph-container").height() );
			subtractVal *= 0.8;
			jQuery("#svg-gallery-controls-" + idx).css({
					"overflow-x" : "overlay",
					"top" : subtractVal * -1 + "px"
			});//

			subtractVal += jQuery("#svg-gallery-controls-" + idx).height();

			

			//lets position the featured slideshow

			//everything is in a div position the div not the images
			

/* deprecate? */

			jQuery("#post-" + idx + " .entry-content div.video-wrap").css({
					top : subtractVal * -0.9 + "px"
			});
			jQuery("#post-" + idx + " .entry-content div.slideshow-window").css({
					top : subtractVal * -0.9 + "px"
			});
			

			//subtractVal += jQuery("#post-" + idx + " .entry-content div.video-wrap").innerHeight();
			///subtractVal += jQuery("#post-" + idx + " .entry-content div.slideshow-window").innerHeight();

			//console.log("ratio 2.33333 ", jQuery("#post-" + idx).innerWidth());
			var wRatio = jQuery("#post-" + idx).innerWidth() * 1.61; //2.1
				wRatio = Math.ceil(wRatio / 10) * 10;

			jQuery("#post-" + idx).css({
					height :  wRatio * 0.9 + "px"
			});

			jQuery("#post-" + idx + " .entry-content").css({
					height : wRatio * 0.85 + "px"
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
/*
		//subtract svg-post height
			var resetHeight = 130; // 16 make this the margin top of .entry content
				resetHeight -=  jQuery("article#post-" + idx + " div.entry-content .svg-post").outerHeight();
			// subtract svg-gallery-controls-height
				resetHeight -= jQuery("article#post-" + idx + " div.entry-content .svg-gallery-controls").position().top;
				resetHeight -= jQuery("article#post-" + idx + " div.entry-content .svg-gallery-controls").outerHeight();

			// we need to position the gallery images to end up under the paragraph of text. So we well use half of the text height
				resetHeight -= jQuery("article#post-" + idx + " div.entry-content p").innerHeight() / 2;
				
			var pPos = jQuery("article#post-" + idx + " div.entry-content p").position();
				resetHeight += pPos.top /2;
				console.log( "pPOS  " + (pPos.top /2), jQuery("article#post-" + idx + " div.entry-content p").css("top") );
				
				//temp setting so i can see what i am doing
			
				jQuery("article#post-" + idx + " div.entry-content .svg-gallery-controls").css({
					"opacity" : 1
				});
				jQuery("article#post-" + idx + " div.entry-content .svg-post").css({
					"opacity" : 1
				});
			

			
		*/
		
			
	}

	function featuredGallery(idx){
		/* make the featured gallery out of an img list */ 
			jQuery("article#post-" + idx + " div.entry-content img.feat-gallery").each(function( index, element ) {
			
				//add a fade in (and out) timer function
				if(index == 0) {
				
					//let 's set the gIter counter for the first time for pagination iteration
					gIter[idx] = 0;

					//lets set a timer to cycle images
					//setInterval(featuredGalleryCrossFade, 10000, idx);
					setInterval(featuredGalleryCycle, 8000, idx);
					
				}
				//render a paginator per instance
				renderPaginator(idx, index);
			});

		// render control buttons next and previous or not?
	
	}

	function drawMask(idx) {
		/* dont worry we're just faking it with white fill overlays */

		// select the svg object
			/*paper = Snap('#svg-post-'+ idx);
			paper.attr({
				"viewBox" : "0 0 100 100"
			});*/

		//select the content, draw a mask polygon
		//draw some points
		var mPoints = [0,0, 0,50, 100,1, 100,0]; // 0,0, 0,100, 100,50, 100,0, 0,0
		
			//maskPolygon = paper.polygon(mPoints);								
			/*
			maskPolygon.mouseover(maskHandle);
			maskPolygon.mouseout(maskHandle);
			maskPolygon.mouseup(maskHandle);
			maskPolygon.touchstart(maskHandle);
			maskPolygon.touchend(maskHandle);
			maskPolygon.attr({
				fill : "#fff",
				id : "clips-" + idx,
			});
			*/								
			
			//.append(maskPolygon);


			// make a mask for the paragraph
			paper = Snap('#svg-paragraph-cover-'+ idx);
			paper.attr({
				"viewBox" : "0 0 100 100" 
			});

			maskPolygon = paper.polygon(mPoints);
			maskPolygon.attr({
				fill : "#ffffff",
				id : "paragraph-mask-" + idx,
			});
			//var paraMask = paper.mask(maskPolygon);
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
					viewBox : postControlsViewBoxStr,
					width : "100%"
				});//500

					//points="0,0,0,261,300,100,300,0" 0,0, 0,261, 300,100, 300,0
				var mPoints = [0,-35, 0,181, 300,0, 300,-35];
				if(paper.select("#white-tri-overlay-" + elemId) == undefined ) {
					var whiteTriangle = paper.polygon(mPoints);
						whiteTriangle.attr({
							fill : "#ffffff",
							id : ("white-tri-overlay-" + elemId)
						});

							paper.append(whiteTriangle);
				}
				/* draw white bottom rect */		
				if(paper.select("#white-rect-overlay-" + elemId) == undefined) {
					//console.log("active image height:: " + jQuery("article#post-" + elemId + " div.entry-content div#gallery-cycler-" + elemId + " img.active-img").height() );
					var rectPos = jQuery("article#post-" + elemId + " div.entry-content").innerWidth() / 1.333333; // assuming a 4:3 resolution
					var whiteOverlay = paper.rect("-1",rectPos,"304", "85"); //70 //300 - rectPos
						whiteOverlay.attr({
							fill : "#ffffff",
							id : ("white-rect-overlay-" + elemId)
						});

							paper.prepend(whiteOverlay);
					}
				
		/* draw transparent hotspot overlay trigger post link */
		//move this to the other svg to regain controls
				if(paper.select("#transparent-overlay-" + elemId) == undefined) {
					var transparentOverlay = paper.rect("0","0","300","210");
						transparentOverlay.attr({
							opacity : "0",
							id : ("transparent-overlay-" + elemId)
						});

					transparentOverlay.mouseover(postHandle);
					transparentOverlay.mouseout(postHandle);
					transparentOverlay.mousedown(postHandle);
					transparentOverlay.mouseup(postHandle);
					transparentOverlay.click(postHandle);
					transparentOverlay.touchstart(postHandle);
					transparentOverlay.touchend(postHandle);
				
				
				
						paper.append(transparentOverlay);
					}

					//set up a paginator group if there is none
					if(paper.select("#paginators-" + elemId) == undefined) {
							var paginators = paper.group().attr({
																"id" : "paginators-" + elemId
							});  
					}					
				
					/* if more make more buttons */
					for(ass in externalAssets["post"]) {
									
									//postAssets["more-button"]["postAsset"].select("g").transform("s0.61");
									
									//console.log("asset: ", ass, externalAssets["post"][ass]['loadstate']);
									
									if(externalAssets["post"][ass]['loadstate'] == 'complete') {
										if(paper.select("#" + ass) == undefined) {
												//console.log("adding a gallery control:: ", ass, paper.select("#" + ass));
												switch(ass) {
													case "play-button":
														//don't append, featured gallery does not work with video
													break;
													case "paginator":

														if(jQuery(cStr + " #paginator-0").length < 1) {
															for(p = 0; p < jQuery("article#post-" + elemId + " div.entry-content div#gallery-cycler-" + elemId + " img.feat-gallery").length; p++){
																renderPaginator(elemId, p);
															}
														}
														
													break;
													case "previous-button":
														paper.append(externalAssets["post"][ass]['asset'].node.cloneNode(true));	
														paper.select(cStr + " #" + ass + " g").transform("s0.61");
														paper.select(cStr + " #" + ass + "").attr({
																									"y" : "42%",
																									"x" : "-8%",
																									"display" : "none"
																								});
													break;
													case "next-button":
														paper.append(externalAssets["post"][ass]['asset'].node.cloneNode(true));	
														paper.select(cStr + " #" + ass + " g").transform("s0.61");
														paper.select(cStr + " #" + ass + "").attr({
																									"y" : "42%",
																									"display" : "none"
																								});
													break;
													case "more-button":
														//more-button or next-button or previous-button
														paper.append(externalAssets["post"][ass]['asset'].node.cloneNode(true));	
														//lets tweak the size now
														paper.select(cStr + " #" + ass).attr({"y" : "86%", "x" : "37%"}); //y = 72%
														
														if(jQuery("body").hasClass("category")) {
															paper.select(cStr + " #" + ass + " g").transform("s0.61");
														} else {
															paper.select(cStr + " #" + ass + " g").transform("s0.61");
														}
														
														
														paper.select(cStr + " #" + ass + " g").mouseover(moreHandle);
														paper.select(cStr + " #" + ass + " g").mouseout(moreHandle);
														paper.select(cStr + " #" + ass + " g").mousedown(moreHandle);
														paper.select(cStr + " #" + ass + " g").mouseup(moreHandle);
														paper.select(cStr + " #" + ass + " g").touchstart(moreHandle);
														paper.select(cStr + " #" + ass + " g").touchend(moreHandle);
				
														// add a handle function and on click do:
														//jQuery("a[title='" + event.path[2].id + "']")[0].click(); or something along these lines

													break;
													default:
														//more-button or next-button or previous-button
														paper.append(externalAssets["post"][ass]['asset'].node.cloneNode(true));	
														//lets tweak the size now
														paper.select(cStr + " #" + ass + " g").transform("s0.61");

													break;
												}
												
										}
									} else {
										//console.log("WARNING POST CONTROLS NOT LOADED YET TIMER LOOP NEEDED:: ", ass, externalAssets["post"][ass]['loadstate']);
										assetWaitForLoad[fIdx] = {"asset" : ass, "container" : "post", "id" : elemId};
										fIdx++;

									}
									
					}
													//postAssets["more-button"]["postAsset"].mouseup(postHandle);
													//paper.append(postAssets["more-button"]["postAsset"].node.cloneNode(true) );
													/* if slideshow make paginator and next previous buttons */
													//paper.append(postAssets["paginator"]["postAsset"].node.cloneNode(true) );
													//paper.append(postAssets["next-button"]["postAsset"].node.cloneNode(true) );
													//paper.append(postAssets["previous-button"]["postAsset"].node.cloneNode(true) );
													/* if video make play button*/
													//paper.append(postAssets["play-button"]["postAsset"].node.cloneNode(true) );
											
					//console.log("elemId? ", elemId);
					postLayout(elemId);
	}


	function renderPaginator(idx, num) {
			
			//set up a paginators group if none exists
			if(Snap.select("#paginators-" + idx) == undefined) {
							paper = Snap("#svg-gallery-controls-" + idx);
						
						var paginators = paper.group().attr({
															"id" : "paginators-" + idx
										});  
			}
			
			paper = Snap("#paginators-" + idx);//svg-gallery-controls-
			var totItems = jQuery("article#post-" + idx + " div.entry-content div#gallery-cycler-" + idx + " img.feat-gallery").length;
				//totItems += 1;

			var wVal = postControlsViewBoxStr.split(" ");
			var hVal = parseInt(wVal[3]);
				wVal = parseInt(wVal[2]);

			//console.log("paginator ", idx, num, totItems );
			

			if(externalAssets["post"]["paginator"]['loadstate'] == 'complete') {
		
				var paginatorAsset = externalAssets["post"]["paginator"]['asset'].node.cloneNode(true)
					paginatorAsset.id = "paginator-" + num;
					
					paper.append(paginatorAsset);

					
					var paginator = paper.select("#paginator-" + num).attr({
						"x" : ( num * 25 ),
						"cursor" : "pointer"
					});
						paginator.mouseover(paginate);
						paginator.mouseout(paginate);

						paginator.mousedown(paginate);
						paginator.mouseup(paginate);

						paginator.touchstart(paginate);
						paginator.touchend(paginate);
				
					if(num == 0) {
							//leave selected
					} else {
							paper.select("#svg-gallery-controls-" + idx + " #paginator-" + num + " g#paginator-radio circle#paginator-selected").attr({
							"r" : "0"
							});
					}
					
					var pWidth = (29) * num
					
					if(jQuery("body").hasClass("category")) {
															//not scaling a little aswell 
															paper.transform("t" + (wVal / 2 - pWidth / 2) + "," + (hVal * 0.76) ); //0.61
															//paper.transform("s0.5t" + (wVal - pWidth) + "," + (hVal * 1.42) );
													} else {
															paper.transform("t" + (wVal / 2 - pWidth / 2) + "," + (hVal * 0.76) );
													}
														
				//paper.attr();
			} else {
				//console.log("WARNING:: paginator not complete timerloop needed ", externalAssets["post"]["paginator"]['loadstate'], idx);
					assetWaitForLoad[fIdx] = {"asset" : "paginator", "container" : "post", "id" : idx};
					fIdx++;
			}
				
	}

	function wrapTextShape(idx) {
		/* wrap a paragraph diagonally using a series of div left and right */

		var postElem = jQuery("article#post-" + idx);
			
		
			
				// find p elements get width and height and number of lines
				var lineNum = 0;

				var pWidth = postElem.width();
				var pHeight = 0;
					//check the first character in the p element to see what is in there. 
				var conCheck = '';
				postElem.children("div.entry-content").children("div.paragraph-container").children("p").each(function(){
				
				conCheck = postElem.html(); //str.charAt(0)
				conCheck = conCheck.charAt(0);
				//console.log("conCheck ", conCheck);
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
							
							lineNum += Math.floor(postElem.height() / parseInt(postElem.css("line-height").replace('px','')));
							pHeight += postElem.height(); 
							//console.log("p-content: ", lineNum, pHeight);
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
					
				}
				str += '<div class="text-wrap" style="float:left;clear:left;height:' + pHeight / lineNum + 'px;width:' + 0 + 'px"></div>'; //background:red;border:solid 2px green;
				str += '<div class="text-wrap" style="float:right;clear:right;height:' + pHeight / lineNum  + 'px;width:' + factor + '%"></div>'; //background:green;border:solid 2px red;
				
			}
			str += '</div>';
			//stuff goes wrong here
			jQuery("article#post-" + idx + " div.entry-content p").first().before(str);
			//lets clip the paragraph with the svg poly in the svg-post
		/*
			jQuery("article#post-" + idx + " div.entry-content p").first().css({
					"clip-path" : "polygon(0% 0%, 15% 0%, 15% 100%, 0% 100%)"
			});//"url('#svg-post-" + idx + "')"
		*/
			
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

	function paginate(event) {
		//console.log("paginate", event);
		var paginatorInstance;
		var paginatorContainer;

		var parentId;
		var imgId;

		switch(event.type){
			case "mouseover":
						console.log("paginate over: ", event.fromElement.nearestViewportElement);
			break;
			case "mouseout":
						console.log("paginate out: ", event.fromElement.nearestViewportElement);
			break;
			case "mousedown":
						console.log("paginate mousedown: ", event)//.srcElement.nearestViewportElement.id);
			break;
			case "mouseup":

							parentId = event.srcElement.farthestViewportElement.id;
							parentId = parentId.substr( parentId.lastIndexOf("-") + 1 );

						
						var active = jQuery('#gallery-cycler-' + parentId + ' .active-img');

							imgId = event.srcElement.nearestViewportElement.id;
							imgId = imgId.substr( imgId.lastIndexOf("-") + 1);

						var activate = jQuery("#gallery-cycler-" + parentId + " img").eq(imgId);
							activate.css("z-index", 2);
							activate.addClass("active-image");

							active.fadeOut(1100,function(){//fade out the top image
      						active.css('z-index',1).show().removeClass('active-img');//reset the z-index and unhide the image
      						activate.css('z-index',3).addClass('active-img');//make the next image the top one
      						paginatorInstance = Snap.select("#svg-gallery-controls-" + parentId + "#paginators-" + parentId + " .active-paginator #paginator-radio #paginator-selected").animate({ r : 0.1 }, 101, mina.easein);
      						paginatorInstance = Snap.select("#svg-gallery-controls-" + parentId + "#paginators-" + parentId + " .active-paginator").removeClass("active-paginator");
      						
      						//paginatorContainer.
      						//paginatorContainer = paginatorContainer.select();
      						paginatorInstance = Snap.select("#svg-gallery-controls-" + parentId + " #paginators-" + parentId + " #paginator-" + imgId).addClass('active-paginator');	
      						paginatorInstance = Snap.select("#svg-gallery-controls-" + parentId + " #paginators-" + parentId + " #paginator-" + imgId + " #paginator-radio #paginator-selected").animate({ r : 4.5 }, 101, mina.easein);
      					});
						//var slideImages 
						console.log("paginate mouseup: ", parentId, imgId);
			break;
			default:
						console.log("paginate default: ", event.type, event.fromElement.nearestViewportElement.id);
			break;
		}
/*
		var active = jQuery('#gallery-cycler-' + idx + ' .active-img');
				var next = (active.next().length > 0) ? active.next() : jQuery('#gallery-cycler-' + idx + ' img:first');
      				next.css('z-index',2);//move the next image up the pile
      				active.fadeOut(1100,function(){//fade out the top image
      				active.css('z-index',1).show().removeClass('active-img');//reset the z-index and unhide the image
      				next.css('z-index',3).addClass('active-img');//make the next image the top one
      				*/
	}

	function postHandle(event) {
		/* 
				the handler for the post cover :: svg-gallery-controls 
		*/ 
		
		/* control text clipping wrap? */
		var idx = event.target.farthestViewportElement.id;
		//concat the last idx string from the id
			idx = idx.substr(idx.lastIndexOf("-") + 1);

			//console.log("ev: ", idx, event.target.farthestViewportElement.id);
			var mask = Snap("#white-tri-overlay-" + idx);	

		switch(event.type) {
			case "mouseover":
					/* animate to off :: clipping mask */
					mask.animate(
  					{ points: [0,-20, 0,-20, 300,-20, 300,-20] },
  					61, mina.easeout);

  					//lets also switch z-index quick to fake some things
  					jQuery("#gallery-cycler-" + idx).css({ "z-index" : 5});
  					//[0,0, 0,261, 300,100, 300,0]
  					//[0,0, 0,1, 100,1, 100,0]
					/* animate to off :: text-wrap divs */

					/* animate clip-path on paragraph */
				/*	jQuery("article#post-" + idx + " div.entry-content p").css({
						"-webkit-clip-path" : "polygon(0% 0%, 0% 4.2em, 100% 4.2em, 100% 0%)",
						"clip-path" : "polygon(0% 0%, 0% 4.2em, 100% 4.2em, 100% 0%)"
					});
				*/
					/* animate to visible :: post control buttons */
			break;
			case "mouseout":

					/* animate to on :: clipping mask */
					mask.animate(
  					{ points: [0,-35, 0,181, 300,0, 300,-35] },
  					161, mina.easein);
  					
  					jQuery("#gallery-cycler-" + idx).css({ "z-index" : 1});
					/* animate to on :: text-wrap divs */

					/* animate clip-path on paragraph */
					/*
					jQuery("article#post-" + idx + " div.entry-content p").css({
						"-webkit-clip-path" : "polygon(0% 0%, 0% 14em, 100% 4em, 100% 0%)",
						"clip-path" : "polygon(0% 0%, 0% 14em, 100% 4em, 100% 0%)"
					});
*/
					/* animate to invisible :: post control buttons */
			break;
			case "click":
					/* 
						click() the link in ::
							article > header.entry-header > h1.entry-title > a
					*/
					jQuery("#post-" + idx + " .entry-header .entry-title a")[0].click();
					//console.log("the post cover: ", event);
			break;
			case "touchstart":
					mask.animate(
  					{ points: [0,0, 0,1, 300,100, 300,0] },
  					61, mina.easeout);
  					
					//console.log("mask mouseover: ", event.target.farthestViewportElement.id);
			break;
			
			case "touchend":
					/* 
						click() the link in ::
							article > header.entry-header > h1.entry-title > a
			
					*/
					mask.animate(
  					{ points: [0,0, 0,261, 300,100, 300,0] },
  					161, mina.easein);
					
					//jQuery("#post-" + idx + " .entry-header .entry-title a")[0].click();
					
			break;
			default:

			break;
		}
	}

	function moreHandle(event) {
		/* 
				the handler for the more button cover :: deprecated?
		*/ 
			var idx = event.target.farthestViewportElement.id;
		//concat the last idx string from the id
			idx = idx.substr(idx.lastIndexOf("-")+1);

		//	console.log("ev: ", idx, event.target.farthestViewportElement.id);
			
		switch(event.type) {
			case "mouseover":
					//do some anim
			break;
			case "mouseout":

					
			break;
			case "mouseup":
					/* 
						click() the link in ::
							article > header.entry-header > h1.entry-title > a
			
					*/

					jQuery("#post-" + idx + " .entry-header .entry-title a")[0].click();
					
			break;
			
			case "touchend":
					/* 
						click() the link in ::
							article > header.entry-header > h1.entry-title > a
			
					*/
					
					jQuery("#post-" + idx + " .entry-header .entry-title a")[0].click();
					
			break;
			default:

			break;
		}
		
	}

	function featuredGalleryCycle(idx) {
		/* timed slideshow */
				//http://www.simonbattersby.com/blog/simple-jquery-image-crossfade/

				var active = jQuery('#gallery-cycler-' + idx + ' .active-img');
				var next = (active.next().length > 0) ? active.next() : jQuery('#gallery-cycler-' + idx + ' img:first');
      				next.css('z-index',2);//move the next image up the pile
      				active.fadeOut(1100,function(){//fade out the top image
      				active.css('z-index',1).show().removeClass('active-img');//reset the z-index and unhide the image
      				next.css('z-index',3).addClass('active-img');//make the next image the top one

      				//current paginator
      				var paginators = Snap.select("#paginators-" + idx + " #paginator-" + (gIter[idx]) + " g#paginator-radio circle#paginator-selected").animate({ r : 0.1 }, 101, mina.easein, function(){ paginators.removeClass('active-paginator')} );
      					//paginators.select("#paginators-" + idx + " #paginator-" + (gIter[idx]) + " g#paginator-radio circle#paginator-selected").animate({ r : 0.1 }, 101, mina.easein, function(){ paginators.removeClass('active-paginator')} );
      					//paginators.select("#paginators-" + idx + " #paginator-" + (gIter[idx])).removeClass('active-paginator');			
																	
      				// track iteration per idx for paginator and button control
      				if(gIter[idx] == (jQuery('#gallery-cycler-' + idx + ' img.feat-gallery').length -1)) {
											
																	gIter[idx] = 0;
																	// next paginator
																	paginators = Snap.select("#paginators-" + idx + " #paginator-" + gIter[idx] + " g#paginator-radio circle#paginator-selected").animate({ r : 4.5 }, 101, mina.easein, function(){ paginators.addClass('active-paginator')} );
																	//paginators.select("#paginators-" + idx + " #paginator-" + gIter[idx] + " g#paginator-radio circle#paginator-selected").animate({ r : 4.5 }, 101, mina.easein, function(){ paginators.addClass('active-paginator')} );
																	//paginators.addClass('active-paginator');	
					
					} else {
																	gIter[idx] += 1;
																	// next paginator
																	paginators = Snap.select("#paginators-" + idx + " #paginator-" + gIter[idx] + " g#paginator-radio circle#paginator-selected").animate({ r : 4.5 }, 101, mina.easein, function(){ paginators.addClass("active-paginator")} );
																	//paginators.select("#paginators-" + idx + " #paginator-" + gIter[idx] + " g#paginator-radio circle#paginator-selected").animate({ r : 4.5 }, 101, mina.easein, function(){ paginators.addClass("active-paginator")} );
																	
					
																	//console.log("plus gIter: " + idx + " ::" + gIter[idx], jQuery('#gallery-cycler-' + idx + ' img.feat-gallery').length);
					}
      				
      			});
	
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
					/*	var bgRect = paper.rect( 0,10,(window.innerWidth * 4),5).attr({
								fill : "#e6dcdc",
								id : "background-line"
						});
					*/	
						//paper.append(bgR)
						//var coverRect = paper.rect( (window.innerWidth * -2),0,(window.innerWidth * 4),130).attr({
						var coverRect = paper.rect( 0,0,(window.innerWidth * 4),26).attr({
							fill : "#ffffff",
							opacity : "0",
							id : "background-cover"
						});
						//console.log("socialAssets ", socialAssets.length);
						
						var bIter = 0;

						for(social in externalAssets[container]) {
							//console.log("socialAssets:: ", social, container);
							
							if(externalAssets[container][social]["loadstate"] == "complete") {
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
							} else {
								//console.log("WARNING::", social, externalAssets[container][social]["loadstate"], " has not finsihed loading");
								assetWaitForLoad[fIdx] = {"asset" : social, "container" : container};
								fIdx++;
								//the asset hasnt finished loading
								//add a string to the assetWaitForLoad Variable so we can get back to it later

							}
								
						}



	}

	function renderGoogleMap() {

      	jQuery("#map-canvas").css({ 
      		"width" : (window.innerWidth + "px"),
      		"height" : "340px"
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
          zoom: 14,
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
								//console.log("click ", event.path[2].id);
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
		