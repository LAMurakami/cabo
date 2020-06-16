/***************************************************************************
 [Alaska_ActiveAgent.js]
 
 Copyright (C) 2010 Next IT Corporation, Inc. Spokane, WA. All Rights Reserved. 
 This document is confidential work and intellectual property of Next IT 
 Corporation. Permission to copy, distribute or use any portion of this file 
 is prohibited without the express written consent of Next IT Corporation.

 Version: 1.0
 
 Notes:
	This will be included on client's website to support Launching agent and other 
	client specific tasks
	Created 9/11/2009 Jayesh Modha.

*****************************************************************************/
var ActiveAgent_PageName = 'https://www.alaskaair.com/alaskawebui/Agent.aspx';

function ActiveAgent_LaunchJenn(question) 
{
    var AgentUrl = ActiveAgent_PageName;
    
	if (question && question.length > 0)
    {
        AgentUrl = ActiveAgent_PageName + '?q=' + encodeURIComponent(question);
    }
    
    
	//Agent window width/height and parent window width/height must match popupsettings control in agent.aspx
    var options = 'scrollbars=no,menubar=no,resizable=yes,location=no,status=yes,titlebar=no,toolbar=no';
    PopupScript.LaunchChildWindow(AgentUrl, 'AlaskaExternalAgent', 'right', 255, 680, 50, 0, true, 878, 733, options);
    
    //Refresh Parent window In Https protocol
    RefreshParentInHttps();
}

function RefreshParentInHttps() 
{
    //check if parent window requires reload in https protocol
    var urlprotocol = "https:";
    
    if (location.protocol.toLowerCase() == 'http:') 
    {
        location.href = location.href.replace('http:', urlprotocol);
    }
}

var version = '6.2';
function PopupScript() { };
PopupScript.ApplyParentTop = false; // By default, parent top does not match popup window
PopupScript.PerfectWindowSize = false; // By default, we size by content only and allow window overlap

//Overrode core popup script to include continental specific changes such as window name
//////////////////////////////////////
// Opens popup window and sizes parent window accordingly
//////////////////////////////////////
PopupScript.LaunchChildWindow = function(url, agentWindowName, align, width, height, top, left, layoutParent, parentWidth, parentHeight, options) 
{
    align = (!align || align.toLowerCase() != 'left') ? 'right' : 'left'; // Default to right if not 'left'
    width = (width) ? width : 250; // Default width: 250px
    height = (height) ? height : '100%'; // Default height: 100%
    top = (top) ? top : 0; // Default top: 0px
    left = (left) ? left : 0; // Default left: 0px
    layoutParent = (layoutParent) ? true : false;
    parentWidth = (parentWidth) ? parentWidth : '100%'; // Default height: 100%
    parentHeight = (parentHeight) ? parentHeight : '100%'; // Default height: 100%
    options = (options) ? options : 'scrollbars=no,menubar=no,resizable=no,location=no,status=yes,titlebar=no,toolbar=no';

    // Make sure they're numeric (Convert from percentages
    width = PopupScript.WidthToScreen(width);
    height = PopupScript.HeightToScreen(height, top);
    top = PopupScript.WidthToScreen(top);
    left = PopupScript.HeightToScreen(left, top);
    parentWidth = PopupScript.WidthToScreen(parentWidth);
    parentHeight = PopupScript.HeightToScreen(parentHeight, top);

    var parentLeft = (align == 'left') ? width : 0;

    // Parent width not specified or not enough space for parent window and need to shrink to fit
    if (parentWidth <= 0 || parentWidth + width > screen.availWidth) {
        parentWidth = screen.availWidth - width; // Must also make parent window fit
    }

    // Parent height not specified or taller than can fit
    if (parentHeight <= 0 || parentHeight + top > screen.availHeight) {
        parentHeight = screen.availHeight - top; // Must also make parent window fit
    }

	// If Agent height is taller than it can fit within the screenheight, this would occur with 800x600 resolution
    if (height + top > screen.availHeight) 
    {
        height = screen.availHeight - top; // Must also make agent window fit
    }
    
    if (align == 'right') // Detect "left" and ignore setting
    {
        left = parentWidth;
    }

    var allOptions = 'width=' + width + 'px,height=' + height + 'px,left=' + left + ',top=' + top + ',' + options;
    
    var ActiveAgent_AgentWindow = window.open('', agentWindowName,allOptions);
    var win = ActiveAgent_AgentWindow;
    
    try
    {
		var agentWindowUrl = ActiveAgent_AgentWindow.location.href.toString();
		
		//we would be able to read the URL as we are in same subdomain
		if(url != agentWindowUrl)
		{
			win = window.open(url, agentWindowName ,allOptions);
			
			if (win)
			{
				if (PopupScript.PerfectWindowSize)
				{
					// The popup size is for content only, we need to resize to get the size perfect
					win.resizeTo(width, height);
					win.moveTo(left, top);
				}
				
				var pTop = (PopupScript.ApplyParentTop)?top:0;
				
				if (layoutParent)
					PopupScript.PositionWindow(window, parentWidth, parentHeight, pTop, parentLeft);
				
				win.focus(); 
			}
		}
		else
		{
			//if the window is already open just focus on it
			ActiveAgent_AgentWindow.focus();     
		}
    }
    catch(e)
    {
		var message = GetErrorMessage(e);
		if(message.indexOf("denied") != -1)
		{
			ActiveAgent_AgentWindow.focus();      
		}
    }
    
    return win; // Return window reference in case we need to use it
};

