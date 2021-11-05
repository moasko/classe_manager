function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }
        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}




/**recuperation de la liste des eleves dan la baase de donnees (localstorage) */
let data = JSON.parse(localStorage.getItem('eleves'))
if (data == undefined || data == null) data = []

/****cree un id unique *****/
let UNIC_ID = JSON.parse(localStorage.getItem('unic_id'))
if (UNIC_ID == undefined || UNIC_ID == null || UNIC_ID == '') UNIC_ID = 0

/**creation d'une base de donnees virtuele de regroupement par etablissement et classe*/
let dataClasse = []
if (dataClasse == undefined || dataClasse == null) dataClasse = []

/**
 * permet de nombreDe le nombre d'itemes dans un tableau
 * @param {*} items est lelement a compter
 */
const nombreDe = (items) => items.length


/**
 * document.querySelector
 * @param {HTMLElement} element l'element a selectionné
 */
const $ = (element) => document.querySelector(element)


/**
 * permet d'insérer des valeurs dans localStorage
 * @param {string} key le nom de la table
 * @param {string} value la valeur a enter dans la table
 */

const INSERT = (key, value) => {
    if (key && value) {
        JSON.stringify(localStorage.setItem(key, value))
    } else {
        console.error('❌ impossible d\'inserer des données vide dans localStorage')
    }
}

/**
 * permet de recuperer la valeur d'une table dans localStorage
 * @return {string} retourne la valeur en String
 * @param {string} key le nom de la table de valeur a recuperer
 */
const SELECT_FROM = (key) => {
    if (key != '') {
        return localStorage.getItem(key)
    }
}

//declaration des variables 
let dom_liste_eleves = $(".tableau")
const btn_ajouter_eleves = $('.ajouter_elev')


/**
 * permet de cree une liste des eleves dans le dom
 * avec leurs infos [nom...notes]
 * @param {Array} select_data 
 */
let createClasseListeOf = (select_data) => {
    let printDataInDom = ''
    let sl = select_data.sort(compareValues('nom'))
    printDataInDom = select_data.map((data_items, index) => {
        let eleve_notes = data_items.notes
        let notes = eleve_notes[SELECT_FROM("decoup")]
        return `
    <div class="eleve" id=${data_items.id}>
    <div class="rang">${index + 1}</div>
    <div class="nom_eleve">${data_items.nom} ${data_items.prenom}</div>
    <div class="notees">${notes != "" ? notes.map(note => `<div>${note}</div>`).join('') : '<div class="aucune">Aucune note</div>'}</div>
    <div class="par">
    <div class="view_option">o</div>
    <div class="poper_view">
    <button id=${data_items.id} class="editer_eleve">editer</button>
    <button  id=${data_items.id} class="suprimer_eleve">suprimer</button>
    </div>
    </div>
    </div>`
    }).join('')
    dom_liste_eleves.innerHTML = printDataInDom
}


/**
* recupere les eleves d 'un etablissement spesifique
* @param {string} etablissement_key 
*/
let ELEVES_DE = (etablissement_key) => data.filter(eleves => eleves.etablissement == etablissement_key)



/**
 * creation d'une liste des etablissements dynamiquement
 * @param {object} dat les donner a filtrer
 * @return {array}
 */
let listerEtablisselents = async() => {
    let etablissements = await JSON.parse(SELECT_FROM('liste_etabs_add')) || []
    return etablissements
}



/**
 * recuperation des notes d'un eleve a un periode
 * @param {number} id identifient de l'eleve
 * @param {string} decoup la periode des notes
 */
function get_notes(id, periode) {
    const eleve = data.find(eleve => eleve.id == id)
    const notes = eleve.notes[periode]
    return notes
}



function notes_additon(notes) {
    let aditioner = notes.reduce((a, b) => a + b)
    return aditioner
}


function get_moyenne(id) {
    let eleve = data.filter(eleve => eleve.id == id)
}


//`<div class="select a" id=${item.classe}>${item.classe}</div>`
//cree la liste des etablissements et leurs classes dans le sidebar


