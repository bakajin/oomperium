/* render the gallery controls on selected galleries */ 

/* global vars */
var path = "images/";

var loadGalleryControls = ["next-button", "play-button", "previous-button"];

var controlsGroup = new Array();
var controlsCheck = false;

var assetsLoaded = false;
var loadCount = 0;

/* functions that start as quick as possible and do not need the page to be loaded */
function loadAssets(assetList) {
		if(themePath) {
					path = themePath;
				}

			for(var aNum = 0; aNum < assetList.length; aNum++) {
						Snap.load((path + assetList[aNum] + ".svg"), onSVGLoaded);
					//	console.log("load ",aNum);
					}
		}

function onSVGLoaded(asset) {
			
			var count;														
							
			switch(asset.select("svg").attr("id")) {
				case "previous-button":
						count = 0;
				break;

				case "next-button":
						count = 2;

				break;
				
				case "play-button":
						count = 1;
				break;
				
			}
			loadCount = count;

			g = asset.select("svg");

/*			g.mouseover(onGallery);
			g.mouseout(onGallery);
			g.mousedown(onGallery);
			g.mouseup(onGallery);
*/
			g.addClass("gallery-button");

			controlsGroup[count] = g;
			console.log("loaded", asset.select("svg").attr("id"), controlsGroup.length, count, loadCount);
	}

function onGallery(event) {
 			console.log("gallery " + event.type);
 			console.log(event.target.nearestViewportElement.id);
 	}

loadAssets(loadGalleryControls);
/* functions I need the page to be loaded for */

jQuery(document).ready(function(){

	function loopArticles() {

		// loop the articles on the page
		// check what media they contain
		
		// build gallery controls or not

		for(var pNum = 0; pNum < postIDs.length; pNum++) {
				var galleryCheck = 0;
		
				if(jQuery("article#post-" + postIDs[pNum] + " div.entry-content div.jetpack-slideshow").length > 0) {
					//check for jetpack slideshow
					galleryCheck = jQuery("article#post-" + postIDs[pNum] + " div.entry-content div.jetpack-slideshow").length;

				}
				if(jQuery("article#post-" + postIDs[pNum] + " div.entry-content p iframe").length > 0) {
					//checl for iframe left by vimeo or youtube(?)
					galleryCheck = jQuery("article#post-" + postIDs[pNum] + " div.entry-content p iframe").length;

				}

					//console.log("tiled?: ",  jQuery("article#post-" + postIDs[pNum] + " div.entry-content div.tiled-gallery").length);
					//console.log("jetpack?: ",  jQuery("article#post-" + postIDs[pNum] + " div.entry-content div.jetpack-slideshow").length);
					//console.log("iframe?: ",  jQuery("article#post-" + postIDs[pNum] + " div.entry-content iframe").length);
					//console.log("img?: ",  jQuery("article#post-" + postIDs[pNum] + " div.entry-content p img").length);
				if(galleryCheck > 0) {
					buildGalleryControls(postIDs[pNum]);
				}

					//var galleryPos = jQuery("[id^=gallery-" + postIDs[gNum] + "]").position();
					//var galleryPos = jQuery("[id^=gallery-" + postIDs[gNum] + "]").position();
				
				var	galleryPos;
				if(jQuery("article#post-" + postIDs[pNum] + " div.entry-content div.jetpack-slideshow").length > 0) {
					//console.log("hasSlideshow ", postIDs[pNum])
					galleryPos = (jQuery("article#post-" + postIDs[pNum] + " div.entry-content div.jetpack-slideshow").height() * -1.6);
					jQuery("#svg-gallery-controls-" + postIDs[pNum]).css({
							"position" : "relative",
							"display" : "block",
							"top" : (galleryPos + "px")
						});

				}
				if (jQuery("article#post-" + postIDs[pNum] + " div.entry-content p iframe").length > 0) {
					//console.log("hasIframe ", postIDs[pNum])
					galleryPos = (jQuery("article#post-" + postIDs[pNum] + " div.entry-content p iframe").height() * -2.8);
					jQuery("#svg-gallery-controls-" + postIDs[pNum]).css({
							"position" : "relative",
							"display" : "block",
							"top" : (galleryPos + "px")
						});

				}
				
						
						
			}

	}

	function buildGalleryControls(idx) {
			// there is a gallery now and render its controls

					var transFactor = { x : -5, y : 0 };
					var transl = {x : "0%", y : "10%"};

						//build controls

						//unhide container
						var controls = Snap('#svg-gallery-controls-'+ idx);

						for (var ctrl = 0; ctrl < controlsGroup.length; ctrl++) {
								console.log("ctrl ", controlsGroup[ctrl].id, jQuery('#svg-gallery-controls-'+ idx).innerWidth(), ctrl);
								controlsGroup[ctrl].attr({
																		x : transl.x, 
																		y : transl.y
																	});
								
								
								
								controls.append(controlsGroup[ctrl].node.cloneNode(true));
							
								switch(ctrl) {
									case 0:
										transl = {x : "37%", y : "55%"};
								
									break;
									case 1:
										transl = {x : "80%", y : "10%"};

									break;
									case 2:
										transl = {x : "0%", y : "10%"};

									break;
								}
						}
						
						controls.select("#previous-button").mouseover(onGallery);
						controls.select("#previous-button").mouseout(onGallery);
						controls.select("#previous-button").mousedown(onGallery);
						controls.select("#previous-button").mouseup(onGallery);

						controls.select("#next-button").mouseover(onGallery);
						controls.select("#next-button").mouseout(onGallery);
						controls.select("#next-button").mousedown(onGallery);
						controls.select("#next-button").mouseup(onGallery);

						controls.select("#play-button").mouseover(onGallery);
						controls.select("#play-button").mouseout(onGallery);
						controls.select("#play-button").mousedown(onGallery);
						controls.select("#play-button").mouseup(onGallery);

			
	}

	loopArticles();

});
