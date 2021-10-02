const { S3Client } = require("@aws-sdk/client-s3");
// Create Amazon S3 service object.
const s3 = new S3Client({
    region: "us-east-1"
});
// Export 's3' constant.
module.exports = { s3 };
