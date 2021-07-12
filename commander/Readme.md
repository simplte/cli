
```
3. API解析

· version

作用：定义命令程序的版本号
用法示例：.version('0.0.1', '-v, --version')
参数解析：
① 版本号<必须>

② 自定义标志<可省略>：默认为 -V 和 --version

· option

作用：用于定义命令选项
用法示例：.option('-n, --name<path>', 'name description', 'default name')
参数解析：
① 自定义标志<必须>：分为长短标识，中间用逗号、竖线或者空格分割；标志后面可跟必须参数或可选参数，前者用 <> 包含，后者用 [] 包含
② 选项描述<省略不报错>：在使用 --help 命令时显示标志描述

③ 默认值<可省略>

· command

作用：添加命令名称
用法示例：.command('rmdir <dir> [otherDirs...]', 'install description', opts)
参数解析：
① 命令名称<必须>：命令后面可跟用 <> 或 [] 包含的参数；命令的最后一个参数可以是可变的，像实例中那样在数组后面加入 ... 标志；在命令后面传入的参数会被传入到 action 的回调函数以及 program.args 数组中
② 命令描述<可省略>：如果存在，且没有显示调用action(fn)，就会启动子命令程序，否则会报错

③ 配置选项<可省略>：可配置noHelp、isDefault等

· description

作用：定义命令的描述

用法示例：.description('rmdir desc')

· action

作用：定义命令的回调函数

用法示例：.action(fn)

· parse

作用：用于解析process.argv，设置options以及触发commands
用法示例：.parse(process.argv)

```
