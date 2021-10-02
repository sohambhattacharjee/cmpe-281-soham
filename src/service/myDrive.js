

const uploadFile = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files.file);
    console.log(req.body.session);


    res.status = 200
    res.send("ok")
}

module.exports = { uploadFile }