async function gestionPuce() {
    let content = ''
    let sidebar = $('.sidbar-content')
    await listerEtablisselents().forEach(e => {
        content += `
<div class="rott">
<div class="rot"> 
<span>${e.etabName}</span>
<img class="puc" src="assets/img/icons/down.svg" alt="">
</div>
<div id=${e.etabName} class="wr">
${e.classes.map(r => {
            return `<div class="select a" id=${r}>${r}</div>`
        }).join('')}
</div>
</div>`
        sidebar.innerHTML = content
    })

}

gestionPuce()



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



function deleteElement(table, element) {
    const ctu = [...JSON.parse(SELECT_FROM(table))]
    //let index = ctu.indexOf(element)
    //ctu.splice(1, index)
    //INSERT(table, JSON.stringify([...ctu]))
    console.log(ctu)
}




let etab_classe = (etablissement, classe) => {
    let get = data.filter(a => a.etablissement == etablissement)
        .filter(e => e.classe == classe)
    dataClasse = get.sort(compareValues('nom'))
}

let getElevesOff = (etablissement, classe) => {
    let get = data.filter(a => a.etablissement == etablissement)
        .filter(e => e.classe == classe)
    return get.sort(compareValues('nom'))
}


//afficher les eleves  d'un classe au click
let select = document.querySelectorAll('.select')
select.forEach(e => {
    e.onclick = () => {
        const etablissement = e.parentElement.id
        const classe = e.id
        etab_classe(etablissement, classe)
        createClasseListeOf(dataClasse)
        $('.trace').innerHTML = `${etablissement} > ${classe}`
        $('.label').innerHTML = nombreDe(dataClasse)
        //les fonctions a appelé au click d'un bouton de classe
        get_eleve_info()
        get_classe_infos()
        INSERT("actuel_etablissement", etablissement)
        INSERT("actuel_classe", classe)
        listerEtablisselents()
        para()
    }


})

document.querySelector('.listes').onclick = async () => {
    await list_de_classe(SELECT_FROM("actuel_etablissement"), SELECT_FROM("actuel_classe"))
    document.querySelector('.modal_liste').classList.toggle('view')
}



//ajouter un eleve a la liste de classe
/**
* 
* @param {Number} _id 
* @param {String} _nom 
* @param {String} _prenom 
* @param {String} _classe 
* @param {String} _etablissement 
* @param {Array<Number>} _notes 
*/
let ajouter_eleve = (_id, _nom, _prenom, _classe, _etablissement, _notes) => {
    this.id = _id
    this.nom = _nom
    this.prenom = _prenom
    this.classe = _classe
    this.etablissement = _etablissement
    this.notes = _notes
    return ({ id, nom, prenom, classe, etablissement, notes })
}
$('.ajouter_elev').onclick = () => {
    const id = UNIC_ID + 1
    UNIC_ID++
    let nom = $('#nom').value
    let prenom = $('#prenom').value
    let etablissement = $('#etablissement').value
    let classe = $('#classe').value
    let notes = {
        "a1": [],
        "a2": [],
        "a3": []
    }
    if (nom && prenom && etablissement && classe != "") {
        let add = ajouter_eleve(id, nom, prenom, classe, etablissement, notes)
        data.push(add)
        INSERT("unic_id", UNIC_ID + 1)
        setEleves()
        listerEtablisselents()
        get_classe_infos()
        gestionPuce()
        dataClasse = getElevesOff(SELECT_FROM('actuel_etablissement'), SELECT_FROM('actuel_classe'))
        Update()
        notification("succes", "eleve ajoute avec succes")
        vider_champ()
        // afiche le nombre des eleves de la classe
        let nombre_eleves = data.length
        $('.label').innerHTML = nombre_eleves
    } else {
        notification("fail", "veillez ramplire les champs")
    }

}

function Update() {
    createClasseListeOf(dataClasse)
}



