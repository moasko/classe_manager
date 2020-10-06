/**
 * permet d'inseré une valeur dans le local storage
 * @param {string} key 
 * @param {string} valeur 
 */
const insert = (key, valeur) => {
    key && valeur != '' ? localStorage.setItem(key, valeur) : null
}


/**
 * permet de recupere un element dans de local storage
 * @param {string} key 
 */
const selectData = (key) => {
    return localStorage.getItem(key)
}

function $(element) {
    return document.querySelector(element)
}




let btns = document.querySelectorAll('.button')
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let input = btn.previousElementSibling
        let att = input.getAttribute('data_key')
        insert(att, input.value)
    })

    let tp = btn.previousElementSibling
    tp.value = selectData(tp.getAttribute('data_key'))
})



const etabs = JSON.parse(selectData("liste_etabs_add")) || [],
    classes = JSON.parse(selectData("liste_classes_add")) || []

const printEtabs = () => {
    let cont1 = ''
    etabs.map(e => {
        cont1 += `<li class="etabsInDom" id=${e.replace(/\s+/g, "").toLowerCase()}>${e}</li>`
    })
    document.querySelector('.aficher_liste_etablissements').innerHTML = cont1
}

const printClasses = () => {
    let cont2 = ''
    classes.map(e => {
        cont2 += `<li>${e}</li>`
    })
    document.querySelector('.aficher_liste_classe').innerHTML = cont2
}

document.querySelector('.ajouter_etabl_btn').addEventListener('click', () => {
    let thisETab = document.querySelector('#add_etabli_input').value
    if (thisETab != '') {
        etabs.push(thisETab.replace(/\s+/g, ""))
        insert("liste_etabs_add", JSON.stringify(etabs))
        printEtabs()
        pri()
        document.querySelector('#add_etabli_input').value = ""
    } else {
        return
    }
})


document.querySelector('.ajouter_classes_btn').addEventListener('click', () => {
    let thisClasse = document.querySelector('#add_classes_input').value
    if (thisClasse != '') {
        classes.push(thisClasse.replace(/\s+/g, ""))
        insert("liste_classes_add", JSON.stringify(classes))
        printClasses()
        pri()
        document.querySelector('#add_classes_input').value = ""
    } else {
        return
    }
})

function pri() {
    let etabsInDom = document.querySelectorAll('.etabsInDom')
    etabsInDom.forEach(e => {
        e.addEventListener('click', () => {
            console.log(e.id)
        })
    })
}


window.onload = () => {
    pri()
    printEtabs()
    printClasses()
}