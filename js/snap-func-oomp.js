/* OOMPERIUM snap-svg & jquery interface overwrite */
/* version 2.0 by OOMP/ olivier */

/* we want one file query for the snapsvg calls (with added jQuery) */ 

/* globals */ 
	// set the theme path to the path
	console.log("post ids", postIDs);
	if(themePath) {
				path = themePath;
			}

/* 
	header logo functions
		init
		resize
		handlers
*/

	function renderHeaderLogo(){
	    Snap.plugin( function( Snap, Element, Paper, global ) {
    	    var fragmentList = new Array, fragLoadedCount = 0;
       
        	function addLoadedFrags( list ) { // This is called once all the loaded frags are complete
                for( var count = 0; count < list.length; count++ ) {
                        s.append( fragmentList[ count ] );//.select("g") );
                        //console.log("header load: " + count);
                        switch(count) {
                        	case 0:
                        			//logoGroup.append(fragmentList[ count ]);
                        	break;
                        	case 1:
                        			//bgGroup.append(fragmentList[ count ]);
                        			//bgGroup.transform('s3,0,0');
                        			buildLayout();
                        	break;
                        	default:
                        		//do nothing
                        	break;
                        	
                        }
                }
        	}

        	Paper.prototype.loadFilesDisplayOrdered = function( list ) {
                var image, fragLoadedCount = 0, listLength = list.length;

                        for( var count = 0; count < listLength; count++ ) {
                                (function() {
                                        var whichEl = count;
                                        image = Snap.load( list[ whichEl ], function ( loadedFragment ) {
                                                                       fragLoadedCount++;
                                                                        fragmentList[ whichEl ] = loadedFragment;
                                                                        if( fragLoadedCount >= listLength ) {
                                                                                addLoadedFrags( fragmentList );
                                                                        }
                                                                } );
                                })();

                        }
            };


});
    var path;

    if(themePath) {
                path = themePath;
            }
    
	var s = Snap("#site-logo");
		// setting the viewbox for responsive love
		s.attr({ 
                viewBox: "0 0 100 400"
            });
		var logoGroup = s.group();
     	var bgGroup = s.group();
	   var myLoadList = [ headerImg, (path + 'oomp_logo-bg.svg') ];
        s.loadFilesDisplayOrdered( myLoadList );

        function buildLayout() {
       			var transMatrix = new Snap.Matrix();
                    transMatrix.translate(-270,161);//(50,150)
                    transMatrix.scale(0.161);
                                            
                var logo = Snap.select('#oomp-logo');
                    logo.transform(transMatrix);

                    transMatrix = new Snap.Matrix();
                    transMatrix.translate(-117,-600);//(viewBox.y * -1)
                    transMatrix.scale(1.33);
                    
        		var background = Snap.select('#bg-elem');
                    background.transform(transMatrix);

        }
	});

/* 
	main menu functions
		init
		resize
		handlers
*/
/* render the main menu using snap svgs */ 
//the list to preload

var menuOptions;
var path = "images/";

// cause this is a menu, load the button base shape and it's events
var baseShape = "oomp-button-3"; //["social-menu-button.svg"];
var backgroundShape = "oomp-button-bg"; 
var menuLoadObj = [backgroundShape, baseShape];

//make a transform matrix for setting everying resonsive
var transMatrix;