//////////////////////////////////////
// Positions a window according to width/height, top/left (used by LaunchChildWindow)
//////////////////////////////////////
PopupScript.PositionWindow = function(win, width, height, top, left) {
    try {
        win.moveTo(0, 0); // This helps it work better when it's maximized... (IE seems to get confused sometimes)
        win.resizeTo(width, height);
        win.moveTo(left, top);

    }
    catch (e) // Permission denied? Happens if we change out of our domain, we should make sure it doesn't happen in any other situation, or comment out throw below
	{
        // if not permission denied, throw the error		
        if (GetErrorMessage(e).indexOf('denied') == -1) {
            throw e;
        }
    }
};

//////////////////////////////////////
// Converts percentages to pixels to match screen width (ie. 50% -> 600)
//////////////////////////////////////
PopupScript.WidthToScreen = function(w) {
    if (!IsNumeric(w) && w.indexOf('%') > -1) {
        w = w.substring(0, w.indexOf('%'));
        w = screen.availWidth * w / 100;
    }
    return parseInt(w);
};
//////////////////////////////////////
// Converts percentages to pixels to match screen height (ie. 50% -> 600)
//////////////////////////////////////
PopupScript.HeightToScreen = function(h, top) {
    if (!IsNumeric(h) && h.indexOf('%') > -1) {
        h = h.substring(0, h.indexOf('%'));
        h = (screen.availHeight * h / 100) - top;
    }
    return parseInt(h);
};
//////////////////////////////////////
// General functions
//////////////////////////////////////
function IsNumeric(o) { return (typeof o == 'number' && isFinite(o)); };
function IsWindowClosed(win) {
    var closed = false;
    try // getting around permission problem on closed windows
	{
        closed = (win == null || win.closed || typeof (win.self) == 'undefined'); // Added checking win.self for Safari and browsers that don't support window.closed properly
    }
    catch (e) { closed = true; }
    return closed;
};

