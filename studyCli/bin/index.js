#!/usr/bin/env node

import execa from 'execa'
import fs from 'fs'
import utils from './utils/index.js'
import creatTempIndex from './creatTempIndex.js'
import createPackage from './createPackage.js'
import question from './question/index.js'
import chalk from 'chalk'
import config from './config.js'
import { Command } from 'commander'
import path from 'path';
import vfs from 'vinyl-fs';
import { ensureDirSync } from 'fs-extra';
import { fileURLToPath } from 'url'
import through from 'through2'
import install from '../lib/install.js';
const __dirname = fileURLToPath(import.meta.url);
var cwd = path.join(__dirname, '../templates/cProject');


const program = new Command();


program.version('0.0.1')
    .option("-i --init [name]", "init a project")
    .option('-t --temp', '创建一个koa模板')

program.parse(process.argv);
const options = program.opts()
if (options.init) {
    var projectPath = path.resolve(options.init)
    var projectName = path.basename(projectPath);
    ensureDirSync(projectName);
    var cwd = path.join(__dirname, '../../templates/cProject');
    console.log(cwd)
    // 从demo1目录中读取除node_modules目录下的所有文件并筛选处理
    vfs.src(['**/*'], { cwd: cwd, dot: true })
        .pipe(through.obj(function (file, enc, callback) {
            if (!file.stat.isFile()) {
                return callback();
            }

            this.push(file);
            return callback();
        }))
        // 将从demo1目录下读取的文件流写入到之前创建的文件夹中
        .pipe(vfs.dest(projectPath))
        .on('end', function () {
            console.log('Installing packages...')

            // 将node工作目录更改成构建的项目根目录下
            process.chdir(projectPath);

            // 执行安装命令
            install();
        })
        .resume();
}
if (options.temp) {
    // inquirer相关内容
    let userConfig = await question();
    const resultConfig = config(userConfig)
    // 1:创建文件夹
    log(chalk.green('创建文件夹'))
    fs.mkdirSync(getRootPath())
    // 2：创建入口文件
    log(chalk.green('创建入口文件'))
    fs.writeFileSync(`${getRootPath()}/index.js`, creatTempIndex(resultConfig))
    // 3：创建package.json
    log(chalk.green('创建package.json'))
    fs.writeFileSync(`${getRootPath()}/package.json`, createPackage(resultConfig))
    // 4：安装依赖
    log(chalk.green('安装依赖'))
    const installType = utils.installType(resultConfig.install)
    execa("npm install", {
        cwd: getRootPath(),
        stdio: [2, 2, 2]
    })
    function getRootPath() {
        return './koaProject'
    }
    function log(msg) {
        console.log(msg)
    }
}



