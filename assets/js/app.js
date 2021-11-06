function toggleAll(allElements, classe) {
    [document.querySelectorAll(allElements)].map(element => {
        if (element.classList.contains(classe)) {
            element.classList.remove(classe)
        }
        element.onclick = function() {
            element.classList.add(classe)
        }
    })
}

const creatEtablissement = (etablissementName) => {
    try {
        if (etablissementName) {
            if (exist_in_db(ETABLISSEMENTS_LIST)) {
                if (!etablissementExistin(etablissementName)) {
                    let etabs = SELECT_FROM(ETABLISSEMENTS_LIST);
                    let stingfy = JSON.parse(etabs)
                    let etab_to_insert = [{ "name": etablissementName, "classes": [] }, ...stingfy]
                    INSERT(ETABLISSEMENTS_LIST, JSON.stringify(etab_to_insert))
                } else {
                    console.log(`etablissemnt ${etablissementName} existe deja`)
                }
            } else {
                INSERT(ETABLISSEMENTS_LIST, JSON.stringify([{ "name": etablissementName, "classes": [] }]))
            }
        }
    } catch (e) { console.log("une erreure avec l'ajoute d'tablissement" + e) }
}

$('.add_new_etablissement_btn').addEventListener('click', () => {
    let add_etablissement_input = $('#add_etablissement_input').value
    if (add_etablissement_input != '') {
        creatEtablissement(add_etablissement_input)
        gestionPuce()
        printEtablissement()
        notification('success', `${add_etablissement_input} a bien ete ajouter a la liste des etablissement`)
    } else {
        null
        notification('fail', 'veillez entre un nom d\'etablissement svp')
    }
})

const getEtablissementsListe = () => {
    let etablissements = JSON.parse(SELECT_FROM(ETABLISSEMENTS_LIST));
    return etablissements;
}

const printEtablissement = async() => {
    let listeEtalissementInDom = ''
    await getEtablissementsListe().map(async e => {
        listeEtalissementInDom += `<li class="etabsInDom"  id=${(e.name).replace(/\s+/g, "").toLowerCase()}><span>${e.name}</span><span classe="delete_etablissement_button"><i class="icofont-close-line-circled"></i></span></li>`
    })
    document.querySelector('.aficher_liste_etablissements').innerHTML = listeEtalissementInDom;
}
printEtablissement()


/* const deletEtablissement = (etablissementName,classeName,remplaced)=>{
const etablis_liste = JSON.parse(SELECT_FROM(ETABLISSEMENTS_LIST))
const finded = etablis_liste.find(e=>e.name == etablissementName)
.classes.find(r=>r==classeName) 

console.log(finded)
}

deletEtablissement("itc","moas","tell") */
/***************************************************************** */


// fontions pour ajouter aficher suprimer des classes
const createClasse = (etablissement, classeName) => {
    let etablissements = JSON.parse(SELECT_FROM(ETABLISSEMENTS_LIST))
    let r = etablissements.filter(e => e.name == etablissement)
    let s = ((r[0]).classes)
    s.push(classeName)
    INSERT(ETABLISSEMENTS_LIST, JSON.stringify(etablissements))
}
const add_classes_btn = $('.add_classes_btn')

add_classes_btn.addEventListener('click', () => {
    const add_classes_input = $('#add_classes_input').value
    const selectedEtablissementId = $('#selectedEtablissementId').value
    if (add_classes_input == '' || selectedEtablissementId == '') {
        console.log("error")
    } else {
        createClasse(selectedEtablissementId, add_classes_input)
        printEtablissement()
        refreshEtablissementParamettersListe()
    }
})


$('.add_classes_btn').addEventListener('click', () => {
    let id = $('#selectedEtablissementId').value
    let value = $('#add_classes_input').value
    createClasse(id, value)
})


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
<span>${e.name}</span>
<img class="puc" src="assets/img/icons/down.svg" alt="">
</div>
<div id=${e.name} class="wr">
${e.classes.map(r => {
            return `<div class="select a" id=${r}>${r}</div>`
        }).join('')}
</div>
</div>`
        sidebar.innerHTML = content
    })

    //selectionne les puces et les deroule au click
    const rw = document.querySelectorAll('.rott')
    for (let i = 0; i < rw.length; i++) {
        rw[i].onclick = () => {
            let rwh = rw[i].querySelector('.wr')
            let rwr = rwh.children
            let r = []
            for (let i = 0; i < rwr.length; i++) {
                let e = rwr[i];
                r.push(e.clientHeight)
            }
            let mesu = r.reduce((a, b) => a + b)
            rwh.classList.contains('hop') ? rwh.style.height = mesu + "px" : rwh.style.height = null
        }

    }
    const m = document.querySelectorAll(".puc");
    for (const pc of m) {
        pc.parentNode.addEventListener("click", function () {

            const t = this.lastElementChild;
            t.classList.toggle("rotat180");
            this.nextElementSibling.classList.toggle("hop");
        });
    }

    //recuperation de la date
    const anne = document.querySelector(".annee");
    const d = new Date();
    const a = d.getFullYear();

    anne.innerHTML = `${a - 1}-${a}`;

}

gestionPuce()







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
    }, 4000)
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
    let allElevesNotes = []
    //recupere les notes de chaque eleves
    dataClasse.map(eleves => {
        try {
            let notesAditionEleve = eleves.notes[localStorage.getItem("decoup")].reduce((a, b) => a + b)
            allElevesNotes.push(notesAditionEleve / eleves.notes[localStorage.getItem("decoup")].length)
        } catch (e) {
            notification('fail', "ceratins eleves n'ont pas de notes dans cette classe")
        }

    })
    // calcule la moyenne de classe
    if (allElevesNotes != "") {
        let note_class = allElevesNotes.reduce((a, b) => a + b)
        let moyenne_classe = note_class / allElevesNotes.length
        $('.myenne__classe').innerHTML = moyenne_classe.toFixed(2)
        //la plus fort et la plus faible note de la classe
        let plus_fort_note = Math.max.apply(null, allElevesNotes)
        let plus_faible_note = Math.min.apply(null, allElevesNotes)
        $('.plus_forte_n').innerHTML = plus_fort_note.toFixed(2)
        if (dataClasse.length > 1 && allElevesNotes.length == 1) {
            $('.plus_faible_n').innerHTML = 0
        } else {
            $('.plus_faible_n').innerHTML = plus_faible_note.toFixed(2)
        }

        // afiche le nombre des eleves de la classe
        $('.label').innerHTML = dataClasse.length
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
    $('.label').innerHTML = dataClasse.length
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