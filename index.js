const fs = require('fs');

let filePaths;

function countWords(content) {
    // removing special characters and trim the content
    const cleanedContent = content.replace(/[^\w\s]/g, '').trim();
    
    // checking if cleaned content is empty after removing special characters
    // this is to handle the case where the content contains only special characters and no words
    if (cleanedContent.length === 0) {
        return 0; // Return 0 for content with only special characters
    }

    // splitting the content into words
    const words = cleanedContent.split(/\s+/);
    // filtering out the empty strings using the filter method
    return words.filter(word => word.length > 0).length; // Count valid words
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

// Iterating over all the files to count the number of words in each file
filePaths.forEach(filePath => {

    // checking if the file exists before reading
    if (!fs.existsSync(filePath)) {
        console.error(`File does not exist: ${filePath}`);
        return; // Exit early for non-existent files
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

        // Counting the number of words in the file
        const wordCount = countWords(content);
        console.log(`${filePath}: ${wordCount} words`);
    });
});