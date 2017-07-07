function overlay(params){
	//var w = params.width;
	//var h = params.height;
}

/*
overlay.htmlContent($('.inplacedisplayid4siteid0').html());
*/
(function(){
	this.addoverlay = {
		positionWindow:function(div){
			var x = (document.body.scrollWidth/2) - ($('#overlay-window').width()/2);
			var y = document.body.scrollHeight/2;
			maskHeight = (document.body.scrollHeight < $('#overlay-window').height()) ? $('#overlay-window').height() +100 : document.body.scrollHeight ;
			$('#wrap').css({width:document.body.scrollWidth, height:maskHeight});
			$('#overlay-window').css({ top:100,left:x-10});
		},
		scrollPos:function(){
			var ScrollTop = document.body.scrollTop;
			if (ScrollTop == 0)
			{
				if (window.pageYOffset)
					ScrollTop = window.pageYOffset ;

				else
					ScrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop  : 0;
			} 
			return ScrollTop;
		},
		getScrollXY:function() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  //return [ scrOfX, scrOfY ];
  return scrOfY;
},

		ajaxContent:function(url, dat){
			$.ajax({
				url:url,
				type:'GET',
				data : dat,
				success:function(d){
						$('body').append('<div id="wrap">&nbsp;</div>'+d);
						addoverlay.positionWindow();
						return false;
				},
				error:function(e){
					alert("Error");
				}
			});
		},
		htmlContent:function(html, w, h){
			$('body').append('<div id="wrap"><div id="overlay-window" style="height:'+ h +'px; width:'+ w +'px;">' + html + '</div></div>');
			$('#wrap').click(function(){$('#wrap').remove();if(htmlObjRemoved.length)restoreHtmlFlash();});
			$('#wrap #overlay-window').click(function(){return false;});
			addoverlay.positionWindow();			
		}		
	};
	window.onresize = function(){
				addoverlay.positionWindow();
			};
})();
