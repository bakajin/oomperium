function shapeWrapper(uid,lineHeight,Xs) {
	//var article = document.getElementById(uid).children[1].getElementsByTagName("p");
	//	console.log("article: " + article.children.length);
	//var	elements = article.getElementsByTagName("div");
		//elements = elements.getElementsByTagName("p");
		//console.log("		value: " + elements.length);
		
		//var	content = elements.getElementsByTagName("p");
		//console.log("		value: " + content.length);
		//var	elem = .getElementsByClassName("entry-content")[0];
		//	element = content.getElementsByTagName("p");
		//var	elements = .getElementsByTagName("p");
		
		//var pHeight = elements[0].offsetHeight;
	//	var lineHeight = parseInt(document.defaultView.getComputedStyle(element, null).getPropertyValue("lineHeight"));
		
    //	var lines = pHeight / lineHeight;
    	
	var out = '';
	Xvalues = Xs.split('|');
	for(i=0; i < Xvalues.length; i++) {
		parts = Xvalues[i].split(',');
		out += '<div style="background:red;border:solid 2px green;float:left;clear:left;height:'+lineHeight+'px;width:'+ parts[1]+'%"></div>';
		out += '<div style="background:green;border:solid 2px red;float:right;clear:right;height:'+lineHeight+'px;width:'+ parts[2]+'%"></div>';
	}
	document.write(out);
}