/**
* notification
* @param {String} type success ou  fail
* @param {string} message message de succes ou message d'erreure
*/
function notification(type, message) {
    this.type = type
    this.message = message
    let notifi = $('.notifications')
    let not = $('.not')
    $('.notifi_texte').innerHTML = this.message
    if (this.type == "succes") {
        notifi.classList.add("succes")
        notifi.classList.remove("fail")
    } else if (this.type == "fail") {
        notifi.classList.add("fail")
        notifi.classList.remove("succes")
    }
    not.style.display = "block"
    setTimeout(() => {
        not.style.display = "none"
    }, 3000)
}




//les informations sur l'eleve
function get_eleve_info() {
    let iteme = dom_liste_eleves.querySelectorAll('.eleve')
    iteme.forEach(cet_eleve => {
        cet_eleve.onclick = () => {
            removeClasse(iteme, "focus")
            cet_eleve.classList.add("focus")
            let id_cet_eleve = Number(cet_eleve.id)
            let lui = data.find(e => e.id == id_cet_eleve)
            $('.n1').innerHTML = `${lui.nom} ${lui.prenom}`
            $('.n1').parentElement.id = lui.id
            calculer_moyen_eleve(id_cet_eleve)
            para()
        }
    })
}



/**
* 
* @param {Number} id identifient de l'eleve 
*/
let calculer_moyen_eleve = (id) => {
    let not = data.find(eleve => eleve.id == id)
    let trp = not.notes[localStorage.getItem("decoup")], nombre = trp.length
    let totale_notes = trp.reduce((m, n) => m + n, 0)
    $('.ptn').innerHTML = totale_notes
    if (isNaN(totale_notes / trp.length)) {
        nombre = 1
    }
    return $('.moy').innerHTML = `${(totale_notes / nombre).toFixed(2)}<span class="dmn">dMn</span>`
}

const getEleve = (id) => {
    let eleve = data.find(e => e.id == id)
    return eleve
}


//ajouter un note a un eleve selectionne
let add_note_btn = $('.add_note_btn')
let delet_note_btn = $('.delet_note_btn')

let ajouter_note = (not) => {
    let addn = data.find(r => r.id == $('.n1').parentElement.id)
    if (addn != 'undefined') {
        let gNotes = addn.notes
        gNotes[localStorage.getItem("decoup")].push(Number(not))
        setEleves()
        createClasseListeOf(dataClasse)
        para()
    } else {
        notification('fail', 'veillez selectionner un eleve svp')
        return null
    }

}

let suprimer_note = () => {
    let addn = data.find(r => r.id == $('.n1').parentElement.id)
    let note_a_sup = addn.notes
    note_a_sup[localStorage.getItem("decoup")].pop()
    setEleves()
    createClasseListeOf(dataClasse)
}



add_note_btn.onclick = () => {
    let note = $('#ajouter_note').value
    if (note != '' || note != "undefined") {
        if (note > 20) {
            notification("fail", "na note ne peut etre superieur a 20")
        } else {
            ajouter_note(note)
            get_classe_infos()
            $('#ajouter_note').value = ''
            notification("succes", "note ajouer")
        }

    } else {
        notification("fail", "veillez ajouer une note svp")
    }

}


delet_note_btn.onclick = () => {
    suprimer_note()
    get_classe_infos()
}

//////////////////////////////////////////////////////


//cree la liste des classes et etablissements
let etabContent = ''
let cca = ''
let DomEtablissement = $('#etablissement')
let DomClasse = $('#classe')

$('#etablissement').value = SELECT_FROM('actuel_etablissement')
$('#classe').value = SELECT_FROM('actuel_classe')






