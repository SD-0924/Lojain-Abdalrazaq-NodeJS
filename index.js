const fs = require('fs');

let filePaths;

function countWords(content) {
    let word_count = 0;
    const regex = /[^A-Za-z0-9]/;  // Check for special characters

    // trimming and split the content by whitespace -> the spcae, tab, newline, etc.
    const words = content.trim().split(/\s+/);

    // checking each word if it contains any special characters
    for (let i = 0; i < words.length; i++) {
        if (!regex.test(words[i])) {
            word_count++;
        }
    }

    return word_count;
}

// reading the config file that contains the path of the files
try{
    // reading the config file
    const data = fs.readFileSync('config.json', 'utf8');
    // parsing the JSON file
    const config  = JSON.parse(data);
    filePaths = config.files;
    console.log('Files Paths in the config.JSON file after parsing:', filePaths);
}
catch(err){
    console.error('Error reading the config file:', err);
}

// iterating over all the files to count the number of words in each file
filePaths.forEach(filePath => {

    // checking if the file exists before reading
    if (!fs.existsSync(filePath)) {
        console.error(`File does not exist: ${filePath}`);
        return;
    }

    // reading each file asynchronously using fs.readFile method
    fs.readFile(filePath, 'utf8', (err, content) => {

        if (err) {
            console.error(`Error reading the file ${filePath}:`, err.message);
            return;
        }

        // checking if the file is empty
        if (content.trim() === '') {
            console.log(`${filePath} is empty.`);
            return;
        }

        // counting the number of words in the file
        const wordCount = countWords(content);
        console.log(`${filePath}: ${wordCount} words`);
    });
});