//using jquery document ready so the event is not overridden by the other events
jQuery(document).ready(function(){
	
	if(themePath) {
				path = themePath;
			}
	
	
	//container for getting sizes in the document
	var drawingSurface = jQuery("#menu");

	var s = Snap('#svg-menu');
	var button;
	var iterate = 0;
	var mainMenuIterate = 0;

	var scaleFactor;
	var transFactor;
	
	var viewBox = { x : "0", y : "0", width : jQuery("#menu").width(), height : jQuery("#menu").height()};

		//s.attr({ viewBox: "0 0 695 100" });
		function loadAssets(assetList, base) {
					for(a = 0; a < assetList.length; a++) {	
						Snap.load((path + assetList[a] + ".svg"), onSVGLoaded);

					}
		}

		function onSVGLoaded(loaded) {
				//set up a new transform matrix
				transMatrix = new Snap.Matrix();

						//transMatrix.scale(scaleFactor);
						//transMatrix.translate(transFactor, -50);

				//determine tranformation factors, based on the svg canvas
					g = loaded.select("svg");
					var buttons = new Array();

					switch(g.attr('id')) {
						case "oomp-menu-bg":
								//draw a background rectangle and colour it.
									// add two hairlines top and bottom
								jQuery("#svg-menu").height(viewBox.height);
								
								/*var pWidth = jQuery("#svg-menu").width();
								var pHeight = jQuery("#svg-menu").height() -1;
*/
								var pWidth = "100%";
								var pHeight = jQuery("#svg-menu").height() -1;
								var pX = "10%";
								var pY = "23%";

								//scale loaded to 100% of the svg canvas
								//scaleFactor = 0.5;//(drawingSurface.innerWidth() /  viewBox.width); // make a factor based on window width and list length
								//transMatrix = new Snap.Matrix();
								//transMatrix.scale(scaleFactor);
								//transMatrix.translate(0, ((viewBox.y / 4) * -1));//

								bgRect = s.paper.rect(pX,pY,pWidth,pHeight).attr({
									fill : "#EDF0F5"
								});
								lineTop = s.paper.line(pX,pY, pWidth,pY).attr({
									fill : "none",
									stroke : "#D47878",
									strokeWidth : 0.25
								});
								lineBottom = s.paper.line(pX,pHeight, pWidth,pHeight).attr({
									fill : "none",
									stroke : "#D47878",
									strokeWidth : 0.25
								})
								//console.log("bg: " + g.attr('id') + " : " + jQuery("#svg-menu").height() );
								var bg = s.group(bgRect, lineTop, lineBottom);
								//g.select("g").transform(transMatrix);
								//append menu bg
								s.prepend(bg);
								//s.prepend(g);
						break;
						default:
							/* submenu */
								//iterate submenu
								var subCount = 0;
								var subSwitch = false;

								for(b = 0; b < menuItems.length; b++) {
									//console.log(menuItems[b].title + " : iter : " + b + " : " );

									str = menuItems[b].title;
									if(menuItems[b].parent > 0) {
										//submenu item, write text, iterate and space
										//
										//console.log("submenu chk: " + menuItems.length + str + menuItems[b].parent);
									
										var xSpacer;
										
										switch(menuItems[b].parent) {
											case "286":
													xSpacer = "27.5%";//108;
													//subCount = 0;
													
											break;
											case "23":
													xSpacer = "27.5%";//108;
													//subCount = 0;
													
											break;
											case "35":
													xSpacer = "27.5%";//108;
													//subCount = 0;
													
											break;
											case "114":
													xSpacer = "55.5%";//350;
													if(menuItems[b].parent == 114 & subSwitch == false) {
														subCount = 0;
														subSwitch = true;
													}
													
													//console.log(b,"29", subCount);
											break;
											case "29":
													xSpacer = "55.5%";//350;
													if(menuItems[b].parent == 29 & subSwitch == false) {
														subCount = 0;
														subSwitch = true;
													}
											case "42":
													xSpacer = "55.5%";//350;
													if(menuItems[b].parent == 42 & subSwitch == false) {
														subCount = 0;
														subSwitch = true;
													}
													
													//console.log(b,"29", subCount);
											break;
											case "33":
													xSpacer = "83.5%";//590;
													if(menuItems[b].parent == 33 & subSwitch == true) {
														subCount = 0;
														subSwitch = false;
													}
													//console.log(b,"33",subCount);
											break;
											case "39":
													xSpacer = "83.5%";//590;
													if(menuItems[b].parent == 39 & subSwitch == true) {
														subCount = 0;
														subSwitch = false;
													}
													//console.log(b,"33",subCount);
											break; 
										}
										//console.log("submenuItem: ", str, menuItems[b].parent);
										//iterate, jump right every 3
											subMenuItem = s.paper.text(xSpacer, (88 + (22 * subCount)), str);
											subMenuItem.attr({
												fill : "#D47878",
												"font-size" : "104%",
												"font-family" : "cronos-pro",
												id : "sub-" + b
											});
											subMenuItem.addClass("main-menu-sub");
											
											s.select( "#sub-" + b ).click(onSubMenu);
											s.select( "#sub-" + b ).mouseover(onSubMenu);
											s.select( "#sub-" + b ).mouseout(onSubMenu);
											
											subCount++;
											//console.log(loaded);

									} else {
										/* Main Menu buttons */
										if(menuItems[b].parent != undefined) {
											
											var localViewBox = g.attr('viewBox');
											//console.log(menuItems[b].title + " : iter : " + mainMenuIterate + " : " );
											//set a string for the text
											
											//translate and scale buttons each iteration (scaling static)
											//transMatrix = new Snap.Matrix();
											//scaleFactor = ( drawingSurface.innerWidth() / viewBox.width )/ 3.21; // make a factor based on window width and list length
											
											// translate before scale
											//transMatrix.translate( ((drawingSurface.innerWidth() / 3) * mainMenuIterate), localViewBox.y - (localViewBox.height / 2.65));//(viewBox.y * -1)
											var transXVal = 28 * mainMenuIterate + 15;
												transXVal = transXVal + "%";
											g.attr({ 
													x : transXVal,
													y : "-5.5em",
													width : "22%"
												});
											
											//main menu item add button write text
											
											//buttons = g.clone();
										
											buttons.push( Snap(g.node.cloneNode(true)));
											//console.log(str + " button: " + g.attr('id') + " mainMenuIterate: " + mainMenuIterate + " arrlen " + buttons.length);
											buttons[mainMenuIterate].attr({ id : "oomp-button-" + mainMenuIterate });
											buttons[mainMenuIterate].select("#text-back").attr({ text : str });
											buttons[mainMenuIterate].select("#text-front").attr({ text : str });
											
											buttons[mainMenuIterate].addClass("main-menu-button");
											s.append(buttons[mainMenuIterate]);
											
											//find the button and add event listeners
											s.select("#oomp-button-" + mainMenuIterate + " #button #hit").mousedown(onMainMenu);
											s.select("#oomp-button-" + mainMenuIterate + " #button #hit").mouseup(onMainMenu);
											
											mainMenuIterate++;
										}
									}
								}
								
						break;

					}
				
					iterate++;											
		}
		// may be not on the page load?
		if(menuItems.length) {
			loadAssets(menuLoadObj, baseShape);
		}
		// event handlers

		function onMainMenu(event) {

						var parentId = event.target.nearestViewportElement.id;
						var parent = s.select("#" + parentId);

						var elem;

						switch(event.type) {
							case "mouseover":
									console.log("over ", event.target.nearestViewportElement.id);
									elem = s.select("#" + event.target.nearestViewportElement.id);
									elem.unmouseover(onMainMenu);

									elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[1].id);
									elem.animate({
											"stroke-width" : "11"
									}, 300, mina.easeout, animComplete);
									
									 
							break;

							case "mouseout":
									console.log("out ", event.target.nearestViewportElement.id);
									elem = s.select("#" + event.target.nearestViewportElement.id);
									elem.mouseover(onMainMenu);
									
									elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[1].id);
									elem.animate({
											"stroke-width" : "0.25"
									}, 500, mina.easin, animComplete);
									
									
							break;

							case "mousedown":
									console.log("down ", event.type);
									elem = s.select("#" + event.target.nearestViewportElement.id);
									elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[5].id);
									elem.transform('t-5 -5 r180');
							break;
							case "mouseup":
									console.log("up ", event.target.nearestViewportElement.childNodes[1].childNodes[1].id);
									elem = s.select("#" + event.target.nearestViewportElement.id);
									elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[5].id);
									elem.transform('t0 0 r0');

									jQuery("a:contains(" + parent.select("#text-front").node.firstChild.data + ")")[0].click();
							break;

							case "touchstart":
									console.log("touch ", event.type);
							break;

							case "touchend":
									console.log("touch ", event.type);
							break;

							case "click":
									
									//console.log("click ", event.type, parent.select("#text-front").node.firstChild.data);

									jQuery("a:contains(" + parent.select("#text-front").node.firstChild.data + ")")[0].click();
							break;

							default:
									console.log("default ", event);
							break;


						}
		}

		function onSubMenu(event) {
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
				console.log("anim: ", event)
	}

});

