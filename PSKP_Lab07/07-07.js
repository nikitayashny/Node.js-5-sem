const axios = require('axios');
const fs = require('fs');

const url = 'http://localhost:5000/uploadfile';
const filePath = 'file.png';

axios.get(url, { responseType: 'stream' })
  .then(response => {
    response.data.pipe(fs.createWriteStream(filePath));
  })
  .catch(error => {
    console.error('Error downloading file:', error.message);
  });