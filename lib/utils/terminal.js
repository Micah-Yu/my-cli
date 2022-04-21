/*
* 执行终端命令相关的代码
* */
const { spawn } = require('child_process')

const spawnCommand = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    // 将子进程所有的标准输出都传给父进程，显示在控制台上
    childProcess.stdout.pipe(process.stdout)
    // 将子进程所有的错误都传给父进程，显示在控制台上
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  spawnCommand
}
