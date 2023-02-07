//Importing fs module from lib
const fs = require('fs');

//Function for saving data input to .json file
function save(name, email, phone, file) {
    
    //Reading data already in .json file and converted into array
    var obj = JSON.parse(fs.readFileSync(file, 'utf-8'));

    //Pushing data to obj var based on whether the email is null or not
    if(email==null){
        obj.push({name, phone});
    }else {
        obj.push({name, email, phone});
    }

    //Writing the new data from obj var back to .json file
    fs.writeFileSync(file, JSON.stringify(obj));
    console.log("\nData saved");
}

module.exports = { save };