/* 
	post functions
		init
		resize
		handlers
*/

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
			console.log("slideshow detected p-h: " + firstElemHeight );
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
			console.log("video detected p-h: " + firstElemHeight);
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
		mediaHeight *= 1.83; //1.85
	}
	if(jQuery("#post-" + idx + " .entry-content div iframe").length) {
		mediaHeight *= 2.2;
	}
	jQuery("#svg-gallery-controls-" + idx).css({
				"top" : (( firstElemHeight + mediaHeight + lastElemHeight ) * -1 ) + "px",
			});

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




jQuery(window).resize(function(){
	/*
		one resize is fired on load by the fluid video fix in header.php
	*/	
	
	if(postIDs.length) {
		//console.log("blog? ", jQuery("body").hasClass("blog"));
		if(jQuery("body").hasClass("blog")) {
			// dont loop but do per post?
				for(var pNum = 0; pNum < postIDs.length; pNum++) {
					//fix the post layouts				
					postLayout(postIDs[pNum]);
				}
			}
			//loadAssets(loadClip);
		}

	});




/*
	footer functions
		init
		resize
		handlers
*/
/* render the main menu using snap svgs */ 
//the list to preload
//<?php echo get_stylesheet_directory_uri() . '/images/social-facebook.svg'; ?>
var path = "images/";
var loadList = ["facebook", "twitter", "linkedin", "behance", "vimeo", "pinterest", "skype"];
// cause this is a menu, load the button base shape and it's events
var baseShape = ""; //["social-menu-button.svg"];

