/* render the posts using snap svgs masks */ 
var path = "images/";
var loadClip = ["post-clip"];

//var s;
var postClip;

var maskPolygon;

jQuery(document).ready(function(){
	// set the theme path to the path
	console.log("post ids", postIDs);
	if(themePath) {
				path = themePath;
			}
	
	function loadAssets(assetList) {
						Snap.load((path + assetList[0] + ".svg"), onSVGLoaded);
						console.log("load");
		}

	function onSVGLoaded(msk) {
			postClip = msk.select("#padding");
			
	//
		for(var pNum = 0; pNum < postIDs.length; pNum++) {
			
					var s = Snap('#svg-post-' + postIDs[pNum]);	
					s.append(postClip.clone());
					console.log("loop" + postIDs[pNum]);
		}
	
	}
	function drawMask() {
		// draw a mask and padding polygon
			//this way we can find the media in the post, 
			//z-index it over the top of it to overlap the text in a way that it looks wrapped.
			//this makes it easier to very what content gets masked and to animate the position of the media (to favour the text or the media.)
		var mPoints = [1,2,3,4];

		var pPoints = [1,2,3,4];
		
		maskPolygon = paper.polygon();
		maskPolygon.id = "postMask";

		paddPolygon = polygon;
		paddPolygon.id = "postPadding";

		
	}
	if(postIDs.length) {
			loadAssets(loadClip);
		}
});
/*
<image overflow="visible" width="250" height="250" xlink:href="../../../../../../../../../Users/oomp/PROJECT/oomp/theme/images-theme/logo-small.jpg"  transform="matrix(1 0 0 1 305.5545 248.0872)">
</image>
*/
