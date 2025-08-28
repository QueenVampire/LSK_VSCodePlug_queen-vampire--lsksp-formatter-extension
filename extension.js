const vscode = require('vscode');

function activate(context) {
    // 注册文档格式化编辑提供程序
    const formatter = vscode.languages.registerDocumentFormattingEditProvider('lsksp', {
        provideDocumentFormattingEdits(document) {
            const text = document.getText();
            const formattedText = formatCustomLanguage(text);

            // 获取整个文档的范围
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(text.length)
            );

            // 返回格式化后的文本
            return [vscode.TextEdit.replace(fullRange, formattedText)];
        }
    });

    context.subscriptions.push(formatter);
}


function formatCustomLanguage(text) {
    const lines = text.split('\n');
    let formattedLines = [];
    let indentLevel = 0;
    const indentSize = 4;
    const indentChar = ' ';

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        // 跳过空行
        if (line.length === 0) {
            formattedLines.push('');
            continue;
        }

        // 处理结束标记
        if (line === 'if end' || line === 'loop end') {
            indentLevel = Math.max(0, indentLevel - 1);
            const indent = indentChar.repeat(indentLevel * indentSize);
            formattedLines.push(indent + line);
            continue;
        }

        // 处理 else 语句
        if (line === 'else') {
            // else 应该比当前缩进少一级（与对应的 if 对齐）
            const elseIndent = indentChar.repeat(Math.max(0, indentLevel - 1) * indentSize);
            formattedLines.push(elseIndent + line);
            continue;
        }

        // 添加当前缩进
        const indent = indentChar.repeat(indentLevel * indentSize);
        formattedLines.push(indent + line);

        // 处理开始标记 - 增加缩进
        if (line.startsWith('if :') || line.startsWith('loop ')) {
            indentLevel++;
        }
    }

    return formattedLines.join('\n');
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};