/*
HOW to use this script
STEP 1: Inlcude this script
<script src="/javascripts/GetScript.aspx?name=ScreenPosition" type="text/javascript"></script> 
 
 To otain postion of an element on the screen, pass any element.
 For example, id of an link (Anchor item) is: _mapLink
 var anchorItem = document.getElementById("_mapLink");
 var objPosition = GetObjectPosition();
 var objPositionLeft = objPosition.x;
 var objPositionTop = objPosition.y;

For finding the position of scroll bar 
var positionObject = getScrollPositions();
var scrollLeftPosition = positionObject.x;
var scrollTopPosition = positionObject.y; 
*/

function GetScrollPosition()
{
	var scroll = {x:0, y:0};
	if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) )
	{	//DOM compliant
		scroll.x = document.body.scrollLeft;
		scroll.y = document.body.scrollTop;
	}
	else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) 
	{	//IE6 standards compliant mode
		scroll.x = document.documentElement.scrollLeft;
		scroll.y = document.documentElement.scrollTop;
	}
	else if( typeof( window.pageYOffset ) == 'number' )
	{	//Netscape compliant
		scroll.x = window.pageXOffset;
		scroll.y = window.pageYOffset;
	}
	else if( window.scrollX != null )
	{
		scroll.x = window.scrollX;
		scroll.y = window.scrollY;
	}
	
	scroll.x = parseInt(scroll.x);
	scroll.y = parseInt(scroll.y);
	if ((isNaN(scroll.x) == true) || (scroll.x < 0)){ scroll.x = 0; }
	if ((isNaN(scroll.y) == true) || (scroll.y < 0)){ scroll.y = 0; }
	
	return scroll;
}
function GetObjectPosition(obj) 
{
	var position = {x:0, y:0};
	if (obj.offsetParent)
	{ 
		while (obj.offsetParent)
		{ 
			position.x += obj.offsetLeft;
			position.y += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}
	else if (obj.y || obj.x)
	{
		position.x += obj.x;
		position.y += obj.y; 
	}
	return position;
}
function GetEventPosition(e) 
{
	e = e || window.event;
	var cursor = {x:0, y:0};
	if (e.pageX || e.pageY) 
	{
		cursor.x = e.pageX;
		cursor.y = e.pageY;
	}
	else 
	{
		var de = document.documentElement;
		var b = document.body;
		cursor.x = e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
		cursor.y = e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
	}
	return cursor;
}