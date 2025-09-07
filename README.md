# queen-vampire--lsksp-formatter-extension README

这是一个 lsksp 脚本的处理



# 如何打包一个 vscode 的插件:

1. 安装 vsce	
npm install -g @vscode/vsce	

确保 Node.js 版本 ≥ 14.x1

2. 执行打包命令	
vsce package	

若依赖处理有问题，可尝试 
vsce package --no-dependencies
过生成的 .vsix 文件安装	

在VSCode扩展视图中选择"Install from VSIX"19	

3. （可选）发布	
发布到 Marketplace	vsce publish37	
需提前创建发布者账号并获取 Personal Access Token (PAT)7

# 要记得

1. 完善 package.json	
添加 "publisher" 字段15	删除默认的 "This is the README..." 等内容89	
内容为空或含特定字符串可能导致打包失败9