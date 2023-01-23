// var express = require('express')
// const fileUpload = require('express-fileupload');
// const app = express();

// app.use(fileUpload());

// var AWS = require('aws-sdk');

// app.post('/imageUpload', async (req, res) => {
//     AWS.config.update({
//         accessKeyId: "ACCESS-KEY", // Access key ID
//         secretAccesskey: "SECRET-ACCESS-KEY", // Secret access key
//         region: "us-east-1" //Region
//     })

//     const s3 = new AWS.S3();

//     // Binary data base64
//     const fileContent  = Buffer.from(req.files.uploadedFileName.data, 'binary');

//     // Setting up S3 upload parameters
//     const params = {
//         Bucket: 'BUKET-NAME',
//         Key: "test.jpg", // File name you want to save as in S3
//         Body: fileContent
//     };

//     // Uploading files to the bucket
//     s3.upload(params, function(err, data) {
//         if (err) {
//             throw err;
//         }
//         res.send({
//             "response_code": 200,
//             "response_message": "Success",
//             "response_data": data
//         });
//     });

// })

// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });
