export default () => {
    return {
        type: 'list',
        message: '请选择一种第三方库的安装方式',
        name: 'install',
        choices: [
            'npm',
            'cnpm',
            'yarn'
        ]
    }
}