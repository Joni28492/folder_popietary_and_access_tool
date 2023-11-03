const { limpiarDatos, obtenerCarpetas, obtenerUsuarios, crearObjetoCarpetas, obtenerNombreEmpresa } = require("./getInfo")
const fs = require('fs')

const crearHTMLEmpresa = (path) => {
    let nombreEmpresa = path.split(".")
    console.log(nombreEmpresa)
    //limpieza archivo 
    const file = fs.readFileSync(path, {encoding: "utf-8"})
    const datosLimpios = limpiarDatos(file)
    //obtener todas las carpetas
    const carpetas = obtenerCarpetas(datosLimpios)
    const usuarios = obtenerUsuarios(datosLimpios)

    //fromatear carpetas con sus accesos
    const carpetasObj = crearObjetoCarpetas(carpetas, datosLimpios,usuarios)

    // console.log(carpetasObj)
    // console.log("*".repeat(25))
    //Dibujar objeto
    
    // carpetas.forEach(carpeta => {
    //     console.log(`
    //     ================================================
    //     ${carpeta}:
    //         propietarios: ${carpetasObj[carpeta]["propietarios"]}
    //         acceso: ${carpetasObj[carpeta]["acceso"]}
    //     ================================================
    //     `)
    // });



    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${obtenerNombreEmpresa(path)}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </head>
    <body class="container">
        <h1 class="text-center">
            <i class="fa fa-building" aria-hidden="true"></i>
            ${obtenerNombreEmpresa(path)}</h1>
        <hr>

        <div class="container row">

            <ul class="d-flex flex-wrap justify-content-evenly list-group list-group-horizontal">
            `
            
            carpetas.forEach(carpeta => {
                

                html+= `<li class="list-group-item mt-2" >
                             <h3 class="container">
                                 <i class="fa fa-folder-open" aria-hidden="true"></i>
                                 ${carpeta}</h3>
                                 <h5 class="col mt-2">
                                     <i class="fa fa-user-circle" aria-hidden="true"></i>
                                     Propietarios</h5>
                                     `
                
                carpetasObj[carpeta]["propietarios"].forEach((user, i) => {
                    html += `
                        <input type="checkbox" name="prop-${i}">
                        <label for="prop-${i}">${user}</label>
                        <br>
                    ` 
                });
                
                html += ` <h5 class="col mt-2">
                                 <i class="fa fa-users" aria-hidden="true"></i>
                                 Ususarios con acceso</h5>
                                 `
                carpetasObj[carpeta]["acceso"].forEach((user, i) => {
                    html += `
                        <input type="checkbox" name="acceso-${i}">
                        <label for="prop-${i}">${user}</label>
                        <br>
                    ` 
                });

                html += ' </li>'
            });

           
            html += `
                </ul>
                </div>
                <a class="mt-2 d-flex flex-end" href="../index.html">Volver</a>
            </body>
            </html>
            `
        

      
    
    fs.writeFileSync(`./html/${obtenerNombreEmpresa(path)}.html`, html, {encoding: 'utf-8', flag: 'w'})


}

const crearHTMLFolder = (path) => {
    const empresas = fs.readdirSync(path)
    const initChain = `.\\data\\`

    let indexHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>nombre_empresa</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </head>
        <body class="container">
            <h1 class="text-center">
                <i class="fa fa-building" aria-hidden="true"></i>
                Empresas</h1>
            <hr>
        
            <div class="container row">
        
                <ul class="d-flex  justify-content-evenly list-group list-group-horizontal">
        `
  
                    
        empresas.forEach(empresa => {
            n_emp = empresa.split(".")[0]
            indexHTML += `
            <li class="list-group-item" >
                <a href="./html/${n_emp}.html">${n_emp}</a>  
            </li>
            `
        });
            
                
    indexHTML += `        
                </ul>
            </div>
        </body>
        </html>
    `

    fs.writeFileSync('index.html', indexHTML, {encoding: 'utf-8'})



    empresas.forEach(empresa => {
        const tempPath = initChain+empresa
        crearHTMLEmpresa(tempPath)
    });
}


module.exports = {
    crearHTMLEmpresa,
    crearHTMLFolder
}