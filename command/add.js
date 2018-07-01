'use strict'

const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const config = require('../templates')

module.exports = () => {
  co(function *() {
    const tplName = yield prompt('Template name: ')
    const gitUrl = yield prompt('Git https link: ')
    const branch = yield prompt('Branch: ')
    
    if(!config.tpl[tplName]) {
      config.tpl[tplName] = {}
      config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '')
      config.tpl[tplName]['branch'] = branch
    } else {
      console.log(chalk.red('The template has already existed!'))
      process.exit()
    }
    
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if(err) console.log(chalk.red(err));
      console.log(chalk.green('New template is added!'));
      console.log(chalk.grey('The latest template list is: \n'))
      console.log(config)
      console.log('\n')
      process.exit()
    })
  })
}

