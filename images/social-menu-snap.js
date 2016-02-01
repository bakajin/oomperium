/* render the main menu using snap svgs */ 
//the list to preload
//<?php echo get_stylesheet_directory_uri() . '/images/social-facebook.svg'; ?>
var path = "images/";
var loadList = ["facebook", "twitter", "linkedin", "behance", "vimeo", "pinterest", "skype"];
// cause this is a menu, load the button base shape and it's events
var baseShape = ""; //["social-menu-button.svg"];

var backgroundShape;



jQuery(document).ready(function(){
	var button;
	var iterate = 0;
	
	if(themePath) {
				path = themePath;
			}

	//console.log("snap social menu");
	var s = Snap('#svg-social-menu');
		s.attr({ viewBox: "0 0 " + window.innerWidth + " 100" });
		
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
					var transFactor = (window.innerWidth * iterate) - (window.innerWidth*2);// (iterate * 13) - 60;
					var scaleFactor = ((window.innerWidth / loadList.length ) / 500); // Math.floor make a factor based on window width and list length

					if(iterate == 0) {
						
						var bgRect = s.paper.rect(0,65,100,5).attr({
									fill : "#e6dcdc",
									id : "background-line"
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

						console.log("item: " + iterate + " : " + transFactor + " scaleFactor: " + scaleFactor);
				
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
									console.log("over ", event.target.nearestViewportElement.id, event.target);
									//elem = s.select("#" + event.target.nearestViewportElement.id);
									//elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[1].id);
									elem.transform('s1.161');
						
							break;

							case "mouseout":
									console.log("out ", event.target.nearestViewportElement.id);
									elem = s.select("#" + event.target.nearestViewportElement.id);
									elem = elem.select("#" + event.target.nearestViewportElement.childNodes[1].childNodes[1].id);
									elem.transform('s1');
						
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