function GetErrorMessage(e)
{
	// NOTE:  Permission Denied does not throw exception for: Safari 3 (Mac and PC), Chrome 1.0
	if (e.message) // IE6, IE7, FF3
		return e.message;
	else // FF1, FF1.5, FF2, FF3
		return e.toString();
};
/***************************************************************************
[Cookie.js]
 
Copyright (C) 2010 Next IT Corporation, Inc. Spokane, WA. All Rights Reserved. 
This document is confidential work and intellectual property of Next IT 
Corporation. Permission to copy, distribute or use any portion of this file 
is prohibited without the express written consent of Next IT Corporation.

*****************************************************************************/
function Cookie(name, sVals, exp) {
    this.Name = name;
    this.Value = null;
    this.Values = new Object();
    // These three are for saving cookies
    this.Expires = (exp) ? exp : null; // Leave null for session cookie (or if updating cookie)
    this.Path = '/';
    this.Secure = false;
    this.Domain = GetDomain();

    if (sVals != null) // Parse specified value(s)
    {
        var nvc = (typeof (sVals) == "string") ? sVals.split('&') : null; // Get the name-value collection from the cookie
        if (nvc != null && nvc.length > 0 && nvc[0].indexOf('=') > -1) {
            for (var i = 0; i < nvc.length; i++) {
                var nv = nvc[i].split('='); // Get the name and value of this entry
                this.Values[nv[0]] = nv[1]; // Add property to our Values
            }
        }
        else // Single value cookie
            this.Value = sVals;
    }

    // Methods
    this.Save = function() {
        var v = '';
        for (var n in this.Values) {
            v += '&' + n + '=' + escape(this.Values[n]);
        }
        if (v == '') v = escape(this.Value);
        else v = v.substr(1);

        var me = this.Name + '=' + v +
			((this.Expires == null) ? "" : (";expires=" + this.Expires.toGMTString())) +
			";path=" + this.Path +
			((this.Domain == null) ? "" : (";domain=" + this.Domain)) +
			((this.Secure) ? ";secure;" : ";");
        document.cookie = me;
    };

    this.Delete = function() {
        this.Expires = new Date(1970, 0, 2); // "Fri, 02-Jan-1970 00:00:00 GMT" );
        this.Save();
    };
};

function GetCookies() // Pareses all available cookies
{
    var all = new Object();
    if (document.cookie != "") {
        var cookies = document.cookie.split("; ");
        for (i = 0; i < cookies.length; i++) {
            var c = cookies[i];
            var idx = c.indexOf('=');
            var N = c.substr(0, idx);
            var V = '';
            if (c.length > idx + 1) // Not an empty value (just in case)
                V = unescape(c.substring(idx + 1, c.length));
            all[N] = new Cookie(N, V);
        }
    }
    return all;
};

function GetCookie(name) // Selects a cookie by name
{
    return GetCookies()[name];
};

function ShowCookies() {
    var cookies = GetCookies();
    var sCookie = '';
    for (var crumb in cookies) {
        sCookie += 'Name: ' + cookies[crumb].Name + '\n';
        sCookie += 'Value: ' + cookies[crumb].Value + '\n';
        // now show Values array for the current crumb
        for (var values in cookies[crumb].Values) {
            sCookie += "    " + values + ": ";
            sCookie += cookies[crumb].Values[values] + "\n";
        }
    }
    alert(sCookie);
}

function GetDomain() {
    var url = document.domain;
    var end = "";
    var s = url.indexOf('.');

    if (url.indexOf('.') > -1) {
        end = url.substr(url.lastIndexOf('.'));
        url = url.substring(0, url.lastIndexOf('.'));
    }
    if (url.indexOf('.') > -1) {
        url = url.substr(url.lastIndexOf('.') + 1);
    }
    url = url + end;
    if (url.indexOf('.') == -1) {
        url = null;
    }
    return url;
};

function AreCookiesEnabled() {
    // set a cookie then test to see if it was set properly
    var AA_Cookie = new Cookie("ActiveAgent_TestCookie", "test");
    AA_Cookie.Save();

    return (document.cookie == '' ? false : true);
};

// instance of ActiveAgent_PageInfo used in the ActiveAgent_SetPageInfo function
var _AA_PageInfo = new ActiveAgent_PageInfo()
////////////////////////////////////////////////////////////////////////////////
// Function:    ActiveAgent_SetPageInfo (AndURL)
// Description:
//      Call this function on pageload to tell ActiveAgent your page
//      information.  It will get the URL and timestamp automatically.
//      
////////////////////////////////////////////////////////////////////////////////
function ActiveAgent_SetPageInfo(formName, viewID)
{
    var url = _ActiveAgent_GetPageURL();
    if(IsAgentAssociatedParentWindow())        
    {
		_ActiveAgent_SetPageInfo(url, formName, viewID)
    }
};

