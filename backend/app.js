console.log('Starting Environment - ' + process.env.NODE_ENV)

const config = require('config')

const express = require('express')
const cors = require('cors')
const winston = require('winston')
const expressWinston = require('express-winston')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()

const db = require('./helpers/db')
const __ = require('./helpers/response')
const v1Routes = require('./api/v1/routes')

if(process.env.NODE_ENV !== "test"){
  app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true,
            timestamp: true
        })
    ]
  }))
}
db.connectMongo()

const corsOptions = {
    origin: config.get('corsAllowedDomains')
}

// TODO: add rate limiter


app.use(cors(corsOptions))
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// listen for all the incoming request and fetch the tenant detail from it
// if no tenant found redirect it to kadalunavu.com

// common routes for version 1
app.use('/v1', v1Routes)

// catch 404 and render not found page
app.use((req, res, next) => {
    __.notFound(res, 'Wrong page URL')
})

module.exports = app
