'use strict'

const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const config = require('../templates')
// const list = require('./list')

module.exports = (tplName) => {
  co(function *() {
    if(!tplName) {
      console.log('Templates available:')
      if(!config.tpls || config.tpls.length === 0) {
        console.log(chalk.yellow('There is no any template! '));
        process.exit()
      }
      config.tpls.map((tpl, i) => {
        console.log(
        '  ' + chalk.green(i) +
        '  ' + chalk.white(':') +
        '  ' + chalk.green(tpl.name)
        )
      })
    }
    tplName = yield prompt('Template No : ')
    const projectName = yield prompt('Project name: ')
    let gitUrl
    let branch
    // list()
    if(!config.tpls[tplName]) {
      console.log(chalk.red('\n × Template does not exit!'));
      process.exit()
    }
    gitUrl = config.tpls[tplName].url
    branch = config.tpls[tplName].branch
    
    const cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
    console.log(chalk.white('\n Project is generating...'))
    
    exec(cmdStr, (err, stdout, stderr) => {
      if(err) {
        console.log(chalk.red(err));
        process.exit()
      }
      console.log(chalk.green('\n √  completed!'))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
  
    })
  })
}


