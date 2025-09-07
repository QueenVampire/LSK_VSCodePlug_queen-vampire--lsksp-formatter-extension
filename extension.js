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


function formatString(str) {
    // 查找冒号位置
    const colonIndex = str.indexOf(':');

    if (colonIndex === -1) {
        return str; // 如果没有冒号，返回原字符串
    }

    // 分割冒号前后的部分
    const left = str.substring(0, colonIndex).trimEnd();
    const right = str.substring(colonIndex + 1).trim();

    // [冒号左边]
    const left_parts = left.split(' ').map(part => part.trim());
    const left_joinedParts = left_parts.join(' ');

    // [冒号右边] 按逗号分割并重新用空格拼接
    const right_parts = right.split(',').map(part => part.trim());
    const right_joinedParts = right_parts.join(' , ');

    return left_joinedParts + ' : ' + right_joinedParts;
}



function formatCustomLanguage(text) {
    const lines = text.split('\n');
    let formattedLines = [];
    let indentStack = [0]; // 存储每层的缩进级别
    const indentSize = 4;
    const indentChar = ' ';

    // 定义块关键字
    const blockKeywords = ['func', 'if', 'loop', 'else', 'elif'];

    for (let i = 0; i < lines.length; i++) {
        let line = formatString(lines[i].replace(/(?<=\S)\s{2,}(?=\S)/g, ' '));
        formattedLines.push(line);

        continue;


        let line2 = lines[i].trim();
        // 跳过空行
        if (line2.length === 0) {
            formattedLines.push('');
            continue;
        }

        // 获取当前行的第一个单词
        const firstWord = line2.split(' ')[0];
        const isBlockStart = blockKeywords.includes(firstWord);

        // 确定当前缩进级别
        const currentIndent = indentStack[indentStack.length - 1];
        const indent = indentChar.repeat(currentIndent);

        formattedLines.push(indent + line2);

        // 如果是块开始，增加下一行的缩进
        if (isBlockStart) {
            indentStack.push(currentIndent + indentSize);
        }

        // 检查是否需要减少缩进（查看后续行的缩进）
        if (i < lines.length - 1) {
            const nextLine = lines[i + 1].trim();
            if (nextLine.length > 0) {
                const nextFirstWord = nextLine.split(' ')[0];
                // 如果下一行不是块开始且当前是块开始，可能需要调整
                if (!blockKeywords.includes(nextFirstWord) && isBlockStart) {
                    // 简单策略：在遇到非空行且不是块关键字时减少缩进
                    if (indentStack.length > 1) {
                        indentStack.pop();
                    }
                }
            }
        }
    }

    return formattedLines.join('\n');
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};