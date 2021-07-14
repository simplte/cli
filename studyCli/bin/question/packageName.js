export default () => {
    return {
        type: "input",
        name: 'packageName',
        message: '设置一个名称',
        validate(val) {
            if(val) return true;
            return "请输入项目名称";
        }
    }
}