function ActiveAgent_SetPageInfoAndURL(url, formName, viewID)
{
    _ActiveAgent_SetPageInfo(_ActiveAgent_GetPageURL(url), formName, viewID)
};

////////////////////////////////////////////////////////////////////////////////
// Function:    ActiveAgent_SetPageError
// Description:
//      Call this function when an error occurs in the page and Jenn will 
//      pick up the error and offer assistance (if she's open).
//      
////////////////////////////////////////////////////////////////////////////////
function ActiveAgent_SetPageError(errorCode)
{
    if(IsAgentAssociatedParentWindow())        
    {
		if(!isNaN(errorCode) && errorCode != 0)
		{
			_AA_PageInfo.SetPageError(errorCode);
		}
    }
}

////////////////////////////////////////////////////////////////////////////////
// Function:    ActiveAgnet_GetPageInfo
// Description:
//      function called by Jenn to retrieve current page info
//      
////////////////////////////////////////////////////////////////////////////////
function ActiveAgent_GetPageInfo(userInput)
{
	// get the current page info
    var pageInfo = _AA_PageInfo.GetPageInfo();
    
    userInput.push( new KeyValueOfStringString("CurrentPage", pageInfo) );
};

///////////////////////////////////////////////////////////////////////////////
//  Object: ActiveAgnet_PageInfo
//  Desc:   Object used to set/get page/error info.  _ActiveAgent_Cookie 
//          object is used for the actual message transfer.
//
///////////////////////////////////////////////////////////////////////////////

ActiveAgent_PageInfo.prototype.PollingInterval = 1000; //ms
//ActiveAgent_PageInfo.prototype.GracePeriod = 2000; //ms
ActiveAgent_PageInfo.prototype.CookieName = 'ActiveAgent_PageInfo';
ActiveAgent_PageInfo.prototype.ErrorCookieName = 'ActiveAgent_PageError';
ActiveAgent_PageInfo.prototype.URLProperty = 'URL';
ActiveAgent_PageInfo.prototype.FormNameProperty = 'FormName';
ActiveAgent_PageInfo.prototype.ViewIDProperty = 'ViewID';
ActiveAgent_PageInfo.prototype.ErrorCodeProperty = 'ErrorCode';
ActiveAgent_PageInfo.prototype.DateTimeProperty = 'DateTime';
//ActiveAgent_PageInfo.prototype.ThirdPartyProperty = 'ThirdParty';
ActiveAgent_PageInfo.prototype.UserInfoCookieName = 'AS%5FACNT';
var ParentWindowNameCookie = "ActiveAgent_ParentWindowName";

