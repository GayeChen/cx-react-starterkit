'use strict'

const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const config = require('../templates')

module.exports = () => {
  co(function *() {
    const tplName = yield prompt('Template name: ')
    const projectName = yield prompt('Project name: ')
    let gitUrl
    let branch
    if(!config[tplName]) {
      console.log(chalk.red('\n × Template does not exit!'));
      process.exit()
    }
    gitUrl = config[tplName].url
    branch = config[tplName].branch
    
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


