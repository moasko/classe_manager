//data ( information sur les eleves)
let data = JSON.parse(localStorage.getItem('eleves'))
let data_class = []

let getEleves = () => {

}
const NOMBRE_DE = (data) => {
    return data.length
}


//document.queryselectop
function $(element) {
    return document.querySelector(element)
}

//fonctions a execter immediatement lors du chargement de la page 
window.onload = () => {
    lister(data_class)
    get_eleve_info()

}

//declaration des variables 
let dom_liste_eleves = $(".tableau")
const btn_ajouter_eleves = $('.ajouter_elev')



//affichage de la liste des eleves sur le tableau de bord
let lister = (select_data) => {
    let afficher_data = ''
    afficher_data = select_data.map((data_items, index) => {
        return `<div class="eleve" id=${data_items.id}>
        <div class="rang">${index + 1}</div>
         <div class="nom_eleve">${data_items.nom}</div>
           <div class="notees">
           <div>10</div>
           <div>12</div>
           <div>18</div>
           <div>14</div>
           </div>
           </div>`
    }).join('')
    dom_liste_eleves.innerHTML = afficher_data
}

//recuperation de la liste des etablissements
let LISTE_ETABLISSEMENT = data.reduce((val, itm) => {
    if (!val.includes(itm.etablissement)) {
        val.push(itm.etablissement)
    }
    return val
}, [])

//recupere les eleves d 'un etablissement spesifique
let ELEVES_DE = (equiv) => {
    let fil = data.filter((it) => {
        return it.etablissement == equiv
    })
    return fil
}


//`<div class="select a" id=${item.classe}>${item.classe}</div>`
//cree la liste des etablissements et leurs classes dans le sidebar

let sidebar = $('.sidbar-content')
let content = ''
LISTE_ETABLISSEMENT.forEach(e => {
            content += `
    <div class="rott">
    <div class="rot">
    <span>${e}</span>
    <img class="puc" src="assets/img/icons/down.svg" alt="">
    </div>
    <div id=${e} class="wr">
    ${[...new Set(ELEVES_DE(e).map(e => e.classe))].map(r => {
        return `<div class="select a" id=${r}>${r}</div>`
    }).join('')}
    </div>
    </div>`
    sidebar.innerHTML = content
})






//afficher les eleves  d'un classe au click
let select = document.querySelectorAll('.select')
select.forEach(e => {
    e.onclick = () => {
        const etablossement = e.parentElement.id
        const classe = e.id
        let get = data.filter(a => {
            return a.etablissement == etablossement
        })
        let det = get.filter(e => {
            return e.classe == classe
        })
        data_class = det
        lister(data_class)
        $('.trace').innerHTML = `${etablossement} > ${classe}`
        $('.label').innerHTML = NOMBRE_DE(data_class)
        get_eleve_info()
    }
})





refre()
//ajouter un eleve a la liste de classe
let ajouter_eleve = (_id, _nom, _prenom, _classe, _etablissement) => {
    this.id = _id
    this.nom = _nom
    this.prenom = _prenom
    this.classe = _classe
    this.etablissement = _etablissement
    return ({ id, nom, prenom, classe, etablissement })
}
$('.ajouter_elev').onclick = () => {
    const id = data.length + 1
    let nom = $('#nom').value
    let prenom = $('#prenom').value
    let etablissement = $('#etablissement').value
    let classe = $('#classe').value
    if (nom && prenom && etablissement && classe != "") {
        let add = ajouter_eleve(id, nom, prenom, classe, etablissement)
        data.push(add)
        setEleves()
        notification("succes", "eleve ajoute avec succes")
        vider_champ()
        refre()
        // afiche le nombre des eleves de la classe
        let nombre_eleves = data.length
        $('.label').innerHTML = nombre_eleves
    } else {
        notification("fail", "veillez ramplire les champs")
    }

}





//notification
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
            let id_cet_eleve = Number(cet_eleve.id)
            let lui = data.find(e => e.id == id_cet_eleve)
            $('.n1').innerHTML = `${lui.nom} ${lui.prenom}`
            console.log(lui)
        }
    })
}


let setEleves = () => {
    let str = JSON.stringify(data)
    localStorage.setItem('eleves', str)
}




////////////////////////////////////////////////////////////// functions a venire 

let suprime_eleve = () => {

}


let editer_eleve = () => {

}



/*

//recuperation des donnee de la database
let data = JSON.parse(localStorage.getItem('scool'))

if (data == "" || data == null) {
    data = []
}


//dexie




//declration des variables globales









//recuperation de la classe a chercher

function afiche() {
    let increment_tableau_num = 0
    let dom_content = ''
    var cl = db.friends;
    dom_content = ''
    increment_tableau_num = 0
    db.transaction('rw', db.friends, function*() {
        cl.each(function(e) {
            data_classe.push(e)
        });

    }).catch(function(err) {
        // Catch any error event or exception and log it:
        console.error(err.stack || err);
    });


}
afiche()






function get_classe_infos() {
    //moyenne de chaque eleves
    let mclass = []
        //recupere les notes de chaque eleves
    data_classe.map(m => {
            let l = m.notes.reduce((a, b) => a + b)
            mclass.push(l / m.notes.length)
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
        $('.plus_faible_n').innerHTML = plus_faible_note.toFixed(2)
            // afiche le nombre des eleves de la classe
        let nombre_eleves = data_classe.length
        $('.label').innerHTML = nombre_eleves

    } else {
        $('.myenne__classe').innerHTML = "0"
        $('.plus_forte_n').innerHTML = "0"
        $('.plus_faible_n').innerHTML = "0"
            // afiche le nombre des eleves de la classe
        let nombre_eleves = data_classe.length
        $('.label').innerHTML = "0"
    }

}





let eleves = $('.tableau')





let newNote = (rr) => {
    this.rr = rr
    let de = $("#id" + this.rr).value
    console.log(de)
}




let observer = new MutationObserver(() => {
    get_eleve_info()

})

observer.observe(dom_liste_eleves, { subtree: true, childList: true })
get_eleve_info()


*/