function get_classe_infos() {
    //moyenne de chaque eleves
    let mclass = []
    //recupere les notes de chaque eleves
    dataClasse.map(eleves => {
        try {
            let notesAditionEleve = eleves.notes[localStorage.getItem("decoup")].reduce((a, b) => a + b)
            mclass.push(notesAditionEleve / eleves.notes[localStorage.getItem("decoup")].length)
        } catch (e) {
            notification('fail', "ceratins eleves n'ont pas de notes dans cette classe")
        }

    })
    // calcule la moyenne de classe
    if (mclass != "") {
        let note_class = mclass.reduce((a, b) => a + b)
        let moyenne_classe = note_class / mclass.length
        $('.myenne__classe').innerHTML = moyenne_classe.toFixed(2)
        //la plus fort et la plus faible note de la classe
        let plus_fort_note = Math.max.apply(null, mclass)
        let plus_faible_note = Math.min.apply(null, mclass)
        $('.plus_forte_n').innerHTML = plus_fort_note.toFixed(2)
        if (dataClasse.length > 1 && mclass.length == 1) {
            $('.plus_faible_n').innerHTML = 0
        } else {
            $('.plus_faible_n').innerHTML = plus_faible_note.toFixed(2)
        }

        // afiche le nombre des eleves de la classe
        let nombre_eleves = dataClasse.length
        $('.label').innerHTML = nombre_eleves

    } else {
        $('.myenne__classe').innerHTML = "0"
        $('.plus_forte_n').innerHTML = "0"
        $('.plus_faible_n').innerHTML = "0"
        $('.label').innerHTML = "0"
    }

}
let theads = {

    classement: `<tr>
                  <th>N°</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Ptn</th>
                  <th>Ptn Coef</th>
                  <th>Moy</th>
                  <th>Rang</th>
                </tr>`,

    liste: `<tr>
                 <th>N°</th>
                 <th>Nom</th>
                <th>Prenom</th>
              </tr>`,

}


const thead = document.querySelector('thead')

// cree un liste de la classe
let list_de_classe = (tabl, classe) => {
    thead.innerHTML = theads.liste
    let tbody = $('.modal_liste tbody')
    $('.classe_name').innerHTML = `liste de classe de :${tabl} ${classe}`
    let liste_de = dataClasse.filter(eleve => eleve.classe == classe)
    let classe_list = liste_de.map((p, index) => {
        return `
<tr>
<td>${index + 1}</td>
<td>${p.nom}</td>
<td>${p.prenom}</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
`
    }).join('')
    tbody.innerHTML = classe_list
}


/**
 * function pour editer un eleves
 */
const data_update = ({ id, key, newvalue }) => {
    try {
        const to = JSON.parse(SELECT_FROM("eleves"))
        let selected = to.find(e => e.id === id)
        selected[key] = newvalue
        INSERT("eleves", JSON.stringify(to))
        createClasseListeOf(dataClasse)
    } catch (e) {
        console.log(e)
    }
}




let setEleves = () => {
    let str = JSON.stringify(data)
    localStorage.setItem('eleves', str)
}



let radio = document.querySelector('.radios')
let radios = radio.querySelectorAll('div')

function removeClasse(all, classename) {
    all.forEach(e => {
        e.classList.remove(classename)
    })
}

radios.forEach(e => {
    e.onclick = () => {
        const id = e.id
        removeClasse(radios, "epe")
        e.classList.add('epe')
        localStorage.setItem('decoup', id)
        createClasseListeOf(dataClasse)
        get_eleve_info()
        get_classe_infos()


    }
})


if (SELECT_FROM("decoup") == "a1") {
    radios[0].classList.add('epe')
    radios[1].classList.remove("epe")
    radios[2].classList.remove("epe")
} else if (SELECT_FROM("decoup") === "a2") {
    radios[0].classList.remove('epe')
    radios[1].classList.add("epe")
    radios[2].classList.remove("epe")
} else {
    radios[0].classList.remove('epe')
    radios[1].classList.remove("epe")
    radios[2].classList.add("epe")
}


if (localStorage.getItem('decoupage') === "1") {
    radio.children[0].innerHTML += " block"
    radio.children[1].style.display = "none"
    radio.children[2].style.display = "none"
} else if (localStorage.getItem('decoupage') === "2") {
    radio.children[2].style.display = "none"
    radio.children[1].innerHTML += " semestre"
    radio.children[0].innerHTML += " semestre"
} else {
    radio.children[0].innerHTML += " trimestre"
    radio.children[1].innerHTML += " trimestre"
    radio.children[2].innerHTML += " trimestre"
}