var backgroundShape;


//this is the ex ready function
function renderSocialMenuFooter(){
	var button;
	var iterate = 0;
	
	var transFactor = ( (window.innerWidth/2) * (loadList.length+2) ) * -1;


	//console.log("snap social menu");
	var s = Snap('#svg-social-menu');
		s.attr({ viewBox: "0 0 100 100" }); //" + window.innerWidth + "
		
		function loadAssets(assetList, base) {
					if(base.length > 0) {
						Snap.load(path + base, function(b) {
							button = b.select("g");
						});
					}

					for(a = 0; a < assetList.length; a++) {	
						Snap.load((path + "social-" + assetList[a] + "-n.svg"), onSVGLoaded);
					}

		}

		function onSVGLoaded(loaded) {
					transFactor += (window.innerWidth / loadList.length) * (loadList.length + 1);//= (window.innerWidth * iterate) - (window.innerWidth*2);// (iterate * 13) - 60;
					var scaleFactor = ((window.innerWidth / loadList.length ) / 500); // Math.floor make a factor based on window width and list length

					if(iterate == 0) {
						
						var bgRect = s.paper.rect( (window.innerWidth * -2),50,(window.innerWidth * 4),5).attr({
									fill : "#e6dcdc",
									id : "background-line"
								});
						
						var coverRect = s.paper.rect( (window.innerWidth * -2),0,(window.innerWidth * 4),130).attr({
							fill : "#ffffff",
							opacity : "0",
							id : "background-cover"
						});


					}
					//append file to the snap svg
					g = loaded.select("g");
					//g = loaded.select("svg");

					//now put everything in place
						//set the buttons right and iterate them on screen
						var transMatrix = new Snap.Matrix();
							transMatrix.scale(scaleFactor);
							transMatrix.translate(transFactor, 0);
																	
							g.transform(transMatrix);

						//console.log("item: " + iterate + " : " + transFactor + " scaleFactor: " + scaleFactor);
				
					/*g.attr({
						x : transFactor + "%",
						y : "-15%",
						width : scaleFactor + "%",
						height : scaleFactor + "%"
						
					})
					*/
					//viewBox : "0 0 10 10"
					
					g.addClass("social-menu-button");

					g.mousedown(socialMenuHandle);
					g.mouseup(socialMenuHandle);
					g.mouseover(socialMenuHandle);
					g.mouseout(socialMenuHandle);

					s.append(g);

					iterate++;											
		}

		function socialMenuHandle(event) {
			
			var elem;

				switch(event.type) {
							case "mouseover":
									//console.log("over ", event.target.nearestViewportElement.id, event.target.parentElement.id, event);
									elem = s.select(event.target.parentElement.id);
									//elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[1].id);
									//elem.transform('s1.161');
						
							break;

							case "mouseout":
									//console.log("out ", event.target.parentElement.id);
									elem = s.select(event.target.parentElement.id);
								//	elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[1].id);
									//elem.transform('s1');
						
							break;

							case "touchstart":
									console.log("touch ", event.type);
							break;

							case "touchend":
									console.log("touch ", event.type);
							break;

							case "mouseup":
									console.log("click ", event.path[2].id);
									jQuery("a[title='" + event.path[2].id + "']")[0].click();
									//jQuery("#menu-social li a[title='facebook']")[0].click();
									//jQuery("a:contains(" + parent.select("#text-front").node.firstChild.data + ")")[0].click();
							break;

							default:
									console.log("default ", event);
							break;


						}
		}
		// may be not on the page load?
		loadAssets(loadList, baseShape);

});