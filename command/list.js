const config = require('../templates')
let chalk = require('chalk')

module.exports = () => {
  if(!config.tpls || config.tpls.length === 0) {
    console.log(chalk.yellow('There is no any template! '));
    process.exit()
  }
  config.tpls.map(tpl => {
    console.log(
      ' ' + chalk.green('★') +
      '  ' + chalk.green(tpl.name) +
      ' - ' + chalk.white(tpl.desc)
    )
  })
  // process.exit()
}