const clasement = (classe_data, decoup) => {
    const additione = (eleves) => {
        let notes = eleves.notes[decoup]
        if (notes == [] || notes == '' || notes == undefined) {
            return 0
        } else {
            return notes.reduce((a, b) => (a + b))
        }
    }
    let classement_classe_table = []
    classe_data.forEach(e => {
        classement_classe_table.push({ 'nom': e.nom, 'prenom': e.prenom, "total_notes": additione(e) })
    });

    let mm = classement_classe_table.sort(compareValues('total_notes', 'desc'))
    let tbody = $('.modal_liste tbody')
    thead.innerHTML = theads.classement
    $('.classe_name').innerHTML = `classement de la classe de ${SELECT_FROM("actuel_classe")} a ${SELECT_FROM("actuel_etablissement")}`
    let r = "eme"
    let classement_liste = mm.map((e, index) => {
        return `   
        <tr>
        <td>${index + 1}</td>
        <td>${e.nom}</td>
        <td>${e.prenom}</td>
        <td>${(e.total_notes)}</td>
        <td>${(e.total_notes * 4)}</td>
        <td>${(e.total_notes / 4).toFixed(2)}</td>
        <td>${index + 1}<sup>${(index + 1 == 1) ? "er" : r}</sup></td>
        </tr>
        `
    }).join('')
    tbody.innerHTML = classement_liste

}


$('.classement').onclick = async () => {
    await clasement(dataClasse, localStorage.getItem('decoup'))
    document.querySelector('.modal_liste').classList.toggle('view')
}

$('.close_edit_scree').onclick = () => {
    $('.edit_screen').classList.remove('edit_view')
}


const suprimerEleve = (id) => {
    let index = data.map(function (item) { return item.id; }).indexOf(Number(id));
    data.splice(index, 1);
    INSERT('eleves', JSON.stringify(data))
    createClasseListeOf(getElevesOff(SELECT_FROM("actuel_etablissement"), SELECT_FROM("actuel_classe")))
    para()
}
$('#enregistre_edition').onclick = () => {
    let id = Number($('.eleve_id').id)
    const to = JSON.parse(SELECT_FROM("eleves"))
    let selected = to.find(e => e.id === id)
    data = to
    createClasseListeOf(dataClasse)
    selected.nom = $('#edite_nom').value
    selected.prenom = $('#edite_prenom').value
    selected.etablissement = $('#edite_etablissement').value
    selected.classe = $('#edite_classe').value
    selected.notes[SELECT_FROM('decoup')] = JSON.parse(`[ ${$('#edit_notes').value} ]`)
    INSERT('eleves', JSON.stringify(to))
    dataClasse = getElevesOff(SELECT_FROM('actuel_etablissement'), SELECT_FROM('actuel_classe'))
    createClasseListeOf(dataClasse)
    get_classe_infos()
    get_eleve_info()
}


const para = () => {
    let parames = document.querySelectorAll('.view_option')
    let popers = parames.forEach(e => {
        let view_opt = e.nextElementSibling
        e.onclick = () => {
            view_opt.classList.toggle('popview')
            let suprim = view_opt.querySelector('.suprimer_eleve')
            let edit = view_opt.querySelector('.editer_eleve')

            edit.onclick = () => {
                let id = edit.id
                let eleve = getEleve(Number(id))
                $('#edite_nom').value = eleve.nom
                $('#edite_prenom').value = eleve.prenom
                $('#edite_etablissement').value = eleve.etablissement
                $('#edite_classe').value = eleve.classe
                $('#edit_notes').value = eleve.notes[SELECT_FROM('decoup')]
                $('.edit_screen').classList.add('edit_view')
                $('.eleve_id').id = id
            }

            suprim.onclick = () => {
                let id = suprim.id
                suprimerEleve(id)
                listerEtablisselents()
                liste_etab_nom()
                get_classe_infos()
            }

        }
    })
    return popers
}

$('.print').onclick = () => {
    window.print()
}


let observer = new MutationObserver(() => {
    get_eleve_info()
})



observer.observe(dom_liste_eleves, { subtree: true, childList: true })
observer.observe($('.sidbar-content'), { subtree: true, childList: true })

get_eleve_info()

//fonctions a execter immediatement lors du chargement de la page 
window.onload = () => {
    get_eleve_info()
}