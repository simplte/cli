

## 初始化项目安装依赖

```
npm install
```

### 本地环境开发 sit 环境

```
npm run serve
```

### sit 环境打包

```
npm run build:dev
```

### uat 环境打包

```
npm run build:pre
```

### 线上环境打包

```
npm run build:production
```

### 本地开发代理

```
vue.config.js =>
    proxyObj = {
        sit: {
            api: '',
        },
        uat: {
            api: '',
        },
        production: {
            api: '',
        },
    }
```
