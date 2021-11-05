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


function displayEtabsClasses(classeObject) {
    let classesHTML = ''
    classeObject.map(e => {
        classesHTML += `<li class="classesDisplayerListe" id=${ereplace(/\s+/g, "")}><span>${e}</span><span>X</span></li>`
    })

    return classesHTML
}
const printEtabs = async() => {
    let cont1 = ''
    await etabs.map(async e => {
        cont1 += `<li class="etabsInDom"  id=${(e.etabName).replace(/\s+/g, "").toLowerCase()}><span>${e.etabName}</span><span><i class="icofont-close-line-circled"></i></span></li>`
        await pri()
    })
    document.querySelector('.aficher_liste_etablissements').innerHTML = cont1
}


function pri() {
    let etabsInDom = document.querySelectorAll('.etabsInDom')
    document.querySelectorAll('.etabsInDom').forEach(e => {
        e.addEventListener('click', () => {
            console.log(e.id)
        })
    })
}

pri()
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
        let etablss = {
            "etabName": `${thisETab.replace(/\s+/g, '')}`,
            "classes": ["tlr", "ddd"]
        }
        etabs.push(etablss)
        insert("liste_etabs_add", JSON.stringify(etabs))
        printEtabs()
        pri()
        document.querySelector('#add_etabli_input').value = ""
    } else {
        return
    }
})



function deletee(table, element) {
    const ctu = [...JSON.parse(selectData(table))]
    let index = ctu.indexOf(element)
    ctu.splice(1, index)
    insert(table, JSON.stringify([...ctu]))
}




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



window.onload = () => {
    pri()
    printEtabs()
    printClasses()
}