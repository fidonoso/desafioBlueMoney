const https = require('https')
const fs= require('fs')
const argumentos =  process.argv.slice(2);
let nom_archivo=argumentos[0];
let ext_archivo=argumentos[1];
let indicadorEconomico=argumentos[2].toLocaleLowerCase();
let cantidadPesos=Number(argumentos[3]);

const url ='https://mindicador.cl/api'
https.get(url, (res)=>{
    res.on('data', (data)=>{
        let dato=JSON.parse(data)[indicadorEconomico]
        let fecha= new Date(dato.fecha)
        let tpl=`
        A la fecha: ${fecha.toString()} (GMT-04:00)
        Fue realizada cotización con los siguientes datos:
        Cantidad de pesos a convertir: ${cantidadPesos} pesos
        Convertido a "${indicadorEconomico}" da un total de:
        $${Math.round(cantidadPesos/Number(dato.valor)*100)/100}
        `

        fs.writeFile(`${nom_archivo}.${ext_archivo}`, tpl, 'utf8', ()=>{
            console.log(`--Archivo "${nom_archivo}.${ext_archivo}" creado con éxito en :' ${ __dirname}`)
            fs.readFile(`${nom_archivo}.${ext_archivo}`, 'utf8',(err,data)=>{
                console.log('--Con el siguiente contenido:')
                console.log(data)
            })
        })

    })
})
.on('error', (err) => {
    console.log('Error: ' + err.message)
    })
