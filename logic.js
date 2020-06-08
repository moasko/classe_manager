//recuperation des donnee de la database
let data = JSON.parse(localStorage.getItem('scool'))

if (data == "" || data == null) {
    data = []
}


//declration des variables globales



//ajouter un eleve a la liste de classe
let ajouter_eleve = (_id, _nom, _prenom, _etablissement, _classe, _notes) => {
    this.id = _id
    this.nom = _nom
    this.prenom = _prenom
    this.etablissement = _etablissement
    this.classe = _classe
    this.notes = _notes
    return ({ id_eleve: id, nom: nom, prenom: prenom, etablissement: etablissement, classe: classe, notes: notes })
}

document.querySelector('.ajouter_elev').addEventListener('click', () => {
    const id = data.length + 1
    let nom = document.querySelector('#nom').value
    let prenom = document.querySelector('#prenom').value
    let etablissement = document.querySelector('#etablissement').value
    let classe = document.querySelector('#classe').value
    let notes = []

    if (nom && prenom && etablissement && classe != "") {
        let add = ajouter_eleve(id, nom, prenom, etablissement, classe, notes)
        data.push(add)
        localStorage.setItem('scool', JSON.stringify(data))
        notification("succes", "eleve ajoute avec succes")
        vider_champ()
        aficher()
            // afiche le nombre des eleves de la classe 
        let nombre_eleves = data.length
        document.querySelector('.label').innerHTML = nombre_eleves
    } else {
        notification("fail", "veillez ramplire les champs")
    }

})




//notification
function notification(type, texte) {
    this.type = type
    this.texte = texte
    let notifi = document.querySelector('.notifications')
    let not = document.querySelector('.not')
    let __text = document.querySelector('.notifi_texte')
    __text.innerHTML = this.texte
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




//recuperation de la classe a chercher
let data_classe = []
let select = document.querySelectorAll('.select')
select.forEach(e => {
    e.addEventListener('click', () => {
        const id = e.id
        let copy = [...data]
        const el = copy.filter(a => a.classe == id)
        data_classe = [...el]
        aficher()

    })
})







//actualiser l'affichage des eleves sur l'ecran (dans le dom)
let increment_tableau_num = 0
let dom_content = ''
let aficher = () => {
    dom_content = ''
    increment_tableau_num = 0
    let tableau = document.querySelector('.tableau')

    data_classe.forEach(e => {
        let note = e.notes.map(r => {
            return `<div>${r}</div>`
        }).join('')
        dom_content += `
        <div id="${e.id_eleve}" class="eleve">
        <div class="nom_eleve"><div class="rang">${increment_tableau_num+=1}</div> ${e.nom} ${e.prenom}</div>
        <div class="notees">${note} <input class="new-note" id="id${e.id_eleve}" type="number"/></div>
        <div class="more"><img src="more.svg"/><div class="plus_hun visible"><div class="pluss"><a href="#">voir</a>
        <a href="#">modifié</a><a href="#">suprimer</a></div></div></div></div> 
        `
    })
    tableau.innerHTML = dom_content


}




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
        document.querySelector('.myenne__classe').innerHTML = moyenne_classe.toFixed(2)

        //la plus fort et la plus faible note de la classe 
        let plus_fort_note = Math.max.apply(null, mclass)
        let plus_faible_note = Math.min.apply(null, mclass)
        document.querySelector('.plus_forte_n').innerHTML = plus_fort_note.toFixed(2)
        document.querySelector('.plus_faible_n').innerHTML = plus_faible_note.toFixed(2)
            // afiche le nombre des eleves de la classe 
        let nombre_eleves = data_classe.length
        document.querySelector('.label').innerHTML = nombre_eleves

    } else {
        document.querySelector('.myenne__classe').innerHTML = "0"
        document.querySelector('.plus_forte_n').innerHTML = "0"
        document.querySelector('.plus_faible_n').innerHTML = "0"
            // afiche le nombre des eleves de la classe 
        let nombre_eleves = data_classe.length
        document.querySelector('.label').innerHTML = "0"
    }

}





let eleves = document.querySelector('.tableau')

function get_eleve_info() {
    let iteme = eleves.querySelectorAll('.eleve')
    iteme.forEach(e => {
        e.addEventListener('click', () => {
            let id = Number(e.id)
            let el = data.find(x => x.id_eleve === id)
            let barVIew = `${el.etablissement} > ${el.classe} > ${el.nom} ${el.prenom}`
            let nop = `${el.nom} ${el.prenom}`
            let notes_eleve = el.notes.reduce((a, b) => a + b)
            let myenne_eleve = notes_eleve / el.notes.length
            document.querySelector('.n1').innerHTML = nop
            document.querySelector('.moy').innerHTML = `${myenne_eleve.toFixed(2)}<span class="dmn">dMn</span>`
            document.querySelector('.trace').innerHTML = barVIew
            newNote(id)
            aficher()
        })
    })
}

let stop = document.querySelectorAll('input')
stop.forEach(elems => {
    elems.addEventListener('click', (e) => {
        e.stopPropagation()
    })
})



let newNote = (rr) => {
    this.rr = rr
    let de = document.querySelector("#id" + this.rr).value
    console.log(de)
}




let observer = new MutationObserver(() => {
    get_eleve_info()
    get_classe_infos()
})

observer.observe(eleves, { subtree: true, childList: true })
get_eleve_info()
get_classe_infos()
aficher()