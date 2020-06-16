/******************************************************************************
 [Alaska_ActiveAgent.js]
 
 Copyright (C) 2007 Next IT Corporation, Inc. Spokane, WA. All Rights Reserved. 
 This document is confidential work and intellectual property of Next IT 
 Corporation. Permission to copy, distribute or use any portion of this file 
 is prohibited without the express written consent of Next IT Corporation.

 Version Date        Name        Changes in:  BasePage     Agent
 ----------------------------------------------------------------------------
 0.9.6   07/25/2007  smccabe                  YES          NO (no longer needed)
     trimmed file down to just what is needed by client
 0.9.7   08/20/2007  smccabe                  YES
     Fixed issue when setting negative error codes
 0.9.8   08/23/2007  smccabe                  NO
     Added agent launch script for use by alaskaair.com
     
*******************************************************************************/
var IPCheck = "";

function ActiveAgent_LaunchJenn(question)
{
	var x = 880;
    var y = 50;
    var height = 680;
    var width = 250;
    var parentHeight = 734;
    var parentWidth = 880;
	var ActiveAgent_PageName = 'http://activeagent.alaskaair.com/alaskawebui/Agent.aspx';

    var agentAlign = 'Right';
    
    if(question=='Save yourself a call and type your question here.')
    {
        question = null;
    }
    
    if (question && question.length > 0)
    {
        ActiveAgent_PageName = ActiveAgent_PageName + '?q=' + question;
    }
	 
	if ( parentWidth + parseInt(width) > screen.availWidth) // If not enough space, align on the right screen edge
	{
		x = screen.availWidth - width;
	}
	else // Align to the right of the parent window
	{
		x = parentWidth;
	}   
	var ActiveAgent_AgentWindow = window.open(ActiveAgent_PageName, 'agent', 'width='+width+'px,height='+height+'px,left='+x+',top='+y+',scrollbars=no,menubar=no,resizable=yes,location=no,status=yes,titlebar=no,toolbar=no');
	
	/*if( ActiveAgent_AgentWindow.location.href == 'about:blank' )
	{
		window.open(ActiveAgent_PageName, 'agent', 'width='+width+'px,height='+height+'px,left='+x+',top='+y+',scrollbars=no,menubar=no,resizable=yes,location=no,status=yes,titlebar=no,toolbar=no');
	}*/
	
	LayoutParent(parentWidth, parentHeight, width, agentAlign);
	
	ActiveAgent_AgentWindow.focus();
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
function ActiveAgent_SetPageInfo(FormName, ViewID)
{
    var URL = _ActiveAgent_GetPageURL();
    
    _ActiveAgent_SetPageInfo(URL, FormName, ViewID)
};

function ActiveAgent_SetPageInfoAndURL(URL, FormName, ViewID)
{
    _ActiveAgent_SetPageInfo(_ActiveAgent_GetPageURL(URL), FormName, ViewID)
};

////////////////////////////////////////////////////////////////////////////////
// Function:    ActiveAgent_SetPageError
// Description:
//      Call this function when an error occurs in the page and Jenn will 
//      pick up the error and offer assistance (if she's open).
//      
////////////////////////////////////////////////////////////////////////////////
function ActiveAgent_SetPageError(ErrorCode)
{
    if(!isNaN(ErrorCode) && ErrorCode != 0)
    {
        _AA_PageInfo.SetPageError(ErrorCode);
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
    userInput.Args['CurrentPage'] = pageInfo;
};

///////////////////////////////////////////////////////////////////////////////
//  Object: ActiveAgnet_PageInfo
//  Desc:   Object used to set/get page/error info.  _ActiveAgent_Cookie 
//          object is used for the actual message transfer.
//
///////////////////////////////////////////////////////////////////////////////

ActiveAgent_PageInfo.prototype.PollingInterval = 1000; //ms
ActiveAgent_PageInfo.prototype.GracePeriod = 2000; //ms
ActiveAgent_PageInfo.prototype.CookieName = 'ActiveAgent_PageInfo';
ActiveAgent_PageInfo.prototype.ErrorCookieName = 'ActiveAgent_PageError';
ActiveAgent_PageInfo.prototype.URLProperty = 'URL';
ActiveAgent_PageInfo.prototype.FormNameProperty = 'FormName';
ActiveAgent_PageInfo.prototype.ViewIDProperty = 'ViewID';
ActiveAgent_PageInfo.prototype.ErrorCodeProperty = 'ErrorCode';
ActiveAgent_PageInfo.prototype.DateTimeProperty = 'DateTime';
//ActiveAgent_PageInfo.prototype.ThirdPartyProperty = 'ThirdParty';

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
        var cookieValue = this.URLProperty + "=" + this.URL + '&';
        cookieValue += this.FormNameProperty + "=" +  this.FormName + '&';
        cookieValue += this.ViewIDProperty + "=" +  this.ViewID + '&';
        cookieValue += this.DateTimeProperty + "=" +  now.getTime();
        
        // set and save the cookie value
        var cookie = new _ActiveAgent_Cookie(this.CookieName, cookieValue);
        cookie.Save();
        
    };
    
    this.GetPageInfo = function()
    {
        var PageInfoCookie;
        var CookiesEnabled = AreCookiesEnabled();
        
   		var UserInfoCookie = GetCookie('AS%5FACNT');
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
        var rtn = "<PageInfo CookiesEnabled=\"" + CookiesEnabled + "\" AS_ACNT_ID=\"" + UserID + "\" AS_ACNT_UID=\"" + UserUID + "\" ";
        
        if(PageInfoCookie != null)
		{
			this.URL = PageInfoCookie.Values[this.URLProperty];
			this.FormName = PageInfoCookie.Values[this.FormNameProperty];
			this.ViewID = PageInfoCookie.Values[this.ViewIDProperty];
			this.DateTime = PageInfoCookie.Values[this.DateTimeProperty];
	        
			// if the current date is within the polling interval + the grace period (2 sec), return the page info
			if ((now.getTime() - this.DateTime) < (this.PollingInterval + this.GracePeriod))
			{
				rtn += "URL=\"" + this.URL + "\" FormName=\"" + this.FormName + "\" ViewID=\"" + this.ViewID + "\" ";
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
		rtn += " IP=\"" + IPCheck + "\" ";
		
		rtn += " />";
        return rtn;
    };
 
    this.SetPageError = function(ErrorCode)
    {
        var now = new Date();
        
        // build name/value pair to be saved to cookie
        var cookieValue = this.ErrorCodeProperty + "=" + ErrorCode + '&';
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
            // clear out the error code so it doesn't get handled more than once
            this.SetPageError(0);
            
            // raise the AppEvent for Agent to handle
            Agent.DoAppEvent("PageError", errorCode);
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
		    
			// if now is between the error datetime and the error datetime + polling interval + 2 seconds,
			// return the error code.  else return null.
			if ((now.getTime() - ErrorDateTime) < (this.PollingInterval + this.GracePeriod))
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

function _ActiveAgent_GetPageURL(URL)
{
    var rtnURL = "";
	if(URL != undefined)
	{
	    rtnURL = URL;
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

function _ActiveAgent_SetPageInfo(URL, FormName, ViewID)
{
    if(URL != undefined) { _AA_PageInfo.URL = URL; }    
    if(FormName != undefined) { _AA_PageInfo.FormName = FormName; }
    if(ViewID != undefined) { _AA_PageInfo.ViewID = ViewID; }
    
    // if the page isn't already timing, kick off recurring call to SetPageInfo();
    if(_AA_PageInfo.SetInfoTimerID == 0)
    {
        _AA_PageInfo.SetInfoTimerID = setInterval('_AA_PageInfo.SetPageInfo()', _AA_PageInfo.PollingInterval);
    }
};

// if an exception is thrown, decide whether or not to alert it
function _ActiveAgent_HandleError(ex)
{
	var _debugMode = false;

	//if (_debugMode)
	//{
		//alert(ex.description);
	//}
};

function LayoutParent(agentParentWidth, agentParentHeight, agentWidth, agentAlign)
{
	var win = window;
	/*var offset = (window.outerWidth)?window.outerWidth:document.body.clientWidth+12; // guesstimate for IE
	var w=screen.availWidth-offset;
	var h=screen.availHeight;*/
	var w;
	var h;
	
	// set parent width
	if (agentParentWidth > 0 && agentParentWidth < screen.availWidth)
	{		
		w = agentParentWidth;
	}
	else
	{
		w = screen.availWidth-agentWidth;
	}
	
	// set parent height
	if (agentParentHeight > 0)
	{
		h = agentParentHeight;
		if (h > screen.availHeight)
		{
			h = screen.availHeight;
		}
	}
	else
	{
		h = screen.availHeight;
	}
	
	
	var left;
	if (agentAlign == 'Right') // Leave space on left or right side?
	{
		left = 0;
	}
	else
	{
		// figure agent window overlap if there's not enough width for both
		if (agentWidth + parseInt(w) > screen.availWidth)
		{
			left = screen.availWidth - w;
		}
		else
		{
			left = agentWidth;
		}
	}
	try
	{
		win.moveTo(0,0); // This helps it work better when it's maximized... (IE seems to get confused sometimes)
		win.resizeTo(w,h);
		win.moveTo(left, 0);

	}
	catch(e) // Permission denied? Happens if we change out of our domain, we should make sure it doesn't happen in any other situation, or comment out throw below
	{
		//if (e.message.indexOf('denied') == -1) // if not permission denied, throw the error
		if ( e.message )
		{
			if(e.message.indexOf('denied') == -1)
			{
				throw e;
			}
		}
		else
		{
			if( e.toString().indexOf('denied') == -1 )
			{
				throw e;
			}
		}
	}
};
