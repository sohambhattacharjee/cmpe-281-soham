const express = require('express');
const path = require('path');
const app = express();
const { uploadFile } = require('./src/service/myDrive')
const fileUpload = require('express-fileupload')
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'build')));

// app.post('/getFileList')
app.use(fileUpload())
app.post('/upload', uploadFile)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

module.exports = app;
