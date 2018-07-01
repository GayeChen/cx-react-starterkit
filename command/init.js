'use strict'

const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const config = require('../templates')
// const list = require('./list')

const list = () => {
  console.log('Templates available:')
  config.tpls.map((tpl, i) => {
    console.log(
    '  ' + chalk.green(i) +
    '  ' + chalk.white(':') +
    '  ' + chalk.green(tpl.name)
    )
  })
}

module.exports = (tplName) => {
  // console.log(chalk.white(tplName))
  co(function *() {
    let gitUrl
    let tplInd
    let branch
    if(!config.tpls || config.tpls.length === 0) {
      console.log(chalk.yellow('There is no any template! '));
      process.exit()
    }
    
    if(!tplName || Object.prototype.toString.call(tplName) === '[object Object]') {
      list()
      tplInd = yield prompt('Template No : ')
      if(!config.tpls[tplInd]) {
        console.log(chalk.red('× The emplate does not exit!'));
        process.exit()
      }
    } else {
      tplInd = config.tpls.findIndex(tpl => tpl.name == tplName)
      if(tplInd < 0) {
        console.log(chalk.red('× The emplate does not exit!'));
        list()
        tplInd = yield prompt('Template No : ')
        if(!config.tpls[tplInd]) {
          console.log(chalk.red('× The emplate does not exit!'));
          process.exit()
        }
      }
    }
    const projectName = yield prompt('Project name: ')
  
    gitUrl = config.tpls[tplInd].url
    branch = config.tpls[tplInd].branch
    
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


