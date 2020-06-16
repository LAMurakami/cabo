function openWindow(strUrl, strName, intHeight, intWidth, blnResizeable, blnScrollBars)
{ var winNewPopUp
if (!winNewPopUp)
{ winNewPopUp = window.open(strUrl,strName,"dependent=yes,directories=no,height=" + intHeight + ",width=" + intWidth + ",location=no,menubar=no,resizable=" + blnResizeable + ",scrollbars=" + blnScrollBars + ",titlebar=no,toolbar=no"); winNewPopUp.focus(); }
}
function openWin(strURL,strWindowname,intWidth,intHeight,intLeft,intTop)
{ strWindowOptions = "left=" + intLeft + ",top=" + intTop + ",width=" + intWidth + ",height=" + intHeight + ",name=" + strWindowname + ",status=no,scrollbars=yes,resize=no,toolbar=no,menubar=no"
winNew = window.open(strURL,strWindowname,strWindowOptions); winNew.focus()
}
