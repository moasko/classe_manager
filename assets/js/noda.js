window.addEventListener("load", carago);
var db = openDatabase("myBD", "1.0", "TiPS Database Example", 2 * 1024 * 1024);

db.transaction(function(tx) {
    tx.executeSQL("CREATE TABLE [IF NOT EXISTS] classes(idClasse INTEGER PRIMARY KEY,nomClasse TEXT NOT NULL)");
});


function carago() {
    document.getElementById("btn").addEventListener("click", slavar);
}

function slavar() {
    var nom = document.querySelector(".nom");
    db.transaction(function(tx) {
        tx.executeSQL('INSERT INTO classes(nomClasse)VALUES(?)', [nom]);
    });
}