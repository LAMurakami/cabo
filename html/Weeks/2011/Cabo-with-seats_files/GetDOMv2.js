var isDHTML=0; var isID=0; var isAll=0; var isLayers=0; 
if(document.getElementById){ isID=1; isDHTML=1;}
else
{ if(document.all){ isAll=1; isDHTML=1;}
else
{ if((navigator.appName.indexOf('Netscape')!=-1)&&(parseInt(navigator.appVersion,10)==4)){ isLayers=1; isDHTML=1;}}}
function getElement(objectID, withStyle)
{ if(withStyle==1)
{ if(isID)
return (document.getElementById(objectID).style); else
{ if(isAll)
return (document.all[objectID].style); else
{ if(isLayers)
return (document.layers[objectID]);}
}}
else
{ if(isID)
return (document.getElementById(objectID)); else
{ if(isAll)
return (document.all[objectID]); else
{ if(isLayers)
return (document.layers[objectID]);}
}}}