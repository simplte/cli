
import inquirer from 'inquirer';

import middleware from './middleware.js'
import packageName from './packageName.js'
import port from './port.js'
import installType from './installType.js'
export default ()=> {
    return inquirer.prompt([
        packageName(),
        port(),
        middleware(),
        installType()
    ])
}