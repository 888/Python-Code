function URLEncode(str )
{
	var SAFECHARS = "0123456789" +					// Numeric
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
					"abcdefghijklmnopqrstuvwxyz" +
					"-_.!~*'()";					// RFC2396 Mark characters
	var HEX = "0123456789ABCDEF";
	var plaintext = str
	var encoded = "";
	for (var i = 0; i < plaintext.length; i++ ) {
		var ch = plaintext.charAt(i);
	    if (ch == " ") {
		    encoded += "+";				// x-www-urlencoded, rather than %20
		} else if (SAFECHARS.indexOf(ch) != -1) {
		    encoded += ch;
		} else {
		    var charCode = ch.charCodeAt(0);
			if (charCode > 255) {
			    alert( "Unicode Character "
                        + ch 
                        + " cannot be encoded using standard URL encoding.\n" +
				          "(URL encoding only supports 8-bit characters.)\n" +
						  "A space (+) will be substituted." );
				encoded += "+";	
			} else {
				encoded += "%";
				encoded += HEX.charAt((charCode >> 4) & 0xF);
				encoded += HEX.charAt(charCode & 0xF);
			}
		}
	} // for
return encoded;
};
//function fnaccess()
function fnaccess(p_pageid,p_pagegroup,p_dad)
{
	
str = window.location.href;
str = URLEncode(str);
urlString = "/pls/portallive/PORTALLIVE.wwpob_page_edit.pageEdit?p_pageid="+p_pageid+"&p_siteid="+p_pagegroup+"&p_back_url="+str+"&p_screen=3";
window.location.href = urlString;
}
function fnsubscribe(todo,p_pageid,p_pagegroup,p_dad)
{
str = window.location.href;
str = URLEncode(str);
if(todo=="sub"){
urlString = "/pls/portallive/PORTALLIVE.wwsbr_app_approval.subscribe?p_object_context_id="+p_pagegroup+"&p_page_id="+p_pageid+"&p_looplink="
}
else{
urlString = "/pls/portallive/PORTALLIVE.wwsbr_app_approval.unsubscribe?p_object_context_id="+p_pagegroup+"&p_page_id="+p_pageid+"&p_looplink="
}

urlString =urlString+str
	
window.location.href = urlString;
}
 function openColourSelector(pageId,siteId,dadName){ 
var colorCodeVal=document.getElementById("color_code_val").value; 
if (document.all){  
window.open("/pls/"+dadName+"/url/page/ADMINISTRATION/color_selector?p_pageid="+pageId+"&p_siteid="+siteId+"&colorCodeVal="+colorCodeVal,"Colour_selector","width=400,height=500,left=300,top=175");
}
else { 
window.open("/pls/"+dadName+"/url/page/ADMINISTRATION/color_selector?p_pageid="+pageId+"&p_siteid="+siteId+"&colorCodeVal="+colorCodeVal,"Colour_selector","width=400,height=500,screenX=300,screenY=175");
}
}

function editPage(p_pageid,p_pagegroup,p_dad,p_schema)
{
	var l_url="/portal/page?_pageid="+p_pagegroup+","+p_pageid+"&_dad="+p_dad+"&_schema="+p_schema+"&_mode=16";
	//l_url=URLEncode(l_url);
	//alert(l_url);
	 window.location.href=l_url;
}
