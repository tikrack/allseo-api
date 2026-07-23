const fs = require('fs').promises;
const path = require('path');

async function getInfo() {
  try {
    const filePath = path.join(__dirname, 'info.json');
    
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    const data = JSON.parse(fileContent);
    
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getInfo;
