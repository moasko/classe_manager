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
    pc.parentNode.addEventListener("click", function() {

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





//sidbar constroler


function fermeSidebar() {

    const layout = document.querySelector("#layout-container");
    const sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("sidbarCloser");
    layout.classList.toggle("cent");
}

function bold() {
    const boldr = document.querySelector(".ajouter-element");
    boldr.classList.toggle("efe");

}




document.querySelector('.close_liste').onclick = () => {
    document.querySelector('.modal_liste').classList.toggle('view')
}




//modale pour ajouter eleve
let modal = document.querySelector('.modal')
modal.addEventListener('click', () => {
    modal.style.display = "none"
})


//permet de vider les champs du formulaire d'ajouter eleves
function vider_champ() {
    document.querySelector('#nom').value = ''
    document.querySelector('#prenom').value = ''
    document.querySelector('#etablissement').value = ''
    document.querySelector('#classe').value = ''
}



document.querySelector('.annuler').addEventListener('click', () => {

    vider_champ()
    modal.style.display = "none"
})
let former = document.querySelector('.former')
former.addEventListener('click', (e) => {
    e.stopPropagation()
})



let add_el = document.querySelector('.eleve_add_modal')
add_el.addEventListener('click', () => {
    modal.style.display = "block"
    $('#etablissement').value = SELECT_FROM('actuel_etablissement')
    $('#classe').value = SELECT_FROM('actuel_classe')
})

//ouverture de plus
function plu() {
    let plus = document.querySelectorAll('.more')
    plus.forEach(e => {
        e.addEventListener('click', () => {
            e.children[1].classList.toggle('visible')
            console.log(e.children[1].classList)
        })
    })
}

document.addEventListener('load', () => {
    plu()
})



document.querySelectorAll('.select').forEach(e => {
    e.addEventListener('click', (r) => {
        r.preventDefault()
    })
})

/******** gestionnair de verouillage d'ecran***********/
const lock_screen = document.querySelector('.lock-screen')
const VEROU_TIME = 1
let cont = 0
const tim = 1000
let minute = 60 * localStorage.getItem('temps')


function locker() {
    cont++
    if (cont == Number(minute)) {
        lockScreen()
        cont = 0
    }

}
let timer = setInterval(locker, tim)

window.onmousemove = () => cont = 0


const deblock = () => {
    const pass = localStorage.getItem('password')
    let password = document.querySelector('.password').value
    if (password === pass) {
        unlockScreen()
    } else {
        lockScreen()
        notification('fail', 'mot de pass incorect')
    }

}

const printClasseListe = (etablissement) => {
    let classes = ''
    JSON.parse(SELECT_FROM(ETABLISSEMENTS_LIST))
        .find(e => e.name === etablissement)
        .classes.map(e => {
            classes += `<div class="classePrint">${e}</div>`
        })
    $('.aficher_liste_classe').innerHTML = classes
}

document.querySelectorAll('.etabsInDom').forEach(e => {
    e.addEventListener('click', () => {
        document.querySelectorAll('.etabsInDom').forEach(a => {
            a.classList.remove('activated')
        })
        e.classList.add('activated')
        document.querySelector('#selectedEtablissementId').value = e.id
        document.querySelector('.actualeta').innerHTML = e.id
        printClasseListe(e.id)
    })
})


document.querySelector('#dislock_btn').onclick = deblock

lock_screen.onkeydown = (e) => {
    e.key == 'enter' || e.key == 'Enter' ? deblock() : null
}

let setlock = localStorage.getItem('locked')

setlock === 'true' ? lockScreen() : unlockScreen()

function lockScreen() {
    localStorage.setItem('locked', 'true')
    clearInterval(timer)
    document.querySelector('.password').value = ''
    lock_screen.classList.add('locked')
    lock_screen.classList.remove('dislock')
}

function unlockScreen() {
    localStorage.setItem('locked', 'false')
    timer = setInterval(locker, tim)
    document.querySelector('.password').value = ''
    lock_screen.classList.remove('locked')
    lock_screen.classList.add('dislock')
}


/****************pea **************/
let closer_params = document.querySelector('.btn_closer_params')
let open_params = document.querySelector('.pea')
let vertical_nav_btns = document.querySelector('.vertical_nav_btns')

closer_params.onclick = (e) => {
    e.stopPropagation()
    vertical_nav_btns.classList.add('opened')

}

open_params.onclick = (e) => {
    e.stopPropagation()
    vertical_nav_btns.classList.remove('opened')
}

window.onclick = () => {
    if (vertical_nav_btns.classList.contains('opened')) {
        return null
    } else {
        vertical_nav_btns.classList.add('opened')
    }
}



let openSettingsLayer = () => {
    document.querySelector('.settingsLayer').classList.add('openSettingsLayer')
}
let closeSettingsLayer = () => {
    document.querySelector('.settingsLayer').classList.remove('openSettingsLayer')
}

document.querySelector('.openSettingsBtn').onclick = () => openSettingsLayer()
document.querySelector('.closeSettingsLayer ').onclick = () => closeSettingsLayer()

/***navigation dela pages des parametres */

/************changer de mot de pass************* */