### 简介

npm是javascript的**包管理工具**，是**前端模块化**下的一个标志性产物

简单地地说，就是**通过npm下载模块，复用已有的代码，提高工作效率**



### npm账号创建,登录，发布

发布npm包需要登录npm账户,输入账户，密码，邮箱,然后在项目目录下执行发布命令就行

```shell
npm adduser

npm publish
```





## 脚手架npm包发布



### 创建一个基于ts的脚手架

```shell
npm init -y
```



### 添加typeScript依赖

执行: npm install typescript,  添加typeScript的依赖包到npm包中



### 配置tsconfig.json



创建一个tsconfig.json文件，并添加一些配置

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["es2017"],
    "declaration": true,
    "outDir": "./",
    "rootDir": "./src",
    "strict": true,
    "skipLibCheck": true,
    "sourceMap": false,
  },
  "include": ["./src"],
  "exclude": ["node_modules","./src/modules"]
}

```

### 创建目录结构

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gr6ck5r21hj30bm0kcq49.jpg" alt="image-20210604170927245" style="zoom:33%;" />



bin目录存放的是node执行文件的入口，command目录存放的是现实的命令,typings存放的是全局类型声明文件，tools存放的是编译工具，test目录存放测试样例，lib存放自定义工具函数等等



### 配置package.json

1. 修改npm包入口
2. 配置npm包的typescript声明文件

![image-20210607185749750](https://tva1.sinaimg.cn/large/008i3skNgy1gr9wjrjdfoj310s0eo76i.jpg)



3. 配置可执行文件的位置

```json
{
  "bin": {
      "hip-cli": "bin/index.js"
   },
}
```

上面代码指定，hip-cli 命令对应的可执行文件为 bin 子目录下的 index.js。Npm会寻找这个文件，在`node_modules/.bin/`目录下建立符号链接。在上面的例子中，index.js会建立符号链接`npm_modules/.bin/index`。由于`node_modules/.bin/`目录会在运行时加入系统的PATH变量，因此在运行npm时，就可以不带路径，直接通过命令来调用这些脚本。

## npm包发布



npm包的发布基本和脚手架npm包差不多,区别在于不需要配置bin。



## 一些常用的npm命令

```shell
# npm link用来在本地项目和本地npm模块之间建立连接，可以在本地进行模块测试
npm link

npm publish # 发布当前包

npm unpublish 包名 --force # 删除整个包


# 升级patch package.json 中的版本号2.0.0-0变为 2.0.0;
# package.json 中的版本号2.0.0变为 2.0.1;
npm version patch 

# 升级minor
# package.json 中的版本号2.0.1变为 2.1.0;
npm version minor

# 升级major
# package.json  中的版本号3.1.0变为4.0.0
npm version major



```

