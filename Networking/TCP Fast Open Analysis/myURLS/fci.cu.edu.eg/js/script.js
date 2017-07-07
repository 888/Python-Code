// <![CDATA[
$(function(){ 	
		   
	// Slider
	$('#coin-slider').coinslider({width:970,height:200,opacity:1});

	// wrap 'span' to nav page link
	$('.topnav ul').children('li').each(function() {
		$(this).children('a').html('<span>'+$(this).children('a').text()+'</span>'); // add tags span to a href
	});
	
	$('.top_level, a.btn_i, .post-leav').css({"border-radius":"20px", "-moz-border-radius":"20px", "-webkit-border-radius":"20px"});
	
});	
// ]]>