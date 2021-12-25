

const fs = require('fs');
const { argv } = require('process');
const fileKey = '--file=';
const outFileKey = '--out=';

let jsonFilePath = '';
let outFilePath = null;
for (const tempArg of argv) {
    if (tempArg.startsWith(fileKey)) {
        jsonFilePath = tempArg.split(fileKey).pop()
    } else if (tempArg.startsWith(outFileKey)) {
        outFilePath = tempArg.split(outFileKey).pop()
    }
}
outFilePath = outFilePath ?? jsonFilePath
console.log('jsonFilePath', jsonFilePath);
console.log('outFilePath', outFilePath);

if (fs.existsSync(jsonFilePath) == false) {
    console.error(jsonFilePath, '文件不存在');
    return;
}
const jsonStr = fs.readFileSync(jsonFilePath).toString();
fs.writeFileSync(outFilePath, JSON.stringify(JSON.parse(jsonStr), null, 4))

console.log('formatJson done');

// node .\formatJson.js --file=./temp.json
// node .\formatJson.js --file=./temp.json --out=./new.json
