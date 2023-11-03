const yargs = require("yargs")
const fs = require("fs");
// const path = require('path');
const { crearHTMLEmpresa, crearHTMLFolder } = require("./helpers/ui");



const options = yargs
 .usage("Usage: -u <user>")
 .option("u", { alias: "user", describe: "introduce usuario", type: "string" })
 .usage("Usage: -e <mail>")
 .option("e", { alias: "email", describe: "introduce email", type: "string" })
 .usage("Useage: -f <file.txt>")
 .option("f", { alias: "file", describe: "crea un html a partir de un txt con la estructura señalada    ", type: "string" })
 .usage("Useage: -d <path_dir>")
 .option("d", { alias: "folder", describe: "crea un html por cada txt", type: "string" })
 .argv;

if(options.user){
    console.log(options.user)
}


if(options.email){
    console.log(options.email)
}

if(options.file){
    crearHTMLEmpresa(options.file)
}

if (options.folder) {
    crearHTMLFolder(options.folder)
}
