/*****************************
How to use this Popup?
IMPORTANT : DO NOT call this script inside html <header> tag. This script writes some divs to the page, so should be used in html header of the page
            Call it anywhere after the <body> tag or any web user control
            
IMPORTANT: Please note accessibility features mentioned below and strictly follow them. 

STEP 1: Decide if your popup content is in a DIV on the same page or in an URL.

STEP 2: Import these javascipt files and this stylesheet 
    <script src="/javascripts/GetScript.aspx?name=PopupBox" type="text/javascript"></script>
    <script src="/javascripts/GetScript.aspx?name=ScreenPosition" type="text/javascript"></script>
    <style type="text/css">@import url(/stylesheets/getstylesheet.aspx?name=PopupBox);</style>
 
STEP 3:
If content is in DIV:    
    <a href="javascript://Show info" onclick="ShowPopupDiv('_popupInfo1', 0, 0);">Show popup info from DIV</a>

    Example content div: 
    Accessibility Feature: USE the style for content div EXACTLY like below. It will let the screen readers read the content.
    Accessibility Feature: PLACE this div right below the link that invokes it
    <div id="_popupInfo1" style="display:block; top:-10000px; left: -10000px; position:absolute;">Test popup info...</div>
    
    1st parameter - id of the div that contains text to show inside bubble		
	2nd parameter -  xOffset - you can further offset X coordinate of the popup
    3rd parameter -  yOffset - you can further offset Y coordinate of the popup
          
    
If Content is in URL:   
    Accessibility feature: URL must be given in HREF attribute
    Accessibility feature: TITLE attribute must be given relavant description
    <a href="/as/www2/Help/Faqs/test-popdiv-popup.asp" onclick="ShowPopupURL(this, 0, 0);return false;" title="Info link">Show popup info from URL</a>
        
    1st parameter - ALWAYS pass 'this', URL is extracted from anchor's properties
	2nd parameter -  xOffset - you can further offset X coordinate of the popup
    3rd parameter -  yOffset - you can further offset Y coordinate of the popup

    "return false;" must be used in onclick event
********************************/
var _postField = '';
var _updateField = '';
var _updateFieldValue = '';

document.write('<div id="_popupBoxHolder" style="position:absolute;display:none;">');
document.write('<div id="popupBox">');
document.write('<div class="popup">');
document.write('<table>');
document.write('<tbody>'); 
document.write('<tr>'); 
document.write('<td class="tl"><div style="width:26px;"><!-- &nbsp; --></div></td><td class="t"/><td class="tr"><div style="width:26px;"><!-- &nbsp; --></div></td>'); 
document.write('</tr>'); 
document.write('<tr>');
document.write('<td class="l"/>'); 
document.write('<td class="body">');
document.write('<image id="_upperCloseButton" src="/images/B_Close_Dark.gif" title="Close Popup" onclick="javascript:HidePopup(); return false;" class="handcursor" style="border-width:0px;float:right;"/>'); 
document.write('<div class="content" style="clear:both;">');
document.write('<div id="_popupDivContent"></div>');
document.write('</div>'); 
document.write('<div class="footer" style="width:367px;margin-bottom:0;padding-bottom:0; float:right;">'); 
document.write('<image id="_lowerCloseButton" src="/images/B_Close_Dark.gif" title="Close Popup" onclick="javascript:HidePopup(); return false;" class="handcursor" style="border-width:0px;float:right;"/>');
document.write('<image id="_lowerNoButton" src="/images/B_No-Cancel.gif" title="No, Cancel" onclick="javascript:HidePopup(); return false;" class="handcursor" style="border-width:0px;float:left;padding-left:60px;"/>');
document.write('<image id="_lowerYesButton" src="/images/B_Yes-Continue.gif" title="Yes, Continue" onclick="javascript:SubmitFormAndContinue();" class="handcursor" style="border-width:0px;float:left;padding-left:15px;"/>');
document.write('</div>'); 
document.write('</td>'); 
document.write('<td class="r"/>'); 
document.write('</tr>'); 
document.write('<tr>'); 
document.write('<td class="bl"/><td class="b"/><td class="br"/>'); 
document.write('</tr>'); 
document.write('</tbody>'); 
document.write('</table>'); 
document.write('</div>'); 
document.write('</div>');
document.write('</div>');

//This dummy iframe prevents IE6 to show slect boxes through the popup div
document.write('<iframe id="_dummyIframeForPopup" src="javascript:false" scrolling="no" frameborder="0" style="position:absolute;display:none;"></iframe>');

