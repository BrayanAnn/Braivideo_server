const AWS = require('aws-sdk');
const {aws} = require('./config_env');

AWS.config.update({
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey,
  region: aws.region,
});

const s3 = new AWS.S3();

// s3.listBuckets((err, data) => {
//   if (err) {
//     console.error('Erro ao listar buckets:', err);
//   } else {
//     console.log('Buckets disponíveis:');
//     data.Buckets.forEach(bucket => {
//       console.log(bucket.Name);
//     });
//   }
// });

module.exports = s3;