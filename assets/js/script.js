var bp = document.querySelectorAll(".puc");
console.log(bp)

(function() {
    //selectionne les puces et les deroule au click
    var m = document.querySelectorAll(".puc");
    console.log(m.children)
    for (let i = 0; i < m.length; i++) {
        var pc = m[i];
        pc.parentNode.addEventListener("click", function() {
            var t = this.lastElementChild;
            t.classList.toggle("rotat180");
            this.nextElementSibling.classList.toggle("hop");
        });
    }

})();


//recuperation de la date de cette anne et de l'anne suivante
(function() {
    var anne = document.querySelector(".annee");
    var d = new Date();
    var a = d.getFullYear();

    anne.innerHTML = a - 1 + "-" + a;
})();

var rot = document.querySelector(".rot");
var rotCont = rot.children[0].textContent.length;
if (rotCont >= 12) {
    rot.children[0].classList.add("size");
}

//sidbar constroler


function fermeSidebar() {

    var layout = document.querySelector("#layout-container");
    var sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("sidbarCloser");
    layout.classList.toggle("cent");
}

function bold() {
    var boldr = document.querySelector(".ajouter-element");
    boldr.classList.toggle("efe");

}

//recupere les elements des tableLayout
var tr = document.querySelectorAll(".tr");
for (let t = 0; t < tr.length; t++) {
    var ttr = tr[t];
    var vm = document.createElement("input");
    vm.type = "text";
    vm.className = "vm" + t;
    vm.classList.add("vm");
    ttr.appendChild(vm);

}


function ajouterNote() {
    var tr = document.querySelectorAll(".tr");
    for (let ii = 0; ii < tr.length; ii++) {
        var ttrr = tr[ii];
        var vmm = document.createElement("td");
        vmm.className = "vnn" + ii;
        var vmmm = document.querySelector(".vm0").value;
        var vnnn = document.querySelector(".vn0");
        vnnn.textContent = vmmm;
        ttrr.appendChild(vnnn);
    }
}

//por afficher les eleves dans le tableau






/*     for (let s = 0; s < tr.length; s++) {
            var vmm = document.createElement("td");
            let ss = tr[s];
            vmm.document.createTextNode(Nnv);
            ss.appendChild(vmm)
            */