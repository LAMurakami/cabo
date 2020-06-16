var sLastNavSrc = ''; var secs; var timerID = null; var timerRunning = false; var delay = 300; var goElement; var IsOpen = false; function expander(oElement)
{ var sDisplay = oElement.style.display
if(sDisplay=='none')
{ oElement.style.display='block';}
else
{ oElement.style.display='none';}
}
function show(oElement)
{ var oImage = oElement.firstChild.firstChild; sLastNavSrc = oImage.src; sHighlight = sLastNavSrc.substring(0,(sLastNavSrc.indexOf('.gif')-1)); oImage.src = sHighlight + 'h.gif'; if(IsOpen)
{ showDropDown(oElement);}
else
{ goElement = oElement; InitDelay();}
}
function InitDelay()
{ secs = 1; ResetDelay(); StartDelay();}
function ResetDelay()
{ if(timerRunning)
{ clearTimeout(timerID);}
timerRunning = false;}
function StartDelay()
{ if (secs==0)
{ ResetDelay(); IsOpen = true; showDropDown(goElement);}
else
{ secs--; timerRunning = true; timerID = self.setTimeout("StartDelay()", delay);}
}
function showDropDown(oElement)
{ if(navigator.userAgent.indexOf('MSIE')>0 && navigator.userAgent.indexOf('Macintosh')<0 && navigator.userAgent.indexOf('Opera')<0)
{ var oIframe = document.getElementById('ifrm_Overlay'); oIframe.style.width = oElement.lastChild.offsetWidth; oIframe.style.height = oElement.lastChild.offsetHeight; oIframe.style.top = oElement.lastChild.offsetTop; oIframe.style.left = oElement.lastChild.offsetLeft; oIframe.style.display = "block"; oIframe.style.backgroundColor = "black"; oIframe.style.zIndex = oElement.style.zIndex - 1;}
if(navigator.userAgent.indexOf('Safari')<0 && navigator.userAgent.indexOf('Opera')<0)
{ oElement.className='highlight';}
}
function hide(oElement)
{ ResetDelay(); var oImage = oElement.firstChild.firstChild; oImage.src = sLastNavSrc; if(navigator.userAgent.indexOf('MSIE')>0 && navigator.userAgent.indexOf('Macintosh')<0 && navigator.userAgent.indexOf('Opera')<0)
{ var oIframe = document.getElementById('ifrm_Overlay'); oIframe.style.display="none";}
if(navigator.userAgent.indexOf('Safari')<0 && navigator.userAgent.indexOf('Opera')<0)
{ oElement.className='';}
}
