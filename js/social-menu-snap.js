/* render the main menu using snap svgs */ 
//the list to preload
//<?php echo get_stylesheet_directory_uri() . '/images/social-facebook.svg'; ?>
var path = "images/";
var loadList = ["facebook", "twitter", "linkedin", "behance", "vimeo", "pinterest", "skype"];
// cause this is a menu, load the button base shape and it's events
var baseShape = ""; //["social-menu-button.svg"];

var backgroundShape;

jQuery(document).ready(function(){
	if(themePath) {
				path = themePath;
			}

	//console.log("snap social menu");
	var s = Snap('#svg-social-menu');
	var button;
	var iterate = 0;

		//s.attr({ viewBox: "0 0 695 100" });
		function loadAssets(assetList, base) {
					if(base.length > 0) {
						Snap.load(path + base, function(b) {
							button = b.select("g");
						});
					}

					for(a = 0; a < assetList.length; a++) {	
						Snap.load((path + "social-" + assetList[a] + ".svg"), onSVGLoaded);

					}

		}

		function onSVGLoaded(loaded) {
					var transFactor = ((window.innerWidth / loadList.length) * iterate + 100)*10;
					var scaleFactor = (window.innerWidth / loadList.length / 2 ) / 1000; // make a factor based on window width and list length

					//append file to the snap svg
					g = loaded.select("g");
					//now put everything in place
						//set the buttons right and iterate them on screen
						var transMatrix = new Snap.Matrix();
							transMatrix.scale(scaleFactor);
							transMatrix.translate(transFactor, -50);
																	
							g.transform(transMatrix);

						//console.log("item: " + iterate + " : " + transFactor + " scaleFactor: " + scaleFactor);
					g.addClass("social-menu-button");

					g.click(socialMenuHandle);
					g.mouseover(socialMenuHandle);
					g.mouseout(socialMenuHandle);

					s.append(g);

					iterate++;											
		}

		function socialMenuHandle(event) {
			
			var elem;

				switch(event.type) {
							case "mouseover":
									console.log("over ", event);
									elem = s.select("#" + event.target.nearestViewportElement.id);
									//elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[1].childNodes[5].id);
									//elem.transform('t0 0 r0');
						
							break;

							case "mouseout":
									console.log("out ", this.parent.id);
									elem = s.select("#" + event.target.nearestViewportElement.id);
									//elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[1].childNodes[5].id);
									//elem.transform('t0 0 r0');

							break;

							case "touchstart":
									console.log("touch ", event.type);
							break;

							case "touchend":
									console.log("touch ", event.type);
							break;

							case "click":
									console.log("click ", event.type);
									jQuery("a:contains(" + event.target.firstChild.data	 + ")")[0].click();
							break;

							default:
									console.log("default ", event);
							break;


						}
		}
		// may be not on the page load?
		loadAssets(loadList, baseShape);

});