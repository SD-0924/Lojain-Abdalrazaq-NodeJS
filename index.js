const fs = require('fs');

function countWords(content) {
    // splitting the content by whitespace and filter out empty strings
    const words = content.trim().split(/\s+/);
    return words.length;
}
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

        // Iterating over all the files to count the number of words in each file
        filePaths.forEach(filePath => {
            // Read each file asynchronously
            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    console.error(`Error reading the file ${filePath}:`, err);
                    return;
                }
                const wordCount = countWords(content);
                console.log(`${filePath}: ${wordCount} words`);
            });
        });
    }
    catch(err){
        console.error('Error parsing the config file:', err);
    }
});
