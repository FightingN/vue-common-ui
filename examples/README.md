# vue-common-ui

[参考文档](https://blog.csdn.net/lucky__peng/article/details/115261617?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_baidulandingword-0&spm=1001.2101.3001.4242)
[参考文档](https://blog.csdn.net/xingchen678/article/details/102718614)

## 命令集合

- npm run serve 运行 examples 下的代码
- npm run build 打包 examples 下面的资源
- npm run build:lib 用来打包 packages 的组件代码到 lib 目录下

## 发包步骤

- 先进行打包组件库(packages 下的代码),lib 就是打包后的文件(npm run build:lib)
- 修改 package.json 的版本号
- 运行 npm publish(如何没有登录 npm 账号就先 npm login 登录)

## 目录结构

.
├── README.md  
├── babel.config.js
├── docs  
├── examples -----原 src 目录，改成 examples 用作网页示例展示
├── packages -----新增 packages 用于编写存放组件
├── package-lock.json
├── package.json
├── public
├── src
└── vue.config.js

<!-- Username: zhangxiaoning
Password:18300240052
Email: (this IS public) 18300240052@163.com -->
