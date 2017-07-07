$(document).ready(function () {

	// allow image roations to be specified as a parameter in the portal
	var timeoutTime = 0;
	if (typeof window.displayTime != 'undefined') { timeoutTime = window.displayTime; }
	
	GLoad.Load([
	{
		name : "cycle",
		css  :true,
		params : {
			fx: 'fade',
			timeout: timeoutTime,
			speed: 'normal',
			next:   '#showcase_nav_right', 
			prev:   '#showcase_nav_left',
			pause: true,
			showNav: true,
			slideExpr: 'img',
			before: 'onAfterSlide', 
			after: 'onAfterSlide',
			container:  '.showcase_slideshow',
			showMoreLink: true,
			showMoreLinkColour: 'orange',
			showTitle: true,
			showTitleColour: 'white'
		}
    }
	]);

	if($('.showcase_side_bar_container h1').length){Cufon.replace('.showcase_side_bar_container h1', {fontWeight:'400',forceHitArea:true});}
	if($('.showcase_side_bar_container div.inside').length){Cufon.replace('.showcase_side_bar_container div.inside', {fontWeight:'400',forceHitArea:true});}

	if($('.showcase_side_bar_container div.inside ul li p a').length){Cufon.replace('.showcase_side_bar_container ul li p a',{hover:{color:'#f9a9a7'},forceHitArea:true});}

	if($('#slipText').length){Cufon.replace('#slipText',{forceHitArea:true});}

	$(".showcase_image_caption_nav img").mouseover(function(){
		var src = $(this).attr('src',$(this).attr('src').replace('_on.png','.png'));
	});
	$(".showcase_image_caption_nav img").mouseout(function(){
		var src = $(this).attr('src',$(this).attr('src').replace('.png','_on.png'));
	});

	$("div.showcase_side_bar_container div.inside ul li").each(function(){
		$(this).html('<img src="http://icwwwd.cc.ic.ac.uk/imedia/general_graphics/landpageslideshow/white_arrow_right.png" />'+$(this).html());
	});

});