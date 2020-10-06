<<<<<<< HEAD
let rwh = rw.children
let r = []
for (let i = 0; i < rwh.length; i++) {
    let e = rwh[i];
    r.push(e.clientHeight)
}
let mesu = r.reduce((a, b) => {
    return a + b
})

if (rw.classList.contains('hop')) {
    rw.style.height = mesu + "px"
} else {
    rw.style.height = null
=======
let rwh = rw.children
let r = []
for (let i = 0; i < rwh.length; i++) {
    let e = rwh[i];
    r.push(e.clientHeight)
}
let mesu = r.reduce((a, b) => {
    return a + b
})

if (rw.classList.contains('hop')) {
    rw.style.height = mesu + "px"
} else {
    rw.style.height = null
>>>>>>> 6fe2591a3c3a31d2c2f6437846ec24037fbc3641
}