const program = require('commander');
program
    .command('create <app-name>')
    .description('创建一个demo例子')
    .option('-d --debug', '打了一个debug')
    .option('-s --small', 'small pizza size')
    .option('-p --piza', "pizza")
program
    .description('提示')
    .on("--help", function() {
    console.log('tips:')
    console.log('这是一个commander的ex')
})
program.parse(process.argv);
if(program.debug) {
    console.log('debug  打了一个debuger')
}
if(program.small) {
    console.log('这是一个小例子 ')
}
if(program.piza) {
    console.log('饿了吃个piza')
}