function ShowPopupDiv(idOfContentDiv, xOffset, yOffset)
{    
    ShowPopup(idOfContentDiv, xOffset, yOffset, "FALSE", "FALSE", "FALSE", "TRUE", "TRUE");
}
function ShowPopupDiv2(idOfContentDiv, anchorItem, xOffset, yOffset)
{
	var posofAnchorItem = GetObjectPosition(anchorItem);
    ShowPopup(idOfContentDiv, xOffset , posofAnchorItem.y + yOffset - 250, "FALSE", "FALSE", "FALSE", "TRUE", "TRUE");
}
function ShowPopupDivHideTopCloseButton(idOfContentDiv, xOffset, yOffset)
{    
    ShowPopup(idOfContentDiv, xOffset, yOffset, "FALSE", "TRUE", "FALSE", "TRUE", "TRUE");
}
function ShowPopupDivHideTopBottomCloseButton(idOfContentDiv, xOffset, yOffset)
{
	ShowPopup(idOfContentDiv, xOffset, yOffset, "FALSE", "TRUE", "TRUE", "TRUE", "TRUE");
}
function ShowPopupDivHideCloseShowYesNoButton(idOfContentDiv, anchorItem, xOffset, yOffset, postField, updateField, updateFieldValue)
{
    var posofAnchorItem = GetObjectPosition(anchorItem);
    _postField = postField;
    _updateField = updateField;
    _updateFieldValue = updateFieldValue;
    
	ShowPopup(idOfContentDiv, xOffset, posofAnchorItem.y + yOffset - 250, "FALSE", "TRUE", "TRUE", "FALSE", "FALSE");
}
function ShowPopupURL(anchorItem, xOffset, yOffset)
{
    var url = anchorItem.href;
    ShowPopup(url, xOffset, yOffset, "TRUE", "FALSE", "FALSE", "TRUE", "TRUE");
}
function ShowPopupURL2(anchorItem, xOffset, yOffset)
{
    var url = anchorItem.href;
    var posofAnchorItem = GetObjectPosition(anchorItem);
    ShowPopup(url, xOffset, posofAnchorItem.y + yOffset, "TRUE", "FALSE", "FALSE", "TRUE", "TRUE");
}
function ShowPopupURLHideTopCloseButton(anchorItem, xOffset, yOffset)
{
    var url = anchorItem.href;
    ShowPopup(url, xOffset, yOffset, "TRUE", "TRUE", "FALSE", "TRUE", "TRUE");
}

function ShowPopupURLHideTopBottomCloseButton(anchorItem, xOffset, yOffset)
{
    var url = anchorItem.href;
    ShowPopup(url, xOffset, yOffset, "TRUE", "TRUE", "TRUE", "TRUE", "TRUE");
}

function ShowPopup(divIdORUrlOfContent, xOffset, yOffset, isURL, hideUpperCloseButton, hideLowerCloseButton, hideLowerYesButton, hideLowerNoButton)
{
    var popupDiv;
    var posXofPopup;
    var posYofPopup;
    
    if (isNaN(xOffset)){ xOffset = 0;}
    if (isNaN(yOffset)){ yOffset = 0;}
    
    posXofPopup = 250 + xOffset;
    posYofPopup = 250 + yOffset;
    
    document.getElementById("_popupDivContent").innerHTML = GetSpinWheel();
    
    if (isURL == "TRUE")
    {                              
        LoadUrl(divIdORUrlOfContent, "_popupDivContent");
    }
    else
    {
        document.getElementById("_popupDivContent").innerHTML = document.getElementById(divIdORUrlOfContent).innerHTML;
    }   
    
    if (hideUpperCloseButton == "TRUE")
    { 
		document.getElementById("_upperCloseButton").style.display = "none";        
	}
	else
	{
	    document.getElementById("_upperCloseButton").style.display = "block"; 
	}
	
	if (hideLowerCloseButton == "TRUE")
	{
		document.getElementById("_lowerCloseButton").style.display = "none";  
	}
	else
	{
	    document.getElementById("_lowerCloseButton").style.display = "block"; 
	}
    
    if (hideLowerYesButton == "TRUE")
	{
		document.getElementById("_lowerYesButton").style.display = "none"; 
	}
	else
	{
	    document.getElementById("_lowerYesButton").style.display = "inline"; 
	}
	
	if (hideLowerNoButton == "TRUE")
	{
		document.getElementById("_lowerNoButton").style.display = "none";  
	}
	else
	{
	    document.getElementById("_lowerNoButton").style.display = "inline";
	}
	 
    popupDiv = document.getElementById("_popupBoxHolder");    
    popupDiv.style.top = posYofPopup + "px";
    popupDiv.style.left = posXofPopup + "px";
    popupDiv.style.zIndex = 1200;        
    popupDiv.style.display = "block";                            
    
   var dummyIframe;
    if (!window.XMLHttpRequest)
    {
        dummyIframe = document.getElementById("_dummyIframeForPopup");	    
        dummyIframe.style.width =  popupDiv.offsetWidth;
        dummyIframe.width = popupDiv.offsetWidth; 
	    dummyIframe.style.height = popupDiv.offsetHeight;
	    dummyIframe.height = popupDiv.offsetHeight; 	
	    dummyIframe.style.top = posYofPopup + "px";  
	    dummyIframe.style.left = posXofPopup + "px"; 
	    dummyIframe.style.zIndex = popupDiv.style.zIndex - 1; 	
	    dummyIframe.style.display = "block";
	}	
}