function ActiveAgent_PageInfo() 
{
    this.URL = '';
    this.FormName = '';
    this.ViewID = '';
    //this.ThirdParty = 'false';
	this.DateTime = new Date();

    this.SetInfoTimerID = 0;
    this.GetErrorTimerID = 0;
    
    this.SetPageInfo = function()
    {
        var now = new Date();
        
        // build name/value pair to be saved to cookie
        var cookieValue = this.URLProperty + "=" + encodeURIComponent(this.URL) + '&';
        cookieValue += this.FormNameProperty + "=" +  encodeURIComponent(this.FormName) + '&';
        cookieValue += this.ViewIDProperty + "=" +  encodeURIComponent(this.ViewID) + '&';
        cookieValue += this.DateTimeProperty + "=" +  now.getTime();
        
        // set and save the cookie value
        var cookie = new _ActiveAgent_Cookie(this.CookieName, cookieValue);
        cookie.Save();
        
    };
    
    this.GetPageInfo = function()
    {
        var PageInfoCookie;
        var CookiesEnabled = AreCookiesEnabled();
        
   		var UserInfoCookie = GetCookie(this.UserInfoCookieName);
   		var UserID = "";
   		var UserUID = "";
   		
   		if(UserInfoCookie != null)
   		{
   		    if(UserInfoCookie.Values["ID"] != null && UserInfoCookie.Values["UID"] != null)
   		    {
   		        UserID = UserInfoCookie.Values["ID"];
   		        UserUID = UserInfoCookie.Values["UID"];
   		    }
   		}
        
        try
        {
			PageInfoCookie = GetCookie(this.CookieName);
		}
		catch(ex)
		{
			_ActiveAgent_HandleError(ex);
		}
		
        var now = new Date();
        var rtn = "<PageInfo CookiesEnabled=\"" + CookiesEnabled + "\" AS_ACNT_ID=\"" + decodeURIComponent(UserID) + "\" AS_ACNT_UID=\"" + decodeURIComponent(UserUID) + "\" ";
        
        if(PageInfoCookie != null)
		{
			this.URL = PageInfoCookie.Values[this.URLProperty];
			this.FormName = PageInfoCookie.Values[this.FormNameProperty];
			this.ViewID = PageInfoCookie.Values[this.ViewIDProperty];
			this.DateTime = PageInfoCookie.Values[this.DateTimeProperty];
	        
			// if the current date is within the polling interval + the grace period (2 sec), return the page info
			if (IsCookieValid())
			{
				rtn += "URL=\"" + decodeURIComponent(this.URL) + "\" FormName=\"" + decodeURIComponent(this.FormName) + "\" ViewID=\"" + decodeURIComponent(this.ViewID) + "\" ";
				//this.ThirdParty = 'false';
			}
			else // page info is expired - leave values blank
			{
				rtn += "URL=\"\" FormName=\"\" ViewID=\"\"";
				//this.ThirdParty = 'true';
			}
		}
		else // no page info cookie found - leave values blank
		{
		    rtn += "URL=\"\" FormName=\"\" ViewID=\"\"";
			//this.ThirdParty = 'true';
		}

		//rtn += " ThirdParty=\"" + this.ThirdParty + "\"" ;
		//rtn += " IP=\"" + IPCheck + "\" ";
		
		rtn += " />";
        return rtn;
    };
 
    this.SetPageError = function(errorCode)
    {
        var now = new Date();
        
        // build name/value pair to be saved to cookie
        var cookieValue = this.ErrorCodeProperty + "=" + errorCode + '&';
        cookieValue += this.DateTimeProperty + "=" +  now.getTime();
        
        // set and save the cookie value
        var cookie = new _ActiveAgent_Cookie(this.ErrorCookieName, cookieValue);
        cookie.Save();
    };
    
    this.GetPageError = function()
    {
        
        var errorCode = this.GetErrorCookieValue();
        
        if(errorCode != 0)
        {
            // raise the AppEvent for Agent to handle
            Agent.DoAppEvent("PageError");
        }
    };
    
    this.GetErrorCookieValue = function()
    {
		var PageErrorCookie;
		
		try
		{
			PageErrorCookie = GetCookie(this.ErrorCookieName);
			
		}
		catch(ex)
		{
			_ActiveAgent_HandleError(ex);
		}
		
		var now = new Date();
		var rtn = 0;
		
		if(PageErrorCookie != null)
		{
			var ErrorCode = PageErrorCookie.Values[this.ErrorCodeProperty];
			var ErrorDateTime = PageErrorCookie.Values[this.DateTimeProperty];
		    
			//Check if parent is still on alaskaair.com
			if (IsCookieValid())
			{
				rtn = ErrorCode;
			}
		}
	    
	    return rtn;
    };
  
}; 

