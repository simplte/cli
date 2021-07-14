
export default () => {
    return {
        type: 'input',
        name: 'port',
        default() {
            return 8080;
        },
        message: '设置一个端口号'
    }
}