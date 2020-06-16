var intMaxElem = 0; var counter = 0; function changeElemMasterCount(objform){ if (counter==0){ setGlobalCounters(objform)
}
for (j=0; j < counter.length; j++) { counter[j] = counter[j]+1; }
}
function changeFormElement(objform, strelementMaster, strElementsToSet, counterLimit){ var aryelementNamesToSet = strElementsToSet.split("|"); var aryNbrOfFormElementsM1 = objform.elements.length - 1; var idxTemp = 0; var idxelementMaster = -1; var strchangedElement = "False"; var strelementNumberChanging = ""; if (counter==0){ setGlobalCounters(objform)
}
for (j=0; j < aryNbrOfFormElementsM1; j++) { if (objform.elements[j].name == strelementMaster) { idxelementMaster = j; break; }
}
if (idxelementMaster > -1) { for (i=0; i < aryelementNamesToSet.length; i++){ for (j=0; j < aryNbrOfFormElementsM1; j++) { if (objform.elements[j].name == aryelementNamesToSet[i]) { if (i > 0) { strelementNumberChanging = strelementNumberChanging + "|"; }
strelementNumberChanging = strelementNumberChanging + j; }
}
}
aryelementsToSet = strelementNumberChanging.split("|"); for (j=0; j < aryelementsToSet.length; j++){ idxTemp = aryelementsToSet[j]
if (idxTemp=="") { strchangedElement = "True"
}
else { if (counter[idxTemp]<counterLimit){ objform.elements[idxTemp].selectedIndex = objform.elements[idxelementMaster].selectedIndex; counter[idxTemp] = counter[idxTemp]+1; strchangedElement = "True"
}
else { break
}
}
}
}
if (strchangedElement=="True"){ counter[idxelementMaster] = counter[idxelementMaster]+counterLimit; }
}
function setGlobalCounters(objform){ intMaxElem = objform.length; counter = new Array(intMaxElem-1)
for (j=0; j < intMaxElem; j++) { counter[j] = 0
}
}
function showBox(){ var str = new Array(0)
str[i] = "\n Form idx "+i+" : "
for (j=0; j < intMaxElem; j++) { str[i] += counter[j]
}
var strText = str.join("."); alert("Each digit is an element index within the form.\n" + strText)
}
