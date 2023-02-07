//Importing main app and fs
const main = require('./main');
const fs = require('fs');

//Checking if data folder exist, if not then create it.
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
    console.log('Folder not found, new folder created.');
};

//Checking if contacts.json exist in data folder, if not then create it
const filePath = './data/contacts.json';
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, '[]', 'utf-8');
    console.log('File not found, new file created.');
}

//main app
main.main(filePath);