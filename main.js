//Importing system and NPM modules
const valid = require('validator');
const yargs = require('yargs');
const fs = require('fs');

//Importing local functions module
const func = require('./functions');

//Main code for the app
const main = async (filePath) =>
{
    //Adding new CLI command using yargs for the new contact
    yargs.command({
        command: 'add',
        describe: 'add new contact',
        //Flags for attribute
        builder: {
            name: {
                describe: 'Contact Name',
                demandOption: true,
                type: 'string'
            },
            email: {
                describe: 'contact email',
                demandOption: false,
                type: 'string'
            },
            mobile: {
                describe: 'contact mobile phone number',
                demandOption: true,
                type: 'string'
            }
        },
        //Code for handling the attributes from command CLI
        //Mainly the validation and inputing data to create object
        //then pushed to .json file
        handler(argv){
            const name = argv.name;
            const email = argv.email;

            //Checking if email exists, if not then the object will not have email as attribute
            if(email == null){
                console.log('Missing email, continuing...');
            }else if(!valid.isEmail(email)){ //Checking email format, if invalid then app exited.
                console.log('Invalid email format');
                process.exit(0);
            }
            const phone = argv.mobile;
            if(!valid.isMobilePhone(phone,['id-ID'])){ //Checking phone number format, if it's not ID then app exited.
                console.log('Invalid phone number format');
                process.exit(0);
            }

            //Checking for data inputted before saved
            console.log(`\nName: ${name}\nEmail Address: ${email}\nPhone Number: ${phone}`);

            //Saving data to .json file
            func.save(name, email, phone, filePath);
        }
    });
    
    yargs.parse();
    process.exit(0);

};

module.exports = { main }