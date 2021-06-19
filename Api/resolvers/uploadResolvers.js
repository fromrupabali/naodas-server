const s3 = require('../s3');
const { v4: uuid } = require('uuid');
const { extname } = require('path');

module.exports = {
    Query:{

    },
    Mutation:{
        uploadToAws: async(parent,{ file })=>{
            console.log("file uploading starting...");
            const { createReadStream, filename, mimetype, encoding } = await file;

            const { Location } = await s3.upload({
                Body: createReadStream(),               
                Key: `${uuid()}${extname(filename)}`,  
                ContentType: mimetype                   
            }).promise();                             
            

            return {
                filename,
                mimetype,
                encoding,
                url: Location, 
            }; 
         },
    }
};