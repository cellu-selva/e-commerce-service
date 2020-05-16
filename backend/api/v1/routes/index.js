/**
 * Common file for all v1 routes
 * Simply add your router file inside /api/v1/routes/ it'll automatically route it
 * Checks for nested directories too
 * considers only .js files
 */

'use strict'

const express = require('express')
const app = express.Router()

const fs = require('fs')
const path = require('path')

const currentFile = './' + path.basename(__filename)
const extensionAccepted = 'js'

/**
 * 
 * @param {String} directory 
 * @param {Array} fileArray 
 * @param {String} predecessor
 */

const searchDirectory = (directory, predecessor) => {
  let files = fs.readdirSync(directory)
  files.forEach((file) => {
    if (fs.statSync(directory + '/' + file).isDirectory()) {
      let predecessorNew = '/' + file
      if (predecessor) {
        predecessorNew = predecessor + predecessorNew
      }
      searchDirectory(directory + '/' + file, predecessorNew)
    }
    else if (file[0] !== '.') {
      file = predecessor ? '.' + predecessor + '/' + file : './' + file
      let extension = path.extname(file).substring(1)
      extension = extension.toLowerCase()
      if (extension === extensionAccepted && file !== currentFile) {
        app.use('/', require(file))
      }
    }
  })
  return
}

searchDirectory(__dirname, null)

module.exports = app
