//Importing system and NPM modules
const valid = require('validator');
const yargs = require('yargs');
const fs = require('fs');

//Importing local functions module
const func = require('./functions');

//Main code for the app
const main = async (filePath) =>
{
    const file = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
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
            fs.writeFileSync(filePath, func.newContact(name, email, phone, file));
            console.log('Data saved.');
        }
    });
    
    yargs.command({
        command: 'detail',
        describe: 'show contact detail',
        builder: {
            name: {
                describe: 'Contact Name',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv){
            func.contactDetail(argv.name, file);
        }
    });

    yargs.command({
        command: 'list',
        describe: 'show contact list from database',
        handler(){
            func.list(file);
        }
    })

    yargs.command({
        command: 'delete',
        describe: 'delete contact from list',
        builder: {
            name: {
                describe: 'Contact Name',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv){
            fs.writeFileSync(filePath, func.deleteContact(argv.name, file));
        }
    })

    yargs.command({
        command: 'update',
        describe: 'make changes on one of the contact',
        builder: {
            oldname: {
                describe: 'Old Contact Name',
                demandOption: true,
                type: 'string'
            },
            newname: {
                describe: 'New Contact Name',
                demandOption: false,
                type: 'string'
            },
            newemail: {
                describe: 'new contact email',
                demandOption: false,
                type: 'string'
            },
            newmobile: {
                describe: 'new contact phone number',
                demandOption: false,
                type: 'string'
            }
        },
        handler(argv) {
            
            fs.writeFileSync(filePath, func.updateContact(argv.oldname, argv.newname, argv.newemail, argv.newmobile, file));
        }
    })
    
    yargs.parse();
    process.exit(0);

};

module.exports = { main }