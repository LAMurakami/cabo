 
function initializeDocument() 
{ 
  if (doc.all) 
    browserVersion = 1 //IE   
  else
    browserVersion = 2 //other browsers
} 

 function swapImgRestore() { //v2.0
  if (document.swapImgData != null)
    for (var i=0; i<(document.swapImgData.length-1); i+=2)
      document.swapImgData[i].src = document.swapImgData[i+1];
}

function preloadImages() { //v2.0
  if (document.images) {
    var imgFiles = preloadImages.arguments;
    if (document.preloadArray==null) document.preloadArray = new Array();
    var i = document.preloadArray.length;
    with (document) for (var j=0; j<imgFiles.length; j++) if (imgFiles[j].charAt(0)!="#"){
      preloadArray[i] = new Image;
      preloadArray[i++].src = imgFiles[j];
  } }
}

function swapImage() { //v2.0
  var i,j=0,objStr,obj,swapArray=new Array,oldArray=document.swapImgData;
  for (i=0; i < (swapImage.arguments.length-2); i+=3) {
    objStr = swapImage.arguments[(navigator.appName == 'Netscape')?i:i+1];
    if ((objStr.indexOf('document.layers[')==0 && document.layers==null) ||
        (objStr.indexOf('document.all[')   ==0 && document.all   ==null))
      objStr = 'document'+objStr.substring(objStr.lastIndexOf('.'),objStr.length);
    obj = eval(objStr);
    if (obj != null) {
      swapArray[j++] = obj;
      swapArray[j++] = (oldArray==null || oldArray[j-1]!=obj)?obj.src:oldArray[j];
      obj.src = swapImage.arguments[i+2];
  } }
  document.swapImgData = swapArray; //used for restore
}

function setSelectedTD(obj) {
	var tmp = eval("document.all." + obj);
	tmp.bgColor = "#000000";
}

function setUnselectedTD(obj) {
	var tmp = eval("document.all." + obj);
	tmp.bgColor = "#00A0C6";
}