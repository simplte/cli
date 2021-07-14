#!/usr/bin/env node


var {Command} = require('commander');
var vfs = require('vinyl-fs');
var through = require('through2');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const program = new Command();

program
  .version('1.0.0')
  .option('-i --init [name]', 'init a project', 'myFirstProject')
    
program.parse(process.argv);

const options = program.opts();
if(options.init) {
    const projectPath = path.resolve(program.init);
    const projectName = path.basename(projectPath);
    console.log(chalk.red('开始初始化项目:') + chalk.green(`${projectPath}`))
    // 根据将要创建的项目名称创建文件夹，确保目录的存在。如果目录结构不存在,就创建一个。
    fs.ensureDirSync(projectName);
    // 从demo1目录中读取除node_modules目录下的所有文件并筛选处理
    // 1:模板读取
    const cwd = path.join(__dirname, '../templates/cProject');
    vfs.src(['**/*', "!node_modules/**/*"], {cwd: cwd, dot: true})
    .pipe(through.obj(function(file, enc, callback){
        if(!file.stat.isFile()) {
            return callback()
        }
        this.push(file)
        return callback();
    }))
    // 将从demo1目录下读取的文件流写入到之前创建的文件夹中
    // 1:模板流写入对应文件夹路径
    .pipe(vfs.dest(projectPath))
    .on("end", function() {
        console.log('初始化packages。。。')
        // process.chdir() 改变工作目录
        process.chdir(projectPath)
        require('../lib/install')
    })
    .resume()
}
// program
//     .command('create <app-name>')
//     .description('创建一个demo例子')
//     .option('-d --debug', '打了一个debug')
//     .option('-s --small', 'small pizza size')
//     .option('-p --piza', "pizza")
// program
//     .description('提示')
//     .on("--help", function() {
//     console.log('tips:')
//     console.log('这是一个commander的ex')
// })
// program.parse(process.argv);
// if(program.debug) {
//     console.log('debug  打了一个debuger')
// }
// if(program.small) {
//     console.log('这是一个小例子 ')
// }
// if(program.piza) {
//     console.log('饿了吃个piza')
// }