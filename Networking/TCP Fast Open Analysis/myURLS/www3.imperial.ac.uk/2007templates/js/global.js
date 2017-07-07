/* CONSOLE.log FIX */
if ( ! window.console ) {console = { log: function(){} };};

/* = FLASH VIDEO
-------------------------------------------------
	Creates embed code for Flash player
-------------------------------------------------*/

var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
jsVersion = 1.1;
function JSGetSwfVer(i){
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
      		var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			descArray = flashDescription.split(" ");
			tempArrayMajor = descArray[2].split(".");
			versionMajor = tempArrayMajor[0];
			versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
      		versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
            flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
      	} else {
			flashVer = -1;
		}
	}

	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;

	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;

	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;

	else {
		
		flashVer = -1;
	}
	return flashVer;
} 

function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) 
{
 	reqVer = parseFloat(reqMajorVer + "." + reqRevision);

	for (i=25;i>0;i--) {	
		if (isIE && isWin && !isOpera) {
			versionStr = VBGetSwfVer(i);
		} else {
			versionStr = JSGetSwfVer(i);		
		}
		if (versionStr == -1 ) { 
			return false;
		} else if (versionStr != 0) {
			if(isIE && isWin && !isOpera) {
				tempArray         = versionStr.split(" ");
				tempString        = tempArray[1];
				versionArray      = tempString .split(",");				
			} else {
				versionArray      = versionStr.split(".");
			}
			versionMajor      = versionArray[0];
			versionMinor      = versionArray[1];
			versionRevision   = versionArray[2];
			
			versionString     = versionMajor + "." + versionRevision;   
			versionNum        = parseFloat(versionString);
        	
			if ( (versionMajor > reqMajorVer) && (versionNum >= reqVer) ) {
				return true;
			} else {
				return ((versionNum >= reqVer && versionMinor >= reqMinorVer) ? true : false );	
			}
		}
	}	
	return (reqVer ? false : 0.0);
}

/* = CLEAR FIELD
-------------------------------------------------
	clears the value of any inpu field with the
	class name of clearDefault
-------------------------------------------------*/

function clickClear() {
	if(!document.getElementsByTagName) return false;
	
	var inputs = document.getElementsByTagName("INPUT");
	
	for ( var i = 0; i < inputs.length; i++)
	{
		if(inputs[i].className.indexOf("clearDefault") != -1)
		{
			inputs[i].onclick = function() {
				if(this.value == this.defaultValue)
				{
					this.value = "";
				}
				return 0;
			}
			inputs[i].onfocus = function() {
				if(this.value == this.defaultValue)
				{
					this.value = "";
				}
				return 0;
			}
			inputs[i].onblur = function() {
				if(this.value == "")
				{
					this.value = this.defaultValue;
				}
				return 0;
			}
		}
	}
	return 0;
}

/* = FEATURE NEWS AREA
-------------------------------------------------*/

function prepFeaturedNews() {
	if(!document.getElementById || !document.getElementsByTagName) return 0;
	if(!document.getElementById("featured-news-block") 
		|| !document.getElementById("featured-news-list") 
		|| !document.getElementById("featured-news-image")) return 0;
	
	var list = document.getElementById("featured-news-list");
	var imageBlockContainer = document.getElementById("featured-news-image");
	
	var listItem = list.getElementsByTagName("LI");
	
	for( var i = 0; i < listItem.length; i < i++ )
	{
		var link = listItem[i].getElementsByTagName("A")[0];
		if(!link) continue;
		
		listItem[i].onmouseover = function() {
			var link = this.getElementsByTagName("A")[0];
			var href = link.getAttribute("href");
			
			var imageId = href.split("#")[1];

			if(!document.getElementById(imageId)) return 0;
			var imageBlock = document.getElementById(imageId);
			hideAll(imageBlockContainer, "DIV", "photo", "hide");
			for(var j = 0; j < listItem.length; j++)
			{
				listItem[j].className = listItem[j].className.replace(/ ?active ?/g, "");
			}
			imageBlock.className = imageBlock.className.replace(/ ?hide ?/g, "");
			var activateListItem = this;
			if(activateListItem.className) {
				activateListItem.className += " active";
			}
			else {
				activateListItem.className = "active";
			}
			
			return false;
		}
	}
}

