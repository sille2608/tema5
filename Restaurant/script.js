window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises!");

    // registrer klik på menu-knappen
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}

function toggleMenu() {
    console.log("Toggle menu");
    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        //menuen er nu skjult - ændre menuknappen til burgersymbol
        document.querySelector("#menuknap").textContent = "☰";
    } else {
        //menuen er vist - ændre til X
        document.querySelector("#menuknap").textContent = "X";
    }
}

