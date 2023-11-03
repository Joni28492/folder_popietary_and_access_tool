

const limpiarDatos = (file) =>{
    let file_split = (file.split("\n"))
    let clean = [];

    file_split.forEach(element => {
        clean.push(element.replace("\n", "").replace("\r", "").trim())
    })

    clean = clean.filter( el => el!=="")

    return clean;
}

const obtenerCarpetas = (datosLimpios=[]) => {

    carpetas = []
    datosLimpios.forEach(el => {
        if(el.startsWith("a =>") || el.startsWith("p =>")){
            const temp = el.slice(4).trim().split(" ")
            carpetas.push(temp)
        }
       
        
    });
  
    carpetas = Array.from(new Set(carpetas.flat()))

    return carpetas

}

const obtenerUsuarios = (datosLimpios) => {

    let usuarios = []
 
    datosLimpios.forEach(dato => {
        if(!dato.startsWith("p =>") && !dato.startsWith("a =>") && !dato.startsWith("n =>")){
            usuarios.push(dato)
        }   
    });

    return usuarios
}


const crearObjetoCarpetas = (carpetas, datosLimpios, usuarios) => {
    const carpetasObj = {}
    carpetas.forEach(c => carpetasObj[c] = {propietarios: [], acceso: []} );


    Object.keys(carpetasObj).forEach(carpeta => {
        // console.log(carpeta, "\n", "*".repeat(50))
        
        usuarios.forEach((user) => {
            const idx_user =  datosLimpios.indexOf(user)
            //p =>
            if(datosLimpios[idx_user+1].includes(carpeta)){
                // console.log(`Agrega propietario ${user} a la carpeta ${carpeta}`)
                carpetasObj[carpeta]["propietarios"].push(user)
            }
            //a =>
            if(datosLimpios[idx_user+2].includes(carpeta)){
                // console.log(`Dar Acceso al usuario ${user} a la carpeta ${carpeta}`)
                carpetasObj[carpeta]["acceso"].push(user)
            }
                
        });

    });

    return carpetasObj
}

const obtenerNombreEmpresa = (path="") => {

    let nombreEmpresa = path.replace("\\", ".").split(".")
    nombreEmpresa = nombreEmpresa[nombreEmpresa.length-2].split("\\")
    return nombreEmpresa[nombreEmpresa.length-1]

}

module.exports = {
    limpiarDatos,
    obtenerCarpetas,
    obtenerUsuarios,
    crearObjetoCarpetas,
    obtenerNombreEmpresa
}