/* = HIDE ELEMENTS IN A CONTAINER OF A CERTAIN TYPE, CLASS AND HIDE THEM WITH SPECIFIED CLASS */

function hideAll(container, elementType, elementClass, hideClass) {
	if(!container || !elementType || !elementClass || !hideClass) return 0;
	
	var element = container.getElementsByTagName(elementType);
	
	for(var i = 0; i < element.length; i++)
	{
		if(!element[i].className.match(elementClass)) continue;
		if(element[i].className.match(hideClass)) continue;
		
		if(element[i].className) {

			element[i].className += " hide";
		}
		else {
			element[i].className = "hide";
		}
	}
	return 0;
}

/* = PREP INPUT TYPES
-------------------------------------------------*/

function prepInputs() {

	var inputs = document.getElementsByTagName("INPUT");
	for(var i = 0; i < inputs.length; i++)
	{
		if(inputs[i].getAttribute("type") == "checkbox")
		{
			if(inputs[i].className)
			{
				inputs[i].className += " checkBoxInput";
			}
			else {
				inputs[i].className = "checkBoxInput";
			}
			
		}
		else if(inputs[i].getAttribute("type") == "radio")
		{
			if(inputs[i].className)
			{
				inputs[i].className += " radioInput";
			}
			else {
				inputs[i].className = "radioInput";
			}
		}
		else if (inputs[i].getAttribute("type") == "image")


		{
			if(inputs[i].className)
			{
				inputs[i].className += " submitButton";
			}
			else {
				inputs[i].className = "submitButton";
			}
		}
	}
}

function prepFormReset() {
	var forms = document.getElementsByTagName("FORM");
	for(var i = 0; i < forms.length; i++)
	{
		var links = forms[i].getElementsByTagName("A");
		for(var j = 0; j < links.length; j++)
		{
			
			if(links[j].className.match("reset-link"))
			{
				links[j].parentForm = forms[i];
				links[j].onclick = function() {
					this.parentForm.reset();
					
					return false;
				}
			}
		}
	}
	return 0;
}

/* = PRINT LINKS
-------------------------------------------------
	This function adds the javascript print
	function to the onclick event.  The href of 
	this links should be to a printer friendly page
	if possible
-------------------------------------------------*/

function prepPrintLinks() {
	var link = document.getElementsByTagName("A");
	for(var i = 0; i < link.length; i++)
	{
		if(!link[i].className.match("print-link")) continue;
		
		link[i].onclick = function() {
			print();
			return false;
		}
	}
	return 0;
}

/* = EMAIL A FRIEND LINK
-------------------------------------------------*/

function prepEmailFriend() {
	if(!document.getElementById("action-email") || !document.getElementById("emailFriendForm")) return true;
	if(!document.getElementById("emailHref")) return true;
	var emailLink = document.getElementById("action-email").getElementsByTagName("A")[0];
	var emailForm = document.getElementById("emailFriendForm");
	var hrefArea = document.getElementById("emailHref");

	emailLink.onclick = function() {
		showElement(emailForm);
		return false;
	}
	
	var href = location.href;
	var hrefText = document.createTextNode(href);
	hrefArea.appendChild(hrefText);
	
	var closeLink = emailForm.getElementsByTagName("A");
	for(var i = 0; i < closeLink.length; i++)
	{
		if(!closeLink[i].className.match("close")) continue;
		
		closeLink[i].onclick = function() {
			hideElement(emailForm);
			return false;
		}
	}
}

