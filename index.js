#!/usr/bin/env node
// index.js
const { program } = require('commander');
const { promisify } = require('util')
const {spawnCommand} = require("./lib/utils/terminal.js");
const download = promisify(require('download-git-repo'))

program
  // 定义cli命令
  .command('create')
  // 定义create命令的参数
  .argument('<project-name>')
  // 添加命令的描述
  .description('clone a repository into a newly created directory')
  // create命令执行的逻辑
  .action(async (projectName) => {
    // 1. 下载模版
    console.log('init project')
    // 远程模版地址，默认master分支，这里下载的是main分支
    const repoUrl = 'direct:https://github.com/Micah-Yu/vue-template.git#main'
    await download(repoUrl, projectName, { clone: true })

    // 2. 安装依赖
    console.log('installing dependents...')
    // 这里做一个npm命令不同系统的兼容
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await spawnCommand(command, ['install'], { cwd: `./${projectName}` })

    // 3. 启动项目
    console.log('start project')
    await spawnCommand(command, ['run', 'serve'], { cwd: `./${projectName}` })
  })

program.parse()
