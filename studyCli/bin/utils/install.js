function installType(type) {
    if(type.includes('npm')) {
        return `${type} install`
    }
    return type;
}
export default {
    installType
}