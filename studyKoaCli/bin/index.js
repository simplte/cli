#!/usr/bin/env node

import execa from 'execa'
import fs from 'fs'
import utils from './utils/index.js'
import creatTempIndex from './creatTempIndex.js'
import createPackage from './createPackage.js'
import question from './question/index.js'

import config from './config.js'
let userConfig = await question();
const resultConfig = config(userConfig)
// 1:创建文件夹
fs.mkdirSync(getRootPath())
// 2：创建入口文件
fs.writeFileSync( `${getRootPath()}/index.js`, creatTempIndex(resultConfig))
// 3：创建package.json
fs.writeFileSync( `${getRootPath()}/package.json`, createPackage(resultConfig))
// 4：安装依赖
const installType = utils.installType(resultConfig.install)
execa("npm install", {
    cwd: getRootPath(),
    stdio: [2, 2, 2]
})

function getRootPath() {
    return './koaProject'
}    
