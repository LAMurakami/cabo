function TrapKeyDown(btn, event, keyCode)
{ if(document.all)
{ if(event.keyCode == keyCode)
{ event.returnValue = false; event.cancel = true; btn.click();}
}
else if(document.getElementById || document.layers)
{ if(event.which == keyCode)
{ event.returnValue = false; event.cancel = true; btn.click();}
}
}
function TrapEnterKeyDown (e, target)
{ if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13))
{ __doPostBack(target, ''); return false;}
return true;}
