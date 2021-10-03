
const { PutObjectCommand, ListObjectsCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("./client.js");

const APPLICATION_BUCKET = `cmpe-281-soham-project-1`
const CLOUDFRONT_BASE_URL = `https://d37b5idd4bz28f.cloudfront.net`
const uploadFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    try {
        const { s3_folder, firstName, lastName } = JSON.parse(req.body.session)
        const uploadParams = {
            Bucket: APPLICATION_BUCKET,
            Key: `${s3_folder}/${req.files.file.name}`,
            Body: req.files.file.data,
            Metadata: {
                firstName,
                lastName
            }
        };
        const data = await s3.send(new PutObjectCommand(uploadParams))
    }
    catch (ex) {
        res.status = 400
        res.send("failed")
        return
    }
    res.status = 200
    res.send("ok")
}

const deleteFile = async (req, res) => {
    if (!req.body.key) {
        res.status = 400
        res.send("missing key")
    }
    try {
        await s3.send(new DeleteObjectCommand({ Key: req.body.key, Bucket: APPLICATION_BUCKET }))
        res.status = 200
        res.send("deleted")
    } catch (ex) {
        res.status = 400
        res.send("failed to delete")
    }
}

const getAllFiles = async (req, res) => {
    const listObjectsCommand = {
        Bucket: APPLICATION_BUCKET
    }
    if (req.body.userRoleId === "1") {
        listObjectsCommand.Delimiter = `/`
        listObjectsCommand.Prefix = req.body.path
    } else {
        listObjectsCommand.Prefix = req.body.path === "" ? '/' : req.body.path
    }

    const body = {}
    try {
        const data = await s3.send(
            new ListObjectsCommand(listObjectsCommand)
        );
        if (data.CommonPrefixes) {
            body.folders = data.CommonPrefixes
        }
        if (data.Contents && data.Contents.length > 0) {
            body.files = data.Contents.filter(content => {
                return content.Size > 0
            }).map(file => {
                return {
                    key: file.Key,
                    fileName: file.Key.replace(req.body.path, ``),
                    downloadLink: `${CLOUDFRONT_BASE_URL}/${file.Key}`,
                    modifiedOn: file.LastModified,
                    size: file.Size,
                }
            })
        }
    } catch (error) {
        res.status = 500
        res.send(error)
        return
    }
    res.status = 200
    res.send(body)
}

module.exports = { uploadFile, getAllFiles, deleteFile }