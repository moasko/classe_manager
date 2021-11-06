const ETABLISSEMENTS_LIST = 'ETABLISSEMENTS';
const CLASSES_LIST = 'CLASSES';
const LOCKED = 'LOCKED';
const U_ID = 'UNIC_ID' || 0;
const ELEVES_LISTE = 'ELEVES';
const CURENT_ETABLISSEMENT = 'CURENT_ETABLISSEMENT';
const DECOUP = 'DECOUP';
const SESSION_SCOLAIRE = 'SESSION_SCOLAIRE';
const SELECTED_SESSION_SCOLAIRE = 'a';



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

const INSERT = (key, value, next) => {
    if (key && value) {
        JSON.stringify(localStorage.setItem(key, value))
        next({
            status: "success",
            message: "les donnée on ete bin inserer dans le localstorage"
        }, null)
    } else {
        next(null, {
            status: "error",
            message: '❌ impossible d\'inserer des données vide dans localStorage'
        })
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

/**
 * verifié si une table existe dans la db
 * @param {String} tableName
 */
function exist_in_db(tableName) {
    return SELECT_FROM(tableName) != null
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
    <button id=${data_items.id} class="suprimer_eleve">suprimer</button>
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
let ELEVES_OF_CLASSE = (etablissement_key) => data.filter(eleves => eleves.etablissement == etablissement_key)


/**
 * creation d'une liste des etablissements dynamiquement
 * @param {object} dat les donner a filtrer
 * @return {array}
 */
let listerEtablisselents = () => {
    let etablissements = JSON.parse(SELECT_FROM(ETABLISSEMENTS_LIST)) || []
    return etablissements
}


function etablissementExistin(etabName) {
    let exstingetabs = JSON.parse(SELECT_FROM(ETABLISSEMENTS_LIST))
    let y = exstingetabs.map(e => {
        return e.name
    })
    return y.includes(etabName)
}



/**
 * Verifie si la table UNIC_ID n'existe pas dans le local storage
 * si non on l'ajoute avec un valeur 0
 */
window.onload = () => {
    if (!exist_in_db(UNIC_ID)) {
        localStorage.setItem(U_ID, 0)
    }
}


class Eleves {


    static creatEleve({ id = Number(SELECT_FROM(U_ID) + 1), nom, prenom, classe, etablissement, notes }, callback) {
        try {
            new Promise((resolev, reject) => {
                let el = {
                    id: id,
                    nom: nom,
                    prenom: prenom,
                    classe: classe,
                    etablissement: etablissement,
                    notes: notes
                }

                INSERT(ELEVES_LISTE, JSON.stringify(el), (success, err) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        resolev(success)
                    }
                })
            }).then(e => {
                callback(e)
            })

        } catch (err) {
            console.log("error")
        }
    }



    static getAllEleves(callback) {
        try {
            if (SELECT_FROM(ELEVES_LISTE) != null) {
                callback(SELECT_FROM(ELEVES_LISTE))
            }
            callback({
                status: "error",
                message: "la liste des eleves est indisponible"
            })
        } catch (err) {
            console.error(`une erreure est survenu lors de la recuperation de la liste des eleves ${err}`)
        }

    }



    static getEleveById(id) {
        this.getAllEleves(eleves => {
            return eleves.find(el => el.id === id)
        })
    }

}


Eleves.creatEleve({
    nom: "moasko1",
    prenom: "dev",
    classe: "tels",
    etablissement: "istco",
    notes: [
        {
            de: "d1",
            notes: [{ n: 10, s: 1 }, { n: 15, s: 0.5 }]
        }, {
            de: "d2",
            notes: [{ n: 8, s: 0.5 }, { n: 15, s: 0.5 }]
        }
    ]
}, (err) => {
    if (err) {
        console.log(err)
    }
})