/* AJAX right navigation by Venkat
-------------------------------------------------*/
function getXMLHTTP()
{
var xmlHttp;
try
  {
  // Firefox, Opera 8.0+, Safari
  xmlHttp=new XMLHttpRequest();
  }
catch (e)
  {
  // Internet Explorer
  try
    {
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
  catch (e)
    {
    try
      {
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    catch (e)
      {
      alert("Your browser does not support AJAX!");
      return false;
      }
    }
  }
  return xmlHttp;
 }


function initRightNav() 
{
	
	container=document.getElementById("section-nav");
	if (container!=null)
	{
		var aElements = container.getElementsByTagName("a");
	initRightNavElement(aElements);
	}
	

	return false;
}

function initRightNavElement(aElements)
{
	for (i=0;i<aElements.length;i++)
	{
		 if (aElements[i].className.indexOf("expand-link")!=-1)
		 {
		   aElements[i].onclick=function()
		   {
			   toggleRightNav(this);
			   return false;
		   }
		 }
	}
  return false;
}

function toggleRightNav(aElement) {
aElementParent=aElement.parentNode;
if(aElement.className.indexOf("expand-link")!=-1)
{
	if(aElementParent.getElementsByTagName("ul").length>0)
	{
		childUL=aElementParent.getElementsByTagName("ul");
		if (aElement.className.indexOf("collapsed")!=-1)
		{
		   childUL[0].className="hidden";
		   aElement.className=aElement.className.replace("collapsed","");
		}
		else
		{
		   childUL[0].className="";
		   aElement.className+=" collapsed";
		 }
	}
	else
	{
	splitStr= aElement.id;
	splitStr=splitStr.split('-');
	pageid=splitStr[0];
	siteid=splitStr[1];
	var xmlHttp=getXMLHTTP();
	if (xmlHttp)
	{
		
		xmlHttp.onreadystatechange=function()
		{
						 
			if(xmlHttp.readyState==4 ) 
			{
			   if (xmlHttp.status==200)
               {			
				aElement.className+=" collapsed";
				
				if (aElementParent.getElementsByTagName("ul").length<=0)
				{
				  	aElementParent.innerHTML+=xmlHttp.responseText;
									   
					var aChildElements = aElementParent.getElementsByTagName("a");
									 
					initRightNavElement(aChildElements);
									  
				}
               }
			   else
				{
                   alert("There was an error processing your request. \nThe error message is "+this.status);
				   
				}
				
			}		
			 
		 }
		
		xmlHttp.open("GET","/portal/pls/portallive/icportal.right_navigation.getNewNavigation?p_pageid="+pageid+"&p_siteid="+siteid,true);
		xmlHttp.send(null);
	}

	}
}
//initRightNav();
return false;
}

/*END of Right navigation
----------------------------------------------*/

/* = EXPANDABLE NAVIGATION
-------------------------------------------------*/

function expandableSection(blockId, expElementType, onClickElementType) {
	if(!document.createElement) return false;
	if(!document.getElementById(blockId) || !expElementType) return false;
	
	var container = document.getElementById(blockId);
	var expElement = container.getElementsByTagName(expElementType);
	
	for(var i = 0; i < expElement.length; i++)
	{
		if(!expElement[i].getElementsByTagName("UL").length) continue;
		if(expElement[i].className) {
			expElement[i].className += " expandable";
		}
		else {
			expElement[i].className = "expandable";
		}
		var expLink = expElement[i].getElementsByTagName("A")[0];
		
		var link = document.createElement("A");
		link.setAttribute("href", "#");
		link.setAttribute("title", "Click here to expand the list");
		link.className = "expand-link";
		
		expElement[i].insertBefore(link, expLink);
		
		link.onclick = function() {
			var parentLi = this.parentNode;
			// grab the first list
			var subList = parentLi.getElementsByTagName("UL")[0];
			
			if(subList.className.match("hidden")) {
				showElement(subList);
				if(this.className) {
					this.className += " collapsed";
				}
				else {
					this.className = "collapsed";
				}
			}
			else {
				hideElement(subList)
				this.className = this.className.replace(/ ?collapsed ?/g, "");
			}
			
			return false;
		}
	}
	
	return 0;
}

/* = HIDE ELEMENT
-------------------------------------------------*/

function hideElement(element) {
	if(!element || element.className.match("hidden")) return false;
	
	if(element.className) {
		element.className += " hidden";
	}
	else {
		element.className = "hidden";
	}
	
	return 0;
}

/* = SHOW ELEMENT
-------------------------------------------------*/

function showElement(element) {
	if(!element || !element.className.match("hidden")) return false;
	
	element.className = element.className.replace(/ ?hidden ?/g, "");
	
	return 0;
}

/* INITIALIZE ALL FUNCTION AFTER WINDOW ONLOAD
-------------------------------------------------*/

function init() {
	if(!document.getElementById || !document.getElementsByTagName) return 0;
	// prep functions
	prepFeaturedNews();
	clickClear();
	prepPrintLinks();
	//expandableSection("section-nav", "LI", "IMG");
	initRightNav() 
	prepEmailFriend();
	prepInputs();
	prepFormReset();
	loadCookieIframe();
         hideAddTab();
}

addLoadEvent(init);

/* = ON LOAD
---------------------------------------------------------------
	add the on load events
---------------------------------------------------------------*/
function addLoadEvent(func) {
	var oldOnLoad = window.onload
	if (typeof window.onload != 'function') 
	{
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldOnLoad();
			func();
		}
	}
}

//To change pwclogin cookie domain
function loadCookieIframe()	{
	if($.browser.msie)
	{
	 $.ajax({cache:false,url:'/PWCLogin/midcookies.jsp'});
	 setTimeout("$.ajax({cache:false,url:'/PWCLogin/midcookies.jsp'})",200);
	}
	else
	{
		$.ajax({cache:false,url:'/PWCLogin/midcookies.jsp'});
	}
}

// Function to hide "Add Tab" link on 
//templates to avoid future errors

function hideAddTab()
{
  $('img[alt="Add Tab"]').hide();
}


var htmlObjRemoved = [];
function htmlOverFlash(){	
	if($('object').length){
		$('object').each(function(){
			$(this).css('display','none');
			htmlObjRemoved.push($(this));
		});
	}
	if($('embed').length){
		$('embed').each(function(){
			$(this).css('display','none');
			htmlObjRemoved.push($(this));
		});
	}  
}

function restoreHtmlFlash(){
	for (var i in htmlObjRemoved){
		$(htmlObjRemoved[i]).css('display','block');
		delete htmlObjRemoved[i];
	}
}


//JQUERY READY FUNCTION 
$(function(){		   
// Expandable nav
	if ($(".expandable").length) {
		$(".expandable li").each(function() {
			if ($(this).children('ul').length) {			
				var c = ($(this).children('ul').hasClass('hidden')) ? '' : ' collapsed'; 
				var title = (c) ? 'contract' :'expand' ;
				$(this).addClass("expandable")
						.prepend('<a href="#" title="Click here to '+title+'" class="expand-link'+c+'"></a>');
			}
		});
		$('.expand-link').click(function(){
			if($(this).siblings('ul').hasClass('hidden')){				
				$(this).addClass('collapsed')
						.attr('title','Click here to contract')
						.siblings('ul')
						.removeClass('hidden');
			} else {
				$(this).removeClass('collapsed')
						.attr('title','Click here to expand')
						.siblings('ul')
						.addClass('hidden');
			}
			return false;
		});
	}
	
//Jquery Search icon on/off - edit
	$('#searchQuery')
		.focus(function(){$('#searchQuery').css('background','#e0eaf2');})
		.blur(function() {
				($('#searchQuery').val())||
						$('#searchQuery').css('background' , '#e0eaf2 url(http://www3.imperial.ac.uk/pls/portallive/docs/1/65329697.GIF) left no-repeat');
			});

//JQuery Auto load media player
if(($('#flashcontainer').length) || ($("div[id|='imedia']").length)){
	$.getScript('http://www2.imperial.ac.uk/imedia/js/jwplayer.js',function(){
		$.getScript('http://www2.imperial.ac.uk/imedia/js/imedia.jquery.js');	
	});
    $("head").append("<link>");
    css = $("head").children(":last");
    css.attr({
     	rel:  "stylesheet",
      	type: "text/css",
     	media: "screen",
      	href: "http://www2.imperial.ac.uk/imedia/css/player.css"
    });	
    if ($.browser == 'msie') {
    	$("head").append("<link>");
    	css = $("head").children(":last");
    	css.attr({
      		rel:  "stylesheet",
      		type: "text/css",
      		media: "screen",
      		href: "http://www2.imperial.ac.uk/imedia/css/player_ie.css"
    	});	    
    }
}

//DCA
if($('.dcacontainer').length){
	$.getScript('http://wwwf.imperial.ac.uk/utils/assets/apps/dca/js/dca_readonly.js');
}
	
//social media append referer to url
	$('.socialBoMa a').each(function(){
	   var href =  $(this).attr('href') + '&ref='+document.location.href;
	   $(this).attr('href',href);
	});
	
	/*
		check if there is an edit content reqion on the page
		dynamically embeds tinymce to the page
	*/
	if($('.edit').length){
		var e = document.createElement('script'),
		head = document.getElementsByTagName("head")[0];
		e.type = 'text/javascript';
		e.src = 'http://'+document.domain + '/tinymcetest/jscripts/tiny_mce/tiny_mce.js';
		head.appendChild(e);
		editable = true;
	}	
    GLoad.Load([
	{
		name : "overlay",
		css  :true,
		params : {}
    }
    ]);                 

	$(".reportOC").click(function()
	{
	   addoverlay.htmlContent('<div class="OChead"><span>Report incorrect content</span><a href="#"><img border="0" src="http://www3.imperial.ac.uk/icimages?p_imgid=23076" alt="Close" class="OCclose" /></a></div><form method="get" action=""><fieldset><p>Name (optional)</p><input type="text" name="username" style="width:95%" /><p><br />Email address (optional)</p><input type="text" name="useremail" style="width:95%" /><p><br/>Please give a brief description of the problem:</p><label for="Description"></label><textarea name="Description" id ="reportContent" cols="76" rows="7"></textarea></p></fieldset><div id="submitOutdatedContent" class="form-buttons"><input type="image" alt="Submit" src="/2007templates/images/button_submit.gif"></div></form>', 380, 240);

		$("#submitOutdatedContent").click(function() {        
			var msg = $("#reportContent").val(),
			url = location.href,
			user = $("input[name=useremail]").val(),
			username = $("input[name=username]").val();
			var dataString = {msg: msg, page: url, email: user, name: username};
			$.ajax({
				type: "GET",
				url: "http://www2.imperial.ac.uk/utils/mail/report_problem",
				data: dataString,
				dataType: "jsonp",
				success: function(e) {alert(e);}
			});
			$('#wrap').remove();
			restoreHtmlFlash();
			return false;
		});

		$('.OCclose').click(function(){
			$('#wrap').remove();
			restoreHtmlFlash();
			return false;
		});
		htmlOverFlash();
		return false;
	});
	/*DYNAMIC AD*/
	if($('.dynamicAdWrapper').length > 0)
	{
		var dOutput = '';
		$.getJSON('http://www2.imperial.ac.uk/utils/dynamic/flexible_ad.php?url='+ location.href +'&jsonCallBack=?',function(j){                                
			$(j).each(function(i){
				if(j)
				{
					if(j[i].image){
						dOutput += '<div class="quick-info-block">';
						dOutput += '<div class="photo"><img class="photo-image" src="http://www3.imperial.ac.uk/icimages?p_imgid='+j[i].image+'" alt="dynamic ad" />';
						dOutput += '<div class="caption">';
						dOutput += '<div class="caption-inside">';
						dOutput += '<p><a href="'+j[i].link+'" class="dynamicAdLink">'+j[i].text+'</a></p>';
						dOutput += '</div></div></div></div>';                
					}
				}
			});		
			$('.dynamicAdWrapper').html(dOutput);
		});
	}
	//GOOGLE analytics document download tracker
	if(typeof _gaq !== 'undefined'){
		var filetypes = ['xls', 'csv', 'pdf', 'doc', 'docx', 'ppt', 'zip'];
		$('a').each(function(){
			var _a = $(this);
			var href = _a.attr('href');
			if(href && (href.indexOf('imperial')!=-1 || href.indexOf('/portal/page/portallive/')!=-1)){
				var ext = href.substr(href.length-3,href.length);
				if($.inArray(ext,filetypes) != -1){
					//NEW CODE DVO Feb 2012
					_a.click(function(){
						_gaq.push(["_trackPageview", "/files/downloads/__"+window.location.pathname + href.substr(href.lastIndexOf('/'), href.length)]);
					});
					//$(this).attr("onclick","javascript: pageTracker._trackPageview('/files/downloads/__"+window.location.pathname + '/' + href.substr(href.lastIndexOf('/'), href.length)+"');");
				}
			}  
		});
	}

});
// End JQuery

function openOverlayEditor(dat) {
	if(editable){
		if($('#wrap').length){
			$('#wrap').remove();
			$('#editor-window').remove();		
		}
		var url = dat.url;
		delete dat.url;
		$.ajax({
			url:url,
			type:'GET',
			data : dat,
			success:function(d){
					$('body').append('<div id="wrap">&nbsp;</div>'+d);
					htmlOverFlash();
					return false;
			},
			error:function(e){
				alert("Error");
			}
		});
	}
}


/*
	Helper functions
*/
function isArray (o){
	if (undefined === o) return "undefined";
	if (null === o) return "null";
	return {}.toString.call(o).slice(8, -1).toLowerCase();
}

/*
	Replace old writeflash function
*/
function writeFlash(a,b,c){
	this['writeFlash'] = [a,b,c];
}
/*
	Global variable for feeds
*/
var objFeeds = {};

/*
	function for old Plugin calls
*/
function Plugin(l, t) {
	GLoad.Load(l, t);
}
/*
	GLoad plugin function
*/
var GLoad = {
	pluginURL : null,
	LoadFeed : function(f,n,jc,cb){
					$.getJSON(f+jc+'=?',function(j){
						objFeeds[n] = j;
						if(cb){
							cb(j);
						}
					});
	},
	Each : function (a, f) {
			for (var i = 0, l = a.length; i < l; i++){
				f(a[i]);
			}
	},
	Script : function(f, c){
				var e = document.createElement((c) ? 'link': 'script'),
					type = (c) ? 'css': 'javascript',
					url = GLoad.pluginURL + f;
				e.type = 'text/' + type;

				if (c) {
					e.rel = 'stylesheet';
					e.href = url + '/' + f + '.css';
				} else {
					e.id = f + '-js';
					e.src = (f.substr(f.length-3,f.length) =='.js') ? url :url + '/' + f + '.js';
				}
				var head = document.getElementsByTagName("head")[0];
				if (e !== undefined) {
					head.appendChild(e);
					
					if ($.browser.msie && $.browser.version <= 7) //add extra css for IE 6 +7
					{
						var IEcss = document.createElement('link');
						IEcss.type = 'text/css';
						IEcss.rel = 'stylesheet';
						
						var IEfile = ($.browser.msie && $.browser.version < 7) ? '_ie6.css' : '_ie7.css';
						IEcss.href = url + '/' + f + IEfile;
						head.appendChild(IEcss);							
					}
					return true;
				}	
	},
	LoadPlugin : function(f, p){
					setTimeout(function() {
						if (document.getElementById(f + '-js')) {
							//add the feed stuff here							
								if(p.jquery && typeof JQuery == 'function'){
									this[f] = new Function('p',"$((p.container) ? '#'+p.container: '#"+f+"')."+f+"(p);");
								}
								this[f](p);
								if(p.feed){
									if(p.feed.length > 1){
										//load all feeds not yet in use 
									} else {
										//only one feed being used.
										//check if a name is set else use the plugin name						
										GLoad.LoadFeed(p.feed[0].url,(p.feed[0].name) ? p.feed[0].name : f,p.feed[0].callback);
									}				
								}
								if(p.cufon && typeof Cufon == 'function'){
									Cufon.replace(p.cufon);
								}
								//call the function / plugin constructor										
								//if browser is less than 7
								if ($.browser.msie && $.browser.version < 7) {
									if (typeof p.ie6 != 'undefined' && !document.getElementById('ie6-js')) {
										GLoad.Load(p.ie6);
									}
								}
						}
						//else run again
						else GLoad.LoadPlugin(f, p);
					},
					500);
	},
	Load : function(l,t){
				GLoad.pluginURL = (t) ? 'http://icwwwd.cc.ic.ac.uk/imedia/plugins/' : 'http://www.imperial.ac.uk/imedia/plugins/';
				if(isArray(l)==='string'){
					GLoad.Script(l);
				} else {
					GLoad.Each(l, function(i) {
						if(GLoad.Script(i.name)) GLoad.LoadPlugin(i.name, i.params);
						if (i.css) GLoad.Script(i.name, true);
						if (i.dependant) GLoad.Script(i.dependant);			
					});
				}	
	}
}


/**************************************************************************************************************************/
/** Variables to get the width and height of the iFrame container for the editor which changes based
	on the location where it is called.
	Variables button1,button2 are used to set the editor menus which change based on the size of the editor
*/
var contentAreaWidthSize,contentAreaHeightSize,button1,button2;

/** A generic method that gets the size of the editor window from the PLSQL
    package and based on that calls the method to set the width of the editor content
**/
function setEditorSize(editorSize){
	if(editorSize == 'small'){
		setEditorContentAreaWidth("40.8%");
	}else if (editorSize == 'medium'){
		setEditorContentAreaWidth("95%");
	}else if(editorSize == 'big'){
		setEditorContentAreaWidth("100%");
	}else if(editorSize == 'pwp-block'){
		setEditorContentAreaWidth("100%");
	}else if(editorSize == 'event-block'){
		setEditorContentAreaWidth("67%");
	}else if(editorSize == 'pwp-content-block'){
		setEditorContentAreaWidth("52%");
	}else if(editorSize == 'content'){
		//If it can't find a size, set it to 100% (original size)
		setEditorContentAreaWidth("100%");
	}
	setEditorMenu(editorSize);
}

/**getters and setters for setting the width of the editor content
*/
function getEditorContentAreaWidth(){
	return contentAreaWidthSize;
}


function setEditorContentAreaWidth(areaWidthSize){
	contentAreaWidthSize = areaWidthSize;
}

/**The getters for  the editor menu
*/
function getEditorMenuButton1(){
	return button1;
}

function getEditorMenuButton2(){
	return button2;
}

/**The setter for the editor menu. If the editor size is "big", then change the layout of the menu.
   For everything else, follow the default menu layout 	
*/
function setEditorMenu(editorSize){
	if(editorSize == 'big'){
		button1="cut,copy,paste,|,undo,redo,|,search,|,formatselect,|,ic_hyperlink,unlink,|,ic_imgmgr,|,ic_document,|,bold,italic,|,numlist,bullist,|,sup,sub,charmap,code,|,table,|,row_after,row_before,delete_row,|,col_after,col_before,delete_col";
		button2="ic_addins,|,ic_format,|,ic_image,|ic_pagebreak,|,ic_imgslidemgr,ic_inserts";
	}else {
		button1="cut,copy,paste,|,undo,redo,|,search,|,formatselect,|,ic_hyperlink,unlink,|,ic_imgmgr,|,ic_document,|,bold,italic,|,numlist,bullist,|,sup,sub,charmap";
		button2="code,|,table,|,row_after,row_before,delete_row,|,col_after,col_before,delete_col,|,ic_addins,|,ic_format,|,ic_image,|,ic_pagebreak,|,ic_imgslidemgr,ic_inserts";
	}
}


/*
	Code by Karsten for Slideshow
*/
$(document).ready(function()
{
    if($(".slideShowInPage").length)
    {	
		$("div.cycleslides img").removeAttr("style");
        $(".slideShowInPage").hide();
        $.getScript("/2007templates/plugins/slideshow/prepslideshowcms.js", function(_b)
        {
            var b = _b;
            buildSlideshows();
        });        
    }
});

/*
	Code by Karsten for Youtube video
*/
$(document).ready(function()
    { 
            setTimeout(function(){
                $('div.youtube_container').each(function(index)
                {          
                    //take clip:
                    var c = $(this).find("a").attr("href");
                    var h = $(this).find('img').height();
                    
                    if(c!=undefined && h !=undefined)
                    {                        
                        //// LONG URLS
                        if(c.indexOf("v=") > -1)
                        {
                            var pos = c.indexOf("v=");
                            c = c.substr(pos+2);
                        }
                        
                        //clean up:
                        if(c.indexOf("&") > -1)
                        {
                            var endpos = c.indexOf("&");
                            c = c.substr(0, endpos);
                            
                            var starpos = c.indexOf("v=");
                            c = c.substr(startpos+2);
                        }
                        
                        c = c.replace("/", '');                        
                        
                        //// SHORT URLS
                        if(c.indexOf("youtu.be")> -1)
                        {
                            var startpos = c.indexOf("u.be") + 5;
                            c = c.substr(startpos);
							
							if(c.indexOf("?") > -1)
							{
								var endpos = c.indexOf("?");
							}
							else
							{
								var endpos = c.length;
							}

                            c = c.slice(0, endpos)

                        }
                        
                        //finish
                        c = "http://www.youtube.com/embed/" + c;            
                        
                        //iframe
                        var ifr = '<iframe width="100%" height="'+ h +'" src="'+ c +'" frameborder="0" allowfullscreen></iframe>';
                        $(this).find("div.yt_id").html(ifr); 
                    }                                 
                });
            },1000);     
    });


/*
	Code by Karsten for Storify plugin
*/
     $(document).ready(function(){       
       $('div.storify_container').each(function(index){            
            //take clip:
            var link = $(this).find("a").attr("href");
				if(link!=undefined){
					var js = link + ".js";
					var p_id = $($(this).parent().parent()).attr('id');
					$(this).html('');
					var myscript = document.createElement('script'); 
					myscript.setAttribute('src', js);
					document.getElementById(p_id).appendChild(myscript);
                }
        });
    });