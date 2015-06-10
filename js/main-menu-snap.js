/* render the main menu using snap svgs */ 
//the list to preload
//<?php echo get_stylesheet_directory_uri() . '/images/social-facebook.svg'; ?>
var menuOptions;
var path = "images/";

// cause this is a menu, load the button base shape and it's events
var baseShape = "oomp-button"; //["social-menu-button.svg"];
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
	var viewBox;

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
								//scale loaded to 100% of the svg canvas
								viewBox = g.attr("viewBox");
								jQuery("#svg-menu").height(viewBox.height + 48); 
								//viewBox.width = drawingSurface.innerWidth();
								//g.attr({ viewBox : "0 0 " + drawingSurface.innerWidth() + " " + drawingSurface.innerHeight() + " "});
								/*g.attr({ 
										viewBox : "0 0 1 1",
										width : "0px",
										height : "0px",
										y : "-192px"
									});*/
								scaleFactor = (drawingSurface.innerWidth() /  viewBox.width); // make a factor based on window width and list length
								
								transMatrix = new Snap.Matrix();
								//transMatrix.scale(scaleFactor);
								transMatrix.translate(0, ((viewBox.y / 4) * -1));//

								//console.log("bg: " + g.attr('id') + " : " + scaleFactor );

								g.select("g").transform(transMatrix);
								//append menu bg

								s.prepend(g);
						break;
						default:
								
								//iterate
								for(b = 0; b < menuItems.length; b++) {
									
									if(menuItems[b].parent > 0) {
										//submenu item, write text
									} else {
										if(menuItems[b].parent != undefined) {
											
											//set a string for the text
											str = menuItems[b].title;
											
											//translate and scale buttons each iteration (scaling static)
											transMatrix = new Snap.Matrix();
											scaleFactor = ( drawingSurface.innerWidth() / viewBox.width )/3; // make a factor based on window width and list length
											
											// translate before scale
											transMatrix.translate( ((drawingSurface.innerWidth() / 3) * mainMenuIterate), (viewBox.y / 3));//(viewBox.y * -1)
											transMatrix.scale(scaleFactor);
											
											g.select("g").transform(transMatrix);
											console.log(menuItems[b].title + " : iter : " + mainMenuIterate + " : " + scaleFactor);
											//g.attr({ y : "149px"});
											//main menu item add button write text
											//button = g.select("svg");
											//button.select("#text-back").attr({ text : str });
											//button.select("#text-front").attr({ text : str });
											//buttons = g.clone();
											buttons.push( Snap(g.node.cloneNode(true)));
											//console.log(str + " button: " + g.attr('id') + " mainMenuIterate: " + mainMenuIterate + " arrlen " + buttons.length);
											buttons[mainMenuIterate].select("#text-back").attr({ text : str });
											buttons[mainMenuIterate].select("#text-front").attr({ text : str });
											s.append(buttons[mainMenuIterate]);

											mainMenuIterate++;
										}
									}
								}
								//button = button.clone();
								//button.node = button.node.cloneNode(true);
								
						break;

					}
						
						//console.log("menu: " + g.attr('id') + " : " + transFactor + " scaleFactor: " + scaleFactor);
					//s.append(g);

					iterate++;											
		}
		// may be not on the page load?
		if(menuItems.length) {
			loadAssets(menuLoadObj, baseShape);
		}
		//

});