jQuery(document).ready(function(){
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