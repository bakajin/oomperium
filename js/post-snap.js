/* render the posts using snap svgs masks */ 
var path = "images/";
var loadClip = ["post-clip"];

var loadGalleryControls = ["next-button", "play-button", "previous-button"];

var postClip;

var maskPolygon;
var paddingPolygon;

var controlsGroup = new Array();
var loadCount = 0;

jQuery(document).ready(function(){
	// set the theme path to the path
	console.log("post ids", postIDs);
	if(themePath) {
				path = themePath;
			}
	
	function loadAssets(assetList) {
			for(var aNum = 0; aNum < assetList.length; aNum++) {
						Snap.load((path + assetList[aNum] + ".svg"), onSVGLoaded);
						console.log("load ",aNum);
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
			controlsGroup[count] = asset;
			console.log("loaded", asset.select("svg").attr("id"), controlsGroup.length, count, loadCount);
			loadCount++;
			if(loadCount == loadGalleryControls.length * 2) {
					console.log("list complete");
					loadCount = 0;
					buildGalleryControls();
			}
	
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
						console.log("entry height calc " + elem + " : " +  jQuery('article#post-' + idx + " .entry-content p iframe").height() );
			}
			elem += 250;
			jQuery('article#post-' + idx + ' .entry-content').height(elem);
			//elem = elem.first('');

		var heightValue;


	}

	function buildGalleryControls() {
			// lets see if there is a gallery and render its controls
					
			for(var gNum = 0; gNum < postIDs.length; gNum++) {
					var transFactor = { x : -5, y : 0 };
					var transl = {x : "0%", y : "10%"};
					var galleryCheck = jQuery("[id^=gallery-" + postIDs[gNum] + "]").length;
				
					if(galleryCheck > 0) {
						//build controls

						//unhide container
						var controls = Snap('#svg-gallery-controls-'+ postIDs[gNum]);

						//var galleryPos = jQuery("[id^=gallery-" + postIDs[gNum] + "]").position();
						//var galleryPos = jQuery("[id^=gallery-" + postIDs[gNum] + "]").position();
							//galleryPos = galleryPos.top * -1;
						var	galleryPos = (jQuery("[id^=gallery-" + postIDs[gNum] + "]").height() * -1.45);
						console.log("gallery positioning: ", galleryPos);
						
						jQuery("#svg-gallery-controls-" + postIDs[gNum]).css({
							"position" : "relative",
							"display" : "inline-block",
							"top" : (galleryPos + "px")
						});


						for (var ctrl = 0; ctrl < controlsGroup.length; ctrl++) {
								console.log("ctrl ", controlsGroup[ctrl].id, jQuery('#svg-gallery-controls-'+ postIDs[gNum]).innerWidth(), ctrl);
								//transMatrix.translate(transFactor.x, transFactor.y);
							
								/*
								controlsGroup[ctrl].select("#button").transform(transMatrix);
								controls.append(controlsGroup[ctrl].select("#button").node.cloneNode(true));
								*/
								controlsGroup[ctrl].select("svg").attr({
																		x : transl.x, 
																		y : transl.y
																	});
								controls.append(controlsGroup[ctrl].select("svg").node.cloneNode(true));
							
								//transFactor.x += (jQuery('#svg-gallery-controls-'+ postIDs[gNum]).innerWidth() / controlsGroup.length);
								switch(ctrl) {
									case 0:
										//transFactor.x += 10;
										//transFactor.y += jQuery("[id^=gallery-" + postIDs[gNum] + "]").innerHeight() / 5;
										transl = {x : "37%", y : "55%"};
								
										//console.log("win " + jQuery("[id^=gallery-" + postIDs[gNum] + "]").innerHeight() );
									break;
									case 1:
										transl = {x : "80%", y : "10%"};
										//transFactor.x += jQuery("[id^=gallery-" + postIDs[gNum] + "]").innerWidth() - 20;
										//transFactor.y -= jQuery("[id^=gallery-" + postIDs[gNum] + "]").innerHeight() -15;
									break;
									case 2:
										transl = {x : "0%", y : "10%"};
										//transFactor.x = 0;
										//transFactor.y = 0; 
									break;
								}
						}
					}
			
			}
	}

	function drawMask(idx) {
		//var art = 
		var articleContent = jQuery("#post-" + idx + " .entry-content");

			var s = Snap('#svg-post-'+ idx);
			//jQuery('#svg-post-'+ idx).height(articleContent.height());
		
		var mPoints = [0,(articleContent.width()/2), (articleContent.width()),0, (articleContent.width()),(articleContent.width()), 0,(articleContent.width())];//[0,(articleContent.width()/2),100,0,articleContent.width(),100,0,100];

		var pPoints = [0,(articleContent.width()/2 - 20), (articleContent.width()),-20, (articleContent.width()),(articleContent.width()), 0,(articleContent.width())];//[0,(articleContent.width()/2),100,0,articleContent.width(),100,0,100];
		
		maskPolygon = s.polyline(mPoints);
		maskPolygon.attr({
			fill : "none"
		});
		
		s.attr({
			clipPath : maskPolygon.clone(),
			mask : maskPolygon.clone()
		});
/*
		paddingPolygon = s.paper.polyline(pPoints);
		paddingPolygon.attr({fill : "#fff", id : ("padding-" + idx)	});
*/
		// build check for content height and write to entry content.
		// how many exerpt lines, plus media height, make rest of text white

			//lets check for a gallery to clip
			var polyPoints;
			var topPos;
			if(articleContent.find("p a img").length > 0) {
				
				articleMedia = articleContent.find("p a img");
				polyPoints = "0% 33%, 100% 0%, 100% 100%, 0 100%";
				topPos = "-56rem";
				console.log("found img ", articleMedia.outerHeight());
			}
			if(articleContent.find("p iframe").length > 0) {
				articleMedia = articleContent.find("p iframe");
				polyPoints = "0% 50%, 100% 0%, 100% 200%, 0 200%";
				topPos = "-58rem";
				console.log("found iframe ", articleMedia.outerHeight());
				
			}
			if(articleContent.children(".jetpack-slideshow").length > 0) {
				
				articleMedia = articleContent.children(".jetpack-slideshow");	
				polyPoints = "0% 38%, 100% 5%, 100% 200%, 0 200%";
				topPos = "-46rem";
				console.log("found jetpack", articleMedia.outerHeight());
			}
			if(articleContent.children(".tiled-gallery").length > 0) {
				
				articleMedia = articleContent.children(".tiled-gallery");
				polyPoints = "0% 50%, 100% 0%, 100% 200%, 0 200%";	
				topPos = "-60rem";
				console.log("found tiled", articleMedia.outerHeight());
			}

			if(articleMedia.length > 0) {
				//draw poly
				console.log(idx + "artgal: ");
				articleMedia.css({
									"clip-path" : s.attr('clipPath'),
									"transition" : "0.4s cubic-bezier(1, -1, 0, 2)",
									"-webkit-clip-path" : "polygon(" + polyPoints + ")",
									"top" : topPos
								});//"-webkit-clip-path" : "polygon(" + mPoints[0] + "px " + mPoints[1] + "px, " + mPoints[2] + "px " + mPoints[3] + "px, " + mPoints[4] + "px " + mPoints[5] + "px, " + mPoints[6] + "px " + mPoints[7] + "px)"
				if(articleMedia.hasClass("jetpack-slideshow") == true) {
					//console.log("make controls ");
					loadAssets(loadGalleryControls);

				}
				
			}
			
		// draw a mask and padding polygon
			//this way we can find the media in the post, 
			//z-index it over the top of it to overlap the text in a way that it looks wrapped.
			//this makes it easier to very what content gets masked and to animate the position of the media (to favour the text or the media.)
		
	}
	if(postIDs.length) {
			loopArticles();
			//loadAssets(loadClip);
		}
});

