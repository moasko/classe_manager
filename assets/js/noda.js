<<<<<<< HEAD
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
=======
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
>>>>>>> 6fe2591a3c3a31d2c2f6437846ec24037fbc3641
}