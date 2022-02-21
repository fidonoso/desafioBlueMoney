const child_process = require('child_process')
child_process.exec(`node index.js ${process.argv[2]} ${process.argv[3]} ${process.argv[4]} ${process.argv[5]}`,(err, result)=>{
    return new Promise((resolve)=>{
        console.log(result)
        console.log('Proceso completado.')
    })
})
// ejecutar lo siguiente en la terminal: node app.js 'InformacionFinanciera' 'txt' 'dolar' 250000
