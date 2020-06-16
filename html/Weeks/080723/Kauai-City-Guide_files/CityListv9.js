var g_cityListPopupWindow; function BrowserCheck()
{ var strAppName = navigator.appName; var strUserAgent = navigator.userAgent; if (strAppName=="Netscape") { this.b = "ns";} else { if (strAppName=="Microsoft Internet Explorer") { this.b = "ie";} else { this.b = strAppName;}
}
this.v = parseInt(navigator.appVersion,10); this.ns = (this.b=="ns" && this.v>=4); this.ns4 = (this.b=="ns" && this.v==4); this.ns5 = (this.b=="ns" && this.v==5); this.ie = (this.b=="ie" && this.v>=4); this.ie4 = (strUserAgent.indexOf("MSIE 4")>0); this.ie5 = (strUserAgent.indexOf("MSIE 5")>0); this.ie55 = (strUserAgent.indexOf("MSIE 5.5")>0); this.ie6 = (strUserAgent.indexOf("MSIE 6.0")>0); this.v = parseFloat(navigator.appVersion); if (this.ie5) { this.v = 5;}
if (this.ie55) { this.v = 5.5; this.ie5 = false;}
if (this.ie6) { this.v = 6;}
this.min = (this.ie55||this.ie6);}
is = new BrowserCheck(); function OpenWin(srtURL,strName,bolHistory,width,height,left,top,menubar,toolbar,location,directories,status,scrollbars,resizable,other)
{ var str = null; var intArgL = arguments.length; this.winURL = srtURL; this.winName = strName; this.bwHistory = bolHistory; if (is.ie) { width = width - 10;}
if ((is.ie)&&(menubar==0)&&(toolbar==0)&&(location==0)&&(directories==0)&&(status==0)) { height = height - 29;}
if ((is.ie)&&(menubar==1)&&(toolbar==0)&&(location==0)&&(directories==0)&&(status==0)) { height = height - 77;}
if ((is.ie)&&(menubar==0)&&((toolbar==1)||(location==1)||(directories==1))&&(status==0)) { height = height - 58;}
if ((is.ie)&&(menubar==0)&&(toolbar==0)&&(location==0)&&(directories==0)&&(status==1)) { height = height - 49;}
if (is.ns4) { width = width - 12;}
if ((is.ns4)&&(menubar==0)&&(toolbar==0)&&(location==0)&&(directories==0)&&(status==0)) { height = height - 31;}
if ((is.ns4)&&(menubar==1)&&(toolbar==1)&&(location==1)&&(directories==1)&&(status==1)) { height = height - 158;}
if ((is.ns4)&&(menubar==1)&&(toolbar==0)&&(location==0)&&(directories==0)&&(status==0)) { height = height - 50;}
if ((is.ns4)&&(menubar==0)&&(toolbar==1)&&(location==0)&&(directories==0)&&(status==0)) { height = height - 75;}
if ((is.ns4)&&(menubar==0)&&(toolbar==0)&&(location==1)&&(directories==0)&&(status==0)) { height = height - 55;}
if ((is.ns4)&&(menubar==0)&&(toolbar==0)&&(location==0)&&(directories==1)&&(status==0)) { height = height - 55;}
if ((is.ns4)&&(menubar==0)&&(toolbar==0)&&(location==0)&&(directories==0)&&(status==1)) { height = height - 49;}
if (is.ns5) { width = width - 6;}
if ((is.ns5)&&(menubar==0)&&(toolbar==0)&&(location==0)&&(directories==0)&&(status==0)) { height = height - 25;}
if ((is.ns5)&&(menubar==1)&&(toolbar==1)&&(location==1)&&(directories==1)&&(status==1))
{ width = width - 2; height = height - 142;}
if ((is.ns5)&&(menubar==1)&&(toolbar==0)&&(location==0)&&(directories==0)&&(status==0)) { height = height - 47;}
if ((is.ns5)&&(menubar==0)&&(toolbar==1)&&(location==0)&&(directories==0)&&(status==0)) { height = height - 68;}
if ((is.ns5)&&(location==1)) { toolbar=1;}
if ((is.ns5)&&(menubar==0)&&(toolbar==1)&&(location==1)&&(directories==0)&&(status==0)) { height = height - 68;}
if ((is.ns5)&&(menubar==0)&&(toolbar==0)&&(location==0)&&(directories==1)&&(status==0)) { height = height - 44;}
if ((is.ns5)&&(menubar==0)&&(toolbar==0)&&(location==0)&&(directories==0)&&(status==1)) { height = height - 56;}
if (((is.ie)||(is.ns5))&&(menubar==0)&&(toolbar==0)&&(location==0)&&(directories==0)&&(status==0)&&(resizable==1))
{ width = width - 2; height = height - 2;}
if (intArgL>=4 && width!=null) { str = 'width='+width;}
if (intArgL>=5 && height!=null) { str += ',height='+height;}
if ((is.ns)&&(intArgL>=6 && left!=null)) { str += ',screenX='+left;}
if ((is.ie)&&(intArgL>=6 && left!=null)) { str += ',left='+left;}
if ((is.ns)&&(intArgL>=7 && top!=null)) { str += ',screenY='+top;}
if ((is.ie)&&(intArgL>=7 && top!=null)) { str += ',top='+top;}
if (intArgL>=8 && menubar!=null) { str += ',menubar='+menubar;}
if (intArgL>=9 && toolbar!=null) { str += ',toolbar='+toolbar;}
if (intArgL>=10 && location!=null) { str += ',location='+location;}
if (intArgL>=11 && directories!=null) { str += ',directories='+directories;}
if (intArgL>=12 && status!=null) { str += ',status='+status;}
if (intArgL>=13 && scrollbars!=null) { str += ',scrollbars='+scrollbars;}
if (intArgL>=14 && resizable!=null) { str += ',resizable='+resizable;}
if (intArgL==15 && other!=null) { str += ','+other;}
this.winFeatures = str; if (is.ns) { g_cityListPopupWindow = window.open(this.winURL,this.winName,this.winFeatures);}
if (is.ie) { g_cityListPopupWindow = window.open(this.winURL,this.winName,this.winFeatures,this.bwHistory);}
}
function Init()
{ if(!is.ns4) { document.forms['frmFltFares'].elements['JSID'].value = "YES";}
}
function updateORI(obj)
{ var fName = obj.form.name; var eName = obj.name; var eValue = obj.value; document.forms[fName].elements['ORIGIN'].value = eValue;}
function updateDES(obj)
{ var fName = obj.form.name; var eName = obj.name; var eValue = obj.value; document.forms[fName].elements['DEST'].value = eValue;}
function updateECERT(obj)
{ var fName = obj.form.name; var eName = obj.name; var eValue = obj.value; document.forms[fName].elements[eName].value = eValue;}
function gotodep(obj)
{ var fName = obj.form.name; var eName = obj.name; var eValue = obj.value; document.forms[fName].elements['ORIGIN'].value = eValue; document.forms[fName].elements['ORIGIN_DIS'].value = document.forms['frmFltFares'].elements['oOriginDic'].options[document.forms['frmFltFares'].elements['oOriginDic'].selectedIndex].text; document.forms[fName].elements['ORIGIN_DIS'].focus;}
function gotodes(obj)
{ var fName = obj.form.name; var eName = obj.name; var eValue = obj.value; document.forms[fName].elements['DEST'].value = eValue; document.forms[fName].elements['DEST_DIS'].value = document.forms['frmFltFares'].elements['oDestDic'].options[document.forms['frmFltFares'].elements['oDestDic'].selectedIndex].text; document.forms[fName].elements['DEST_DIS'].focus;}
function SetCity(field,cityCode,city)
{ if(document.forms['shopping'] != null)
{ document.forms['shopping'].elements[field + '__cityCode'].value = cityCode; document.forms['shopping'].elements[field + '__cityName'].value = city;}
else if(document.forms['reissues'] != null){ document.forms['reissues'].elements[field + '__cityCode'].value = cityCode; document.forms['reissues'].elements[field + '__cityName'].value = city;}
}
function SetFrom(a,b)
{ var cases = new Array (new Array ('shopping', 'UCAir1__UCOrigin_CityCode', 'UCAir1__UCOrigin_City'),
new Array ('frmFltFares', 'ORIGIN', 'ORIGIN_DISID'),
new Array ('frmFltFares', 'ORIGIN', 'ORIGIN_DIS'),
new Array ('home', 'UCAir1_UCOrigin__cityCode', 'UCAir1_UCOrigin__city') );
SetElementPairFromArray(cases, a, b);
}
function SetTo(a,b)
{ var cases = new Array (new Array ('shopping', 'UCAir1__UCDestination_CityCode', 'UCAir1__UCDestination_City'),
new Array ('frmFltFares', 'DEST', 'DEST_DISID'),
new Array ('frmFltFares', 'DEST', 'DEST_DIS'),
new Array ('home', 'UCAir1_UCDestination__cityCode', 'UCAir1_UCDestination__city') );
SetElementPairFromArray(cases, a, b);
}
// cases is a multi-dimensional array (an Array of Arrays).  
//  The innermost Array structure is:
//   [0]FormName, 
//	 [1]Form element that will take valueToSet1, 
//   [2]Form element that will take valueToSet2
function SetElementPairFromArray(cases, valueToSet1, valueToSet2)
{ for (var i = 0; i < cases.length; ++i) { if (SetElementPair(cases[i][0], cases[i][1], valueToSet1, cases[i][2], valueToSet2) == true)
{ break; } 
}
}
function SetElementPair(formName, elementName1, valueToSet1, elementName2, valueToSet2)
{ var form;
// Make sure the form and the elements exist.
if (document.forms[formName] != null) {	form = document.forms[formName];
if (form.elements[elementName1] != null && form.elements[elementName2] != null) {
// Found.  Change values and return true.
form.elements[elementName1].value = valueToSet1; form.elements[elementName2].value = valueToSet2; return true;
}
}
return false; // Not found.
}
function BlankSelect(obj)
{ var fName = obj.form.name; var eName = obj.name; var eValue = obj.value; if((eValue == 'Where from?')||(eValue == 'Where to?')||(eValue == 'Optional'))
{ document.forms[fName].elements[eName].value = '';} else { obj.select();}
}
function CheckDCAWAS(obj)
{ var sFormName = obj.form.name; var sFromValue = document.forms[sFormName].elements['ORIGIN_DIS'].value.toUpperCase(); var sToValue = document.forms[sFormName].elements['DEST_DIS'].value.toUpperCase(); var sClassValue = document.forms[sFormName].elements['CLASS'].value.toUpperCase(); var bShowAlert = false; if (((sClassValue == 'GOLDUPG')||(sClassValue == 'MVPUPG')) && ((sFromValue == 'DCA')||(sFromValue.substring(0,3)== 'WAS')||(sToValue == 'DCA')||(sToValue.substring(0,3)== 'WAS')))
{ alert('Upgrade shopping is temporarily unavailable to or from Reagan Washington National Airport.\r\rEnter "IAD" for upgrade shopping to or from Washington Dulles International Airport.'); bShowAlert = true;}
return !bShowAlert
}
function ResetMe(obj)
{ var fName = obj.form.name; var eName = obj.name; var eValue = obj.value; if((eValue == '')&&(eName == 'ORIGIN_DIS'))
{ document.forms[fName].elements[eName].value = 'Where from?';} else { if((eValue == '')&&(eName == 'DEST_DIS'))
{ document.forms[fName].elements[eName].value = 'Where to?';} else { if((eValue == '')&&(eName.toLowerCase().indexOf('ecert') >= 0))
{ document.forms[fName].elements[eName].value = 'Optional';}
}
}
}
function CityListWin(){ }; 