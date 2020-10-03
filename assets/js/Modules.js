/**
 * recuper un tableau de notes et additionner les notes 
 * a l'interieure de ce tableau
 *  
 * EXEMPLE : 
  ```javascript
   const totale = additionNotes([10,11,12])
   console.log(totale)
     ```
  -----------------
  -> 33
 * 
 * @param {Array<Number>} notes 
 */
export const additionNotes = (notes) => notes.reduce((acc, cum) => acc + cum)



//ajouter des etablissements
let liste_etablissements = []
async function ajouter_etabliassement(nom) {
    try {
        liste_etablissements = JSON.parse(localStorage.getItem('liste_etab'))
        if (nom != "") {
            await liste_etablissements.push(nom)
            await localStorage.setItem("liste_etab", JSON.stringify(liste_etablissements))
        } else {
            console.error('champe vide a niveau de l\'ajoute d\'etablimmement')
        }
    } catch (e) {
        console.error('une erreure au niveau de l\'ajoute des etablissement', e)
    }
}

ajouter_etabliassement('lkjhg')


//ajouter des classes
let liste_classes = []
async function ajouter_classe(nom) {
    try {
        liste_classe = JSON.parse(localStorage.getItem('liste_classes'))
        if (nom != "") {
            await liste_classe.push(nom)
            await localStorage.setItem("liste_classes", JSON.stringify(liste_classe))
        } else {
            console.error('champe vide a niveau de l\'ajoute de classes')
        }
    } catch (e) {
        console.error('une erreure au niveau de l\'ajoute des classe', e)
    }
}





document.querySelector('.ajouter_etabl_btn').addEventListener('click', () => {
    const aficher_liste_etablissements = document.querySelector('.aficher_liste_etablissements')
    const add_etabli_input = document.querySelector('#add_etabli_input')
    ajouter_etabliassement(add_etabli_input)
    aficher_liste_etablissements.innerHTML += `<li>${add_etabli_input.value}</li>`
})



document.querySelector('.ajouter_classes_btn').addEventListener('click', () => {
    const aficher_liste_classe = document.querySelector('.aficher_liste_classe')
    const add_classes_input = document.querySelector('#add_classes_input')
    ajouter_classe(add_classes_input)
    aficher_liste_classe.innerHTML += `<li>${add_classes_input.value}</li>`
})



const dit = (mes) => {
    let msg = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    msg.text = mes;
    msg.lang = 'fr';
    speechSynthesis.speak(msg);
}
dit("iko di? i faaforo. ni wary quo kèla babièya, en bé yongon toî")