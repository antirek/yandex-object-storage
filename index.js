
const config = require('config');
const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs')

console.log({config});
const auth = config.yandexObjectStorage.auth; //accessKeyId

const s3config = {
    endpoint: new AWS.Endpoint('https://storage.yandexcloud.net'),
    accessKeyId: auth.accessKeyId,
    secretAccessKey: auth.secretAccessKey,
    signatureVersion: 'v4',
    region: 'ru-central1',
}

console.log('s3 config', {s3config});
const s3 = new AWS.S3(s3config);

/*
s3.createBucket({Bucket: 'mobilon.test1'}, (err, data) => {
    console.log({err, data});
});
*/

s3.upload({
    Bucket: config.bucket,
    Key: '1.mp3',
    Body: fs.readFileSync(path.resolve(__dirname, '1.mp3')),
    ContentType: 'audio/mpeg',
}, (err, data) => {
    console.log({err, data});
});
