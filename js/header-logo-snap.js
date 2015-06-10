Snap.plugin( function( Snap, Element, Paper, global ) {
        var fragmentList = new Array, fragLoadedCount = 0;
       
        function addLoadedFrags( list ) { // This is called once all the loaded frags are complete
                for( var count = 0; count < list.length; count++ ) {
                        s.append( fragmentList[ count ] );
                        console.log("header load: " + count);
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

	var s = Snap("#site-logo");
		// setting the viewbox for responsive love
		s.attr({ viewBox: "0 0 240 480" });
		var logoGroup = s.group();
     	var bgGroup = s.group();
	var myLoadList = [ "<?php header_image(); ?>", "<?php echo get_stylesheet_directory_uri() . '/images/oomp_logo-bg.svg'; ?>" ];
        s.loadFilesDisplayOrdered( myLoadList );

        function buildLayout() {
       			var logo = Snap.select('#oomp-logo');
        		var background = Snap.select('#bg-elem');
        			background.transform('s2'); 	
        }