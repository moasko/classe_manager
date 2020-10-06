<<<<<<< HEAD
/**
 * retourn une valeur recuperé dans le localstorage
 * @param {String} table 
 */

export const Select = (table) => {
    let data = localStorage.getItem(table)
    return data
}



export const Insert = (key, value) => {
    localStorage.setItem(key, value)
}


/**
 * permet de regrouper des elements a pa
 */
export const Filtre = (data, key, comparateur) => {
    return data.filter(e => e[key] == comparateur)
}

/**
 * une functions qui permet de filtré et recupere un eleve dans un tables a partire de sont id
 * @param {Array} data une tableau de donnees dans le quel recupere l'eleve
 * @param {Number} id l'identifient de l'eleve a recuperé
 * @return {Array}
 * ``` javascript
 * GetEleve(data,1)
 * ```
 */
export const GetEleve = (data, id) => data.find(e => e.id == id)


export const additione = (elev) => {
    let notes = elev.notes.a1
    return notes.reduce((a, b) => a + b)
=======
/**
 * retourn une valeur recuperé dans le localstorage
 * @param {String} table 
 */

export const Select = (table) => {
    let data = localStorage.getItem(table)
    return data
}



export const Insert = (key, value) => {
    localStorage.setItem(key, value)
}


/**
 * permet de regrouper des elements a pa
 */
export const Filtre = (data, key, comparateur) => {
    return data.filter(e => e[key] == comparateur)
}

/**
 * une functions qui permet de filtré et recupere un eleve dans un tables a partire de sont id
 * @param {Array} data une tableau de donnees dans le quel recupere l'eleve
 * @param {Number} id l'identifient de l'eleve a recuperé
 * @return {Array}
 * ``` javascript
 * GetEleve(data,1)
 * ```
 */
export const GetEleve = (data, id) => data.find(e => e.id == id)


export const additione = (elev) => {
    let notes = elev.notes.a1
    return notes.reduce((a, b) => a + b)
>>>>>>> 6fe2591a3c3a31d2c2f6437846ec24037fbc3641
}