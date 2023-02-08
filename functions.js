const fs = require('fs');
//Function for saving data input to .json file
const newContact = (name, email, phone, file) => {

    //Comparing names already in database to recently input
    //If it has the same name to one of the data already inside
    //regardless of sentence cases,
    //data will not be saved to contacts.json
    for (let i = 0; i < file.length; i++) {
        if(file[i].name.toLowerCase() == name.toLowerCase()){
            console.log("User already exists, shutting down...");
            process.exit(0);
        }
    }
    console.log(file);
    //Pushing data to obj var based on whether the email is null or not
    if(email==null){
        file.push({name, phone});
    }else {
        file.push({name, email, phone});
    }

    //Writing the new data from obj var back to .json file
    return JSON.stringify(file);
}

function contactDetail(search, file) {
    const data = file.find(e => e.name.toLowerCase() == search.toLowerCase())

    if (data == null) {
        console.log("Contact not found, please add first using\nnode app add command");
    } else {
        if(data.email==null){
            console.log(`${data.name}\n${data.phone}`);
        }else {
            console.log(`${data.name}\n${data.email}\n${data.phone}`);
        };
        process.exit(0);
    }

    // for (let i = 0; i < file.length; i++) {
    //    if(file[i].name.toLowerCase() == search.toLowerCase()){
    //         if(file[i].email==null){
    //             console.log(`${file[i].name}\n${file[i].phone}`);
    //         }else {
    //             console.log(`${file[i].name}\n${file[i].email}\n${file[i].phone}`);
    //         };
    //         process.exit(0);
    //     }
    // }

    // console.log("Contact not found, please add first using\nnode app add command");
}

function list(file) {
    console.log('Contact List :\n');
    
    file.forEach((e, i) => {
        console.log(`${i+1}. ${e.name} - ${e.phone}`);
    });
}

const deleteContact = (name, file) => {
    const newData = file.filter(e => e.name.toLowerCase() !== name.toLowerCase());
    if (newData.length == file.length) {
        console.log(`Cannot find contact associated with the name: ${name}`);
    }
    return JSON.stringify(newData);
}

module.exports = { newContact, contactDetail, list, deleteContact };