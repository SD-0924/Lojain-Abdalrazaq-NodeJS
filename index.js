const fs = require('fs');

// Reading the config file that contains the path of the files
fs.readFile('config.json', 'utf8', (err, data) => {
    if(err){
        console.error('Error reading the config file:', err);
        return; 
    }
    try{
        // trying to parse the JSON file
        const config = JSON.parse(data);
        const filePaths = config.files;
        console.log('Files Paths in the config.JSON file after parsing:', filePaths);
    }
    catch(err){
        console.error('Error parsing the config file:', err);
    }
});
