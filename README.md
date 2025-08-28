# queen-vampire--lsksp-formatter-extension README

这是一个 lsksp 脚本的处理



## 给自己备注的, 打包攻略:

# 环境准备	
安装 vsce	npm install -g @vscode/vsce3	
确保 Node.js 版本 ≥ 14.x1

# 项目配置	
完善 package.json	
添加 "publisher" 字段15	

# 编写有效的 README.md	
删除默认的 "This is the README..." 
等内容89	内容为空或含特定字符串可能导致打包失败9

# 打包	
执行打包命令	vsce package13	
若依赖处理有问题，可尝试 vsce package --no-dependencies6

# 本地安装	通
过生成的 .vsix 文件安装	
在VSCode扩展视图中选择"Install from VSIX"19	

# （可选）发布	
发布到 Marketplace	vsce publish37	
需提前创建发布者账号并获取 Personal Access Token (PAT)7