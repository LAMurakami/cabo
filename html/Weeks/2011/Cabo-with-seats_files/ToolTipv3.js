var isMacIE = navigator.userAgent.indexOf('MSIE 5.')!=-1 && navigator.userAgent.indexOf('Mac')!=-1; function getPageWidth()
{ if(window.innerWidth!=null)
return window.innerWidth; if(document.body.clientWidth!=null)
return document.body.clientWidth; return (null);}
function ShowTip(evt, objectID, title, content, titleclass, contentclass)
{ ShowTip2(evt, objectID, title, content, titleclass, contentclass, "", "")
}
function ShowTip2(evt, objectID, title, content, titleclass, contentclass, tipwidth, tipheight)
{ var px = (navigator.appName == "Netscape" && parseInt(navigator.appVersion,10) == 4) ? '':'px'
if(isDHTML)
{ if(document.layers)
document.captureEvents(Event.MOUSEMOVE); var pageWidth=getPageWidth(); var style=getElement(objectID, 1); var dom=getElement(objectID, 0); var state=style.visibility; var elemWidth = 0; if(dom.offsetWidth)
elemWidth=dom.offsetWidth; else
{ if(dom.clip)
if(dom.clip.width)
elemWidth=dom.clip.width;}
if(state=='visible' || state=='show')
style.visibility='hidden'; else
{ if(evt.pageY)
{ topVal=evt.pageY+15; leftVal=evt.pageX+15;}
else
{ if(evt.y)
{ if(document.documentElement && document.documentElement.scrollTop)
{ topVal = evt.y+15+document.documentElement.scrollTop; leftVal = evt.x+15+document.documentElement.scrollLeft;}
else if(document.body)
{ topVal = evt.y+15+document.body.scrollTop; leftVal= evt.x+15+document.body.scrollLeft; if(isMacIE)
topVal-=135;}
else{}
}
}
if(leftVal<2)
leftVal=2; else
{ if((leftVal+elemWidth)>pageWidth)
leftVal=leftVal-(elemWidth/2);}
EnterContent(objectID, title, content, titleclass, contentclass, tipwidth, tipheight)
style.top=topVal+px; 
style.left=leftVal+px;
style.zIndex=500; 
style.visibility="visible";}
}
}
function EnterContent(objectID, title, content, titleclass, contentclass, tipwidth, tipheight)
{ if(tipwidth=='')
{ tipwidth=150;}
if(isMacIE)
{ ContentInfo = '<div id="tt_title" style="background-color: #b0cde2; color: #000000; text-decoration: none; cursor: Default; font-family: Arial, Geneva, sans-serif; font-weight: bold; font-size: 8pt; padding: 2px; width: '+tipwidth+'px; height: '+tipheight+'px; border-left: 1px solid; border-top: 1px solid; border-right: 1px solid; z-index:500;">'+title+'</div>'+ '<div id="tt_content" style="background-color: #ffffff; color: #000000; text-decoration: none; cursor: Default; font-family: Arial, Geneva, sans-serif; font-size: 8pt; padding: 2px; width: '+tipwidth+'px; height: '+tipheight+'px; border: 1px solid; z-index:500;">'+content+'</div>';}
else
{ ContentInfo = '<table border="0" width="'+tipwidth+'" height="'+tipheight+'" cellspacing="0" cellpadding="0">'+ '<tr><td width="100%" bgcolor="#000000">'+ '<table border="0" width="100%" cellspacing="1" cellpadding="0">'+ '<tr><td width="100%">'+ '<table border="0" width="100%" cellspacing="0" cellpadding="0" align="center">'+ '<tr><td width="100%" class="'+titleclass+'">&nbsp;'+title+'</td></tr></table>'+ '</td></tr>'+ '<tr><td width="100%" bgcolor="#ffffff">'+ '<table border="0" width="100%" cellpadding="1" cellspacing="1" align="center">'+ '<tr><td width="100%" class="'+contentclass+'">'+content+'</td></tr></table>'+ '</td></tr>'+ '</table>'+ '</td></tr></table>';}
ReplaceContent(objectID, ContentInfo)
}
function ReplaceContent(objectID, ContentInfo)
{ if(isID)
document.getElementById(objectID).innerHTML = ContentInfo; else
{ if(isAll)
document.all[objectID].innerHTML = ContentInfo; else
{ if(isLayers)
{ with(document.layers[objectID].document)
{ open(); write(ContentInfo); close();}
}
}
}
}
