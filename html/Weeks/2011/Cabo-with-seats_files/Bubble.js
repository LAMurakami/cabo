/*
HOW TO CREATE BUBBLE?
IMPORTANT : DO NOT call this script inside html <header> tag. This script writes some divs to the page, so should be used in html header of the page
            Call it anywhere after the <body> tag.

STEP1. Include following code on the page

    <!--import  Hover bubble code-->
    <script src="/javascripts/GetScript.aspx?name=Bubble" type="text/javascript"></script> 
    
    <!-- import screen postion code -->
    <script src="/javascripts/GetScript.aspx?name=ScreenPosition" type="text/javascript"></script>     

    <!--import  Hover bubble styles->
    <style type="text/css">@import url(/stylesheets/getstylesheet.aspx?name=bubble);</style>

STEP2 : On the LINK where you want bubble to appear, do this:
    For wide bubble: ShowHoverBubbleWide(idOfConentDiv, anchorItem, xOffset, yOffset)
    <a href="javascript://Show Description" onmouseover="ShowHoverBubbleWide('_descForBubble1', this, 0, 0);" onmouseout="HideHoverBubbleWide();">The Link text here</a>
    
    For narrow bubble: ShowHoverBubbleNarrow(idOfConentDiv, anchorItem, xOffset, yOffset)
    <a href="javascript://Show Description" onmouseover="ShowHoverBubbleNarrow('_descForBubble1', this, 0, 0);" onmouseout="HideHoverBubbleNarrow();">The Link text here</a>

    1st parameter - id of the div that contains text to show inside bubble	
	2nd parameter - just pass 'this'  --- anchor (href) object, so the position of the map is calculated.
	3rd parameter -  xOffset - you can further offset X coordinate of the bubble 
    4th parameter -  yOffset - you can further offset Y coordinate of the bubble
    

STEP3 : Put your bubble content in a div and give the div same id you pass in the function call of ShowHoverBubbleWide, in the above example its _descForBubble1
    The content of this div is read and populated to popup bubble

     * FEATURES:
             * 1. There are two bubbles available Wide (500px wide) and Narrow (200px wide).
             * 2. The height is flexible and autmatically set
             * 3. The IE see through select box issue is handle by a dummy iFrame
             * 4. Flips up or down based on the space available on the screen below the link
    */
    
	
	// WIDE BUBBLE HTML Code this is the div that shows up as bubble
    document.write('<div class="wide-hoverBubble" id="_hoverBubbleBox-wide" style="display:none;z-index:1000;">');
	document.write('<div class="wide-hoverBubble-top" id="_hoverBubbleTop-wide"></div>');
	document.write('<div class="wide-hoverBubble-middle" id="_hoverBubbleMiddle-wide">');
	document.write('<div id="_bubbleContent-wide">');	
	document.write('<!-- -->');	
	document.write('</div>');												
	document.write('</div>');
	document.write('<div class="wide-hoverBubble-bottom" id="_hoverBubbleBottom-wide"></div>');
	document.write('</div>');
	
	//This dummy iframe prevents IE6 to show slect boxes through the popup div
    document.write('<iframe id="_dummyIframeForHoverBubble" src="javascript:false;" scrolling="no" frameborder="0" style="position:absolute;display:none;"></iframe>');
      
    
   //NARROW BUBBLE  HTML code - this is the div that shows up as bubble-->
    document.write('<div class="narrow-hoverBubble" id="_hoverBubbleBox-narrow" style="display:none;z-index:1000;">');
	document.write('<div class="narrow-hoverBubble-top" id="_hoverBubbleTop-narrow"></div>');
	document.write('<div class="narrow-hoverBubble-middle" id="_hoverBubbleMiddle-narrow">');
	document.write('<div id="_bubbleContent-narrow">');
	document.write('</div>');					
	document.write('</div>');
	document.write('<div class="narrow-hoverBubble-bottom" id="_hoverBubbleBottom-narrow"></div>');
	document.write('</div>');	


//bubbleType = 1 for wide
//bubbleType = 2 for narrow
function HideHoverBubble(bubbleType)
{
    var suffix;
       
    if(bubbleType == 1) //1 = WIDE, 2 = narrow
    {
        suffix = "wide";
    }     
    else
    {
        suffix = "narrow";
    }
    
    var hoverBox = document.getElementById("_hoverBubbleBox-" + suffix);   
    hoverBox.style.display = "none";   
    
    var dummyIframe = document.getElementById("_dummyIframeForHoverBubble");	
    dummyIframe.style.display = "none";         
}

