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
	
	var transFactor = ( (window.innerWidth/2) * (loadList.length+2) ) * -1;

	if(themePath) {
				path = themePath;
			}

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