const config = require('config')

isProduction = () => {
    return process.env.NODE_ENV === 'production'
}

startServer = (app, ipAddress, port) => {
    const http = require('http')
    const httpServer = http.createServer(app)

    return httpServer.listen(port, ipAddress, () => {
        console.log('\033[1m' + 'HTTP server is running at ' + ipAddress + ':' + port + '\033[m')
    })
}

runApp = () => {
    const app = require('./app')
    const ipAddress = '0.0.0.0'
    const port = Number(config.get('PORT') || 3333)

    startServer(app, ipAddress, port)
}

if (!isProduction()) {
    console.log(`Environment: ${process.env.NODE_ENV}`)
    runApp()
} else {
    const cluster = require('cluster')
    const numWorkers = require('os').cpus().length

    if (cluster.isMaster) {
        for (let i = 0; i < numWorkers; i++) {
            cluster.fork() //starting new for every CPU
        }

        cluster.on('listening', (worker) => {
            console.log(new Date() + ' Worker ' + worker.process.pid + ' listening')
        })

        cluster.on('exit', (diedWorker) => {
            console.log(new Date() + ' Worker ' + diedWorker.process.pid + ' just crashed')
            cluster.fork()
            // starting a new worker.
        })
    } else {
        // inside a forked process
        runApp()
    }
}