function HideHoverBubbleWide()
{
    HideHoverBubble(1);        
}

function HideHoverBubbleNarrow()
{
    HideHoverBubble(2);         
}


//WIDE BUBBLE
function ShowHoverBubbleWide(idOfConentDiv, anchorItem, xOffset, yOffset)
{
    ShowHoverBubble(idOfConentDiv, anchorItem, 1, xOffset, yOffset); //2 for narrow, 1 for wide                    	           	
}

//NARROW BUBBLE
function ShowHoverBubbleNarrow(idOfConentDiv, anchorItem, xOffset, yOffset)
{   
    ShowHoverBubble(idOfConentDiv, anchorItem, 2, xOffset, yOffset); //2 for narrow, 1 for wide                    	
}

// bubbleType : 2 for narrow, 1 for wide 
function ShowHoverBubble(idOfConentDiv, anchorItem, bubbleType, xOffset, yOffset)
{            
    var suffix;    
       
    if (bubbleType == 1) //WIDE
    {
        suffix = "wide";
    }     
    else
    {
        suffix = "narrow";
    }       
        
    var hoverBox = document.getElementById("_hoverBubbleBox-" + suffix);
    var descriptionDiv = document.getElementById(idOfConentDiv);   
    var hoverBubbleTopDiv = document.getElementById("_hoverBubbleTop-" + suffix);
    var hoverBubbleBottomDiv = document.getElementById("_hoverBubbleBottom-" + suffix);       
    var anchorItemPos = GetObjectPosition(anchorItem);
    var hoverBoxPosX = anchorItemPos.x + 5;
    var hoverBoxPosY = anchorItemPos.y + 30;  
    
    if (isNaN(xOffset)){ xOffset = 0;}
    if (isNaN(yOffset)){ yOffset = 0;}
        
    hoverBoxPosX = hoverBoxPosX + xOffset;  
    hoverBoxPosY = hoverBoxPosY + yOffset;  
                                                  
    document.getElementById('_bubbleContent-' + suffix).innerHTML  = descriptionDiv.innerHTML;    
    hoverBox.style.top = hoverBoxPosY + "px"; 
    hoverBox.style.left = hoverBoxPosX + "px"; 
    hoverBox.style.display = "block";   
    hoverBubbleTopDiv.className = suffix + "-hoverBubble-top";        
    hoverBubbleBottomDiv.className = suffix + "-hoverBubble-bottom";
    
    var dummyIframe = document.getElementById("_dummyIframeForHoverBubble");					
	dummyIframe.style.width =  hoverBox.offsetWidth; 
	dummyIframe.width = hoverBox.offsetWidth; //firefox doesn't read from style height/ width for iframe			 
	dummyIframe.style.height = hoverBox.offsetHeight - 33;			
	dummyIframe.height = hoverBox.offsetHeight - 33;
	
	dummyIframe.style.top = (hoverBoxPosY + 32) + "px";  
	dummyIframe.style.left = (hoverBoxPosX -1) + "px"; 
	dummyIframe.style.zIndex = hoverBox.style.zIndex - 1; 
	dummyIframe.style.display = "block";	
    
     //Determine position top or bottom
    var isIE = document.all?true:false;
    var windowHeight = 0;
    var hoverBoxHeight = hoverBox.offsetHeight;
    
    if(isIE){	windowHeight = document.documentElement.clientHeight;}
    else {	windowHeight = window.innerHeight;}
	
	//Is there enough space in the screen to show bubble in bottom position?
	//If not then show the buble top 				
	var positionObject = GetScrollPosition();
    var scrollTopPosition = positionObject.y;
        			
	if((hoverBoxHeight + hoverBoxPosY) > (windowHeight + scrollTopPosition ))   
	{
	    hoverBoxPosY = hoverBoxPosY - hoverBoxHeight - 30;	    
	    hoverBox.style.top = hoverBoxPosY + "px";        	    
	    dummyIframe.style.height = hoverBoxHeight - 33;	
	    dummyIframe.height = hoverBoxHeight - 33;	
	    dummyIframe.style.width = hoverBox.offsetWidth;	    		        
	    dummyIframe.width = hoverBox.offsetWidth;	    
        dummyIframe.style.top = (hoverBoxPosY + 14) + "px";        
        
        hoverBubbleTopDiv.className = suffix + "-hoverBubble-top-inverted";        
        hoverBubbleBottomDiv.className = suffix + "-hoverBubble-bottom-inverted";
	}
}