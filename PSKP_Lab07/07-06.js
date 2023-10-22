const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const bound = 'bound';

const form = new FormData();
form.append('file', fs.createReadStream('MyFile.png'), {
  filename: 'MyFile.png',
  contentType: 'application/octet-stream'
});

const url = 'http://localhost:5000/UploadFile';
const headers = {
  ...form.getHeaders(),
  'Content-Type': `multipart/form-data; boundary=${bound}`
};

axios.post(url, form, { headers })
  .catch(error => {
    console.error('axios.response: error:', error.message);
  });