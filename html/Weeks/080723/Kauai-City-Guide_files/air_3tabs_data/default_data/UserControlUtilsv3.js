function syncControl(control, syncControlID)
{ 
	syncControlID = syncControlID.replace(':','_'); 
	var controlValue; 
	controlValue = control.value.replace('\'', '\\\''); 
	if(eval('window.document.' + document.forms[0].name + '.' + syncControlID.substring(0,syncControlID.lastIndexOf('_')) + '_suppressSync.value') == 'false')
	{ 
		if(control.type == 'text')
			{ 
				var strEval = 'window.document.' + document.forms[0].name + '.' + syncControlID + '.value = \'' + controlValue + '\';'; 
				eval(strEval); 
				strEval = 'window.document.' + document.forms[0].name + '.' + syncControlID + '.onchange();'; 
				eval(strEval);
			}
		if(control.type == 'select-one')
			{ 
				var strEval = 'window.document.' + document.forms[0].name + '.' + syncControlID + '.selectedIndex = ' + control.selectedIndex + ';'; 
				eval(strEval);
		}
	}
}
function suppressSync(controlID)
{ 
	var strEval = 'window.document.' + document.forms[0].name + '.' + controlID + '.value = true;'; 
	eval(strEval);
}
function multipleStationSelect(control, controlToChangeID)
{ 
	var controlText; 
	var controlValue; 
	
	controlText = control.options[control.selectedIndex].text.replace('\'', '\\\''); 
	controlValue = control.options[control.selectedIndex].value.replace('\'', '\\\''); 
	
	var strEval = 'window.document.' + control.form.id + '.' + controlToChangeID + '.value = \'' + controlText + '\';'; 	
	eval(strEval); 
	
	strEval = 'window.document.' + control.form.id + '.' + controlToChangeID + '.onchange();'; 
	eval(strEval); 
	
	strEval = 'window.document.' + control.form.id + '.' + controlToChangeID.replace('_cityName', '_cityCode') + '.value = \'' + controlValue + '\';'; 
	eval(strEval); 
	
	strEval = 'window.document.' + control.form.id + '.' + controlToChangeID.replace('_cityName', '_cityCode') + '.onchange();'; 
	eval(strEval);
}
