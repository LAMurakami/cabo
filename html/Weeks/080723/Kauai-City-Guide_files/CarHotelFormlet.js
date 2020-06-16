function WWTE_init() { WWTE_showHideDisplay("divHotels")
}
function WWTE_showHideDisplay(id) { switch (id) { case "divHotels":
document.getElementById("divCars").style.display = "none"; document.getElementById("divHotels").style.display = "block"; break; case "divCars":
document.getElementById("divHotels").style.display = "none"; document.getElementById("divCars").style.display = "block"; break;}
document.frmState.currentSection.value = id;}
