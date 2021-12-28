const { S3Client } = require("@aws-sdk/client-s3");
const S3PresigedPost = require("@aws-sdk/s3-presigned-post");
const { v4: uuidv4 } = require("uuid");

const s3Client = new S3Client({ region: "eu-west-3" });

async function generateUploadUrl(type) {
  /**
   * We generate a new uuid as name, to prevent conflicting filenames.
   * You can install this package with `npm i uuid`
   */
  const name = uuidv4();
  const expiresInMinutes = 1;
  const BUCKET_NAME = "glutobucket";
  return await S3PresigedPost.createPresignedPost(s3Client, {
    Bucket: BUCKET_NAME,
    Key: `public/${name}`,
    Expires: expiresInMinutes * 60, // the url will only be valid for 1 minute
    Conditions: [["eq", "$Content-Type", type]],
  });
}

module.exports = { generateUploadUrl };
