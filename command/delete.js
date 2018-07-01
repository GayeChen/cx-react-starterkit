'use strict'

const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const config = require('../templates')

module.exports = () => {
  co(function *() {
    let tpls = config.tpls
    let tplName = yield prompt('Template name: ')
    let tarIndex = tpls.findIndex(tpl => tpl.name === tplName)
    if(tpls[tarIndex] >= 0) {
      config.tpls = tpls.filter(tpl => tpl.name !== tplName)
    } else {
      console.log(chalk.red('The template does not exist!'))
      process.exit()
    }
    
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if(err) console.log(chalk.red(err));
      console.log(chalk.green('Template is deleted!'));
      console.log(chalk.grey('The latest template list is: \n'))
      console.log(config)
      console.log('\n')
      process.exit()
    })
  })
}
