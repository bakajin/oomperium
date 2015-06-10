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
					s.append(g);

					iterate++;											
		}
		// may be not on the page load?
		loadAssets(loadList, baseShape);

});