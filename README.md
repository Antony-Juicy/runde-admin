# 大教务前端

## 文件夹说明
```
├─assets 资源目录，未编译的静态资源如 scss、js
├─components 组件目录
├─fetch api 接口
├─layout 整体布局
├─router 路由
├─store vuex全局状态管理
├─styles 公共样式
├─utils 全局工具类/全局过滤器/全局指令
├─views 页面目录
    ├─crm-module CRM模块
    |    ├─chance 机会管理
    ├─system-module 系统模块
        ├─system 系统管理
            ├─addressbook 通讯录管理
            ├─menu 菜单管理
            ├─role 角色管理
├─App.vue 入口页面
├─main.js 入口文件
├─permission.js 路由权限控制入口文件  
├─.env.development 开发环境的接口地址
├─.env.production  生产环境的接口地址

```


## 全局配置

```
# 全局指令
防重复提交  v-prevent-re-click="duration"

```

```
# 全局公共组件
表格  RdTable
弹窗  RdDialog
```

```
# 全局工具类
/utils/fetch 请求 (用法：this.$fetch)
/utils/common 方法 （用法：this.$common）
```

```
# 全局过滤器
/utils/filters
```

## Build Setup

```bash
# 克隆项目
git clone http://39.108.184.230:8082/jiaowu_web_team/runde-admin.git

# 进入项目目录
cd runde-admin

# 安装依赖
npm install或者cnpm install


# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

 
```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

