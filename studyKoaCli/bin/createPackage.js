import fs from 'fs'
import ejs from 'ejs'
import {fileURLToPath} from 'url'
import path from 'path'
export default (config) => {
    const __dirname = fileURLToPath(import.meta.url);
    const indexTemplate = fs.readFileSync(
        path.resolve(__dirname, '../template/package.ejs')
    )
    const code = ejs.render(indexTemplate.toString(), {
        middleware:config.middleware,
        packageName: config.packageName
    })
    return code;
}