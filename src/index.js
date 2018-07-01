#!/usr/bin/env node --harmony

'use strict'
process.env.NODE_PATH = __dirname + '/../node_modules/'

import program from 'commander'
import cmAdd from '../command/add'
import cmDel from '../command/delete'
import cmList from '../command/list'
import cmInit from '../command/init'

console.log(__dirname, '__dirname');

program
  .version(require('../package').version)

program
  .usage('<command>')

program
  .command('add')
  .description('Add a template')
  .alias('a')
  .action(() => {
    cmAdd()
  })

program
  .command('list')
  .description('List all the templates')
  .alias('l')
  .action(() => {
    cmList()
  })

program
  .command('init')
  .description('Generate a new project')
  .alias('i')
  .action(() => {
    cmInit()
  })

program
  .command('delete')
  .description('Delete a template')
  .alias('d')
  .action(() => {
    cmDel()
  })

program.parse(process.argv)

if(!program.args.length) {
  program.help()
}

