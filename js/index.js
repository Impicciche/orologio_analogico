/** Definire le costanti per lo spostamento in radianti delle lancette */
const angolo_secondi = 6;
const angolo_minuti = angolo_secondi;
const angolo_ore = 30;

/**recuperare le lancette per il trattamento */

const lancetta_secondi = document.querySelector('.secondi .lancetta_interna');
const lancetta_minuti = document.querySelector('.minuti .lancetta_interna');
const lancetta_ore = document.querySelector('.ore .lancetta_interna');

/**definizione dell'evento per il conseguente spostamento dei minuti e delle ore */


const sposta_lancetta_ore = new CustomEvent("sposta_lancetta", {detail: {
    angolo: angolo_ore,
    evento_lancetta_successiva: null
}});


const sposta_lancetta_min = new CustomEvent("sposta_lancetta", {detail: {
    angolo: angolo_minuti,
    evento_lancetta_successiva: sposta_lancetta_ore
}});

const sposta_lancetta_sec = new CustomEvent("sposta_lancetta", {detail: {
    angolo: angolo_secondi,
    evento_lancetta_successiva: sposta_lancetta_min
}});


/**Inizializa ora attuale */

inizializaOra();


/**Timer per lo spostamento dei secondi */

setInterval(() => lancetta_secondi.dispatchEvent(sposta_lancetta_sec),1000);

/**applicazione di un eventListener per ciascuna lancetta sull'evento spostaLancetta */
lancetta_secondi.addEventListener("sposta_lancetta", (e) => spostaLancetta(e,lancetta_minuti));
lancetta_minuti.addEventListener("sposta_lancetta", (e) => spostaLancetta(e,lancetta_ore));
lancetta_ore.addEventListener("sposta_lancetta", (e) => spostaLancetta(e, null));


/**definizione della funzione per lo spostamento delle lancette */
function spostaLancetta(evento, lancetta_successiva) {
    let angolo_corrente = Number(evento.target.style.transform.match(/\d+/)[0]);
    angolo_corrente += evento.detail.angolo;

    if(angolo_corrente == 360){
        angolo_corrente = 0;
        if(evento.detail.evento_lancetta_successiva && lancetta_successiva){
            lancetta_successiva.dispatchEvent(evento.detail.evento_lancetta_successiva);
        }
    }

    evento.target.style.transform = `rotate(${angolo_corrente}deg)`;

}

function inizializaOra(){
    const tempo_attuale = new Date();

    const secondi_attuali = tempo_attuale.getSeconds();
    const minuti_attuali = tempo_attuale.getMinutes();
    const ore_attuali = tempo_attuale.getHours() % 12;

    lancetta_secondi.style.transform = `rotate(${secondi_attuali * angolo_secondi}deg)`;
    lancetta_minuti.style.transform = `rotate(${minuti_attuali * angolo_minuti}deg)`;
    lancetta_ore.style.transform = `rotate(${ore_attuali * angolo_ore}deg)`;
}