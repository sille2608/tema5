//document.addEventListener("DOMContentLoaded", sidenVises);
//
//function sidenVises() {
//    console.log("siden vises!");
//
//    // registrer klik på menu-knappen
//    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
//}
//
//function toggleMenu() {
//    console.log("Toggle menu");
//    document.querySelector("#menu").classList.toggle("hidden");
//
//    let erSkjult = document.querySelector("#menu").classList.contains("hidden");
//
//    if (erSkjult == true) {
//        //menuen er nu skjult - ændre menuknappen til burgersymbol
//        document.querySelector("#menuknap").textContent = "☰";
//    } else {
//        //menuen er vist - ændre til X
//        document.querySelector("#menuknap").textContent = "X";
//    }
//}



document.addEventListener("DOMContentLoaded", start);

        let retter = [];
        let filter = "alle";


        async function start() {
            const myJson = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1Ce0MpS3pQLkFQKkJDRYkRL_1Zj4MiNf0M70b0WyJ6Nc");
            retter = await myJson.json();

            retter.sort((a, b) => {
                return a.navn.localeCompare(b.navn);
            });

            visRetter();

        }


        function visRetter() {
            let dest = document.querySelector("#liste");

            //Laver en tom destination
            dest.innerHTML = "";
            retter.forEach(ret => {

                if (filter == "alle" || filter == ret.kategori) {
                    //vi laver en template fordi vi gerne vil have at funktionen visSingle skal kunne fungere uden for funktionen visRetter. For at DEN funktion skal kunne hente dette data laver man det til en template
                    let template = `
                        <article class="minret">
                            <h2>${ret.navn}</h2>
                            <img src=img/${ret.billede}.jpg alt=${ret.navn}>
                            <p>${ret.kort}</p>
                            <p>Pris: ${ret.pris},-</p>

                        </article>`;

                    dest.insertAdjacentHTML("beforeend", template);

                    //vi bruger lastElementChild hvor man offivcielt siger at man tager fat på den "sidste del af listen". Det er fordi vi er i en Loop og der bliver der læst 1 ad gangen. Man bliver derfor nød til at tage fat på den sidste i loopen for at få den til at gå rundt. Man kan få dat på alle.
                    dest.lastElementChild.addEventListener("click", () => {
                        visSingle(ret);
                    });
                }

            });

            //For hver knap man trykker på i menuen som har classen filter der skal der sendes videre til funktionen filtrering
            document.querySelectorAll(".filter").forEach(elm => {
                elm.addEventListener("click", filtrering);
            });


        }

        //funktion der får retterne til at blive filreret efter kategori
        function filtrering() {
            document.querySelectorAll(".filter").forEach(elm => {
                elm.classList.remove("valgt");
            });
            this.classList.add("valgt");

            //overskriften på siden siden til ændre sig alt efter den valgte/this filter knap
            document.querySelector("h1").textContent = this.textContent;

            filter = this.getAttribute("data-ret");
            visRetter();

        }


        function visSingle(ret) {
            document.querySelector("#indhold").innerHTML = `
                    <article class="minret">
                        <h2>${ret.navn}</h2>
                        <img src=img/${ret.billede}.jpg alt=${ret.navn}>
                        <p>${ret.lang}</p>
                        <p>Pris: ${ret.pris},-</p>
                    </article>`;

            document.querySelector("#popup").style.display = "block";
            document.querySelector("#popup #luk").addEventListener("click", close);
        }

        //at pop up viduet kan lukke
        function close() {
            document.querySelector("#popup").style.display = "none";
        }