/*To avaoid IE6 see through*/
function SetDummyIFrameHeight()
{
    if (!window.XMLHttpRequest)
    {
        var dummyIframe = document.getElementById("_dummyIframeForPopup");	    
        var popupDiv = document.getElementById("_popupBoxHolder");
        if (dummyIframe != null && popupDiv != null){ dummyIframe.style.height = popupDiv.offsetHeight;}
    }
}
function SubmitFormAndContinue()
{
    HidePopup();
    document.getElementById(_updateField).value = _updateFieldValue;
    __doPostBack(document.getElementById(_postField), '');
}
function HidePopup()
{
    var popupDiv = document.getElementById("_popupBoxHolder");
    if (popupDiv != null){ popupDiv.style.display = "none";}
    HideDummyIframe();          
}

function HideDummyIframe()
{
    if (!window.XMLHttpRequest)
    {
        var dummyIframe = document.getElementById("_dummyIframeForPopup");
        if(dummyIframe != null){ dummyIframe.style.display = "none";}
    }
}

function GetSpinWheel()
{
    var spinWheel;
    spinWheel = '<div style="position:relative; top:15px; left:150px;"><img src="/images/spinwheel-waiting.gif" border="0"/></div>';
    return spinWheel;
}

function AnimateOpacity(id, opacStart, opacEnd, millisec) 
{
    //speed for each frame
    var speed = Math.round(millisec / 100);
    var timer = 0;

    //determine the direction for the blending, if start and end are the same nothing happens
    if(opacStart > opacEnd) 
    {
        for(i = opacStart; i >= opacEnd; i--) 
        {
            setTimeout("ChangeOpacity(" + i + ",'" + id + "')",(timer * speed));
            timer++;
        }
    } 
    else if(opacStart < opacEnd) 
    {
        for(i = opacStart; i <= opacEnd; i++)
        {
            setTimeout("ChangeOpacity(" + i + ",'" + id + "')",(timer * speed));
            timer++;
        }
    }
}

//change the opacity for different browsers
function ChangeOpacity(opacity, id) 
{
    var object = document.getElementById(id);
    object.style.opacity = (opacity / 100);
    object.style.MozOpacity = (opacity / 100);
    object.style.KhtmlOpacity = (opacity / 100);
    object.style.filter = "alpha(opacity=" + opacity + ")";      
    object.style.zoom = "1";
}

function FetchUrl(url, targetDivId) 
{
  document.getElementById(targetDivId).innerHTML = GetSpinWheel();
  if (window.XMLHttpRequest) { req = new XMLHttpRequest();} 
  else if (window.ActiveXObject) { req = new ActiveXObject("Microsoft.XMLHTTP");}
  
  if (req != undefined)
  {
    req.onreadystatechange = function() {FetchUrlDone(url, targetDivId);};
    req.open("GET", url, true);
    req.send("");
  }
}  

function FetchUrlDone(url, targetDivId)
{
  if (req.readyState == 4) // only if req is "loaded"
  {
	if (req.status == 200) // only if "OK"
	{
      document.getElementById(targetDivId).innerHTML = req.responseText;
    }
    else
    {
      document.getElementById(targetDivId).innerHTML="<br/><br/><br/>Requested information not found at following location : <br/><br/>" + url + "<br/><br/><br/>";
      //"<br/>" + req.status + "<br/>" + req.statusText;
    }
    SetDummyIFrameHeight();
  }
}

function LoadUrl(url, targetDivId) 
{
	FetchUrl(url,targetDivId);
	return false;
}
