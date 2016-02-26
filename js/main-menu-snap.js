/* render the main menu using snap svgs */ 
//the list to preload

var menuOptions;
/* var path = "images/"; */

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
								var pX = "0%"; //10%
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
													xSpacer = "17.5%";//27.5%//108;
													//subCount = 0;
													
											break;
											case "23":
													xSpacer = "17.5%";//108;
													//subCount = 0;
													
											break;
											case "35":
													xSpacer = "17.5%";//108;
													//subCount = 0;
													
											break;
											case "114":
													xSpacer = "45.5%";//55.5%//350;
													if(menuItems[b].parent == 114 & subSwitch == false) {
														subCount = 0;
														subSwitch = true;
													}
													
													//console.log(b,"29", subCount);
											break;
											case "29":
													xSpacer = "45.5%";//350;
													if(menuItems[b].parent == 29 & subSwitch == false) {
														subCount = 0;
														subSwitch = true;
													}
											case "42":
													xSpacer = "45.5%";//350;
													if(menuItems[b].parent == 42 & subSwitch == false) {
														subCount = 0;
														subSwitch = true;
													}
													
													//console.log(b,"29", subCount);
											break;
											case "33":
													xSpacer = "73.5%";//83.5%//590;
													if(menuItems[b].parent == 33 & subSwitch == true) {
														subCount = 0;
														subSwitch = false;
													}
													//console.log(b,"33",subCount);
											break;
											case "39":
													xSpacer = "73.5%";//590;
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
											var transXVal = 28 * mainMenuIterate + 5;
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