// ActiveAgent cookie object
function _ActiveAgent_Cookie(name, sVals)    // creates a cookie
{
    var exp = new Date();
    exp.setDate(exp.getDate() + 1); // set to expire in 24 hrs
    
    this.Name = name;
    this.Value = null;
    this.Values = new Object();
    // These three are for saving cookies
    this.Expires = exp; // Leave null for session cookie (or if updating cookie)
    this.Path = '/';
    this.Secure = false;
    this.Domain = _ActiveAgent_GetDomain();
		
    if (sVals != null) // Parse specified value(s)
    {
        var nvc = (typeof(sVals) == "string")?sVals.split('&'):null; // Get the name-value collection from the cookie
        if (nvc != null && nvc.length > 0 && nvc[0].indexOf('=') > -1)
        {
	        for (var i=0; i<nvc.length; i++)
	        {
		        var nv = nvc[i].split('='); // Get the name and value of this entry
		        this.Values[nv[0]] = nv[1]; // Add property to our Values
	        }
        }
        else // Single value cookie
	        this.Value = sVals;
    }
	
    // Methods
    this.Save = function()
    {
        var v = '';
        for (var n in this.Values)
        {
	        v += '&'+n+'='+escape(this.Values[n]);
        }
        if (v == '') v = escape(this.Value);
        else v = v.substr(1);
		
        var me = this.Name+'='+v+
	        ( (this.Expires==null)?"":(";expires="+this.Expires.toGMTString()) )+
	        ";path="+this.Path+
	        ( (this.Domain==null)?"":(";domain="+this.Domain) )+
	        ( (this.Secure)?";secure;":";" );
        document.cookie = me;
    };
	
    this.Delete = function()
    {
        this.Expires = new Date( 1970, 0, 2 ); // "Fri, 02-Jan-1970 00:00:00 GMT" );
        this.Save();
    };
};


////////////////////////////////////////////////////////////////////////
//  Util functions
////////////////////////////////////////////////////////////////////////

// parse out the current domain info
function _ActiveAgent_GetDomain()
{
    var url = document.domain;	
    var end = "";
    var s = url.indexOf('.');
	
    if(url.indexOf('.') > -1)
    {
        end = url.substr(url.lastIndexOf('.'));
        url = url.substring(0,url.lastIndexOf('.'));
    }
    if(url.indexOf('.') > -1)
    {
        url = url.substr(url.lastIndexOf('.')+1);
    }
    url = url+end;
    /*if(url.indexOf('.') == -1)
    {
        url = null;
    }*/
    return url;	
};

function _ActiveAgent_GetPageURL(url)
{
    var rtnURL = "";
	if(url != undefined)
	{
	    rtnURL = url;
	}
	else
	{
	    rtnURL = document.URL;
	} 
	
	if(rtnURL.indexOf("?") > 0)
	{
		rtnURL = rtnURL.substring(0, rtnURL.indexOf("?"));
	}
	
	if(rtnURL.indexOf("#") > 0)
	{
		rtnURL = rtnURL.substring(0, rtnURL.indexOf("#"));
	}
	
    return rtnURL;
};

function _ActiveAgent_SetPageInfo(url, formName, viewID)
{
    if(url != undefined) { _AA_PageInfo.URL = url; }    
    if(formName != undefined) { _AA_PageInfo.FormName = formName; }
    if(viewID != undefined) { _AA_PageInfo.ViewID = viewID; }
    
    _AA_PageInfo.SetPageInfo();
};

//Check the name of the parent window, the name was assigned when the parent has launched the agent 
//agent has stored the name of the parent window into the cookie, clearing hte parent window name may give permission issues
function IsAgentAssociatedParentWindow()
{
	var returnValue = false;
   
	var windowName = window.name;
	var windowNameCookie = GetCookie(ParentWindowNameCookie);
	
	if(windowNameCookie != null)
	{	
		var expectedWindowName = windowNameCookie.Value;
		
		if(expectedWindowName == windowName)
		{
			returnValue = true;
		}
	}

    return returnValue;
}

// As long as the user is on www.alskaair.com, the cookie is valid
// and we are in same subdomain, if we can read the URL, the user is sure to be on www.alskaair.com
function IsCookieValid()
{
	var cookieIsValid = false;
	try 
	{
	    var win = PopupTemplate.ParentWindow;
	    
    	//If we can read the URL, they are still on www.alaskaair.com (agent is in same subdomain) so cookie is valid
		var url = win.document.location.href;
		
		if(url != '' && url != undefined)
		{
			cookieIsValid = true;
		}
	}
	catch(e) 
	{ 
		cookieIsValid = false; 
	}	
	
	return cookieIsValid;
};
