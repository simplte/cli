export default (userConfig) => {
    console.log(userConfig)
    return {
        packageName: userConfig.packageName,
        port: userConfig.port,
        middleware: {
            static: userConfig.middleware.includes('koaStatic'),
            router: userConfig.middleware.includes('koaRouter')
        },
        install: userConfig.install
    }
}