const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { uploadFile, getAllFiles, deleteFile } = require('./src/service/myDrive')
const fileUpload = require('express-fileupload')
const port = process.env.PORT || 3000
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

var jsonParser = bodyParser.json()
app.post('/deleteFile', jsonParser, deleteFile)
app.post('/getFiles', jsonParser, getAllFiles)
app.use(fileUpload())
app.post('/upload', uploadFile